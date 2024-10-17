using Car_Auction_Backend.Data;
using Car_Auction_Backend.Models;
using Car_Auction_Backend.Services;
using Microsoft.EntityFrameworkCore;

public class AuctionFinalizerService : BackgroundService
{
	private readonly IServiceProvider _services;
	private readonly ILogger<AuctionFinalizerService> _logger;
	private const int DELAY_MINUTES = 1;

	public AuctionFinalizerService(IServiceProvider services, ILogger<AuctionFinalizerService> logger)
	{
		_services = services ?? throw new ArgumentNullException(nameof(services));
		_logger = logger ?? throw new ArgumentNullException(nameof(logger));
	}

	protected override async Task ExecuteAsync(CancellationToken stoppingToken)
	{
		_logger.LogInformation("Auction Finalizer Service started at: {time}", DateTimeOffset.UtcNow);

		try
		{
			while (!stoppingToken.IsCancellationRequested)
			{
				await ProcessEndedAuctions(stoppingToken);
				await Task.Delay(TimeSpan.FromMinutes(DELAY_MINUTES), stoppingToken);
			}
		}
		catch (OperationCanceledException)
		{
			_logger.LogInformation("Auction Finalizer Service is stopping.");
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "An error occurred in the Auction Finalizer Service.");
			throw;
		}
	}

	private async Task ProcessEndedAuctions(CancellationToken stoppingToken)
	{
		try
		{
			using var scope = _services.CreateScope();
			var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
			var bidSubService = scope.ServiceProvider.GetRequiredService<IBidSubService>();

			var endedBids = await GetEndedBids(dbContext, stoppingToken);

			foreach (var bid in endedBids)
			{
				try
				{
					await ProcessSingleBid(bid, bidSubService);
				}
				catch (Exception ex)
				{
					_logger.LogError(ex, "Error processing bid {BidId}", bid.BidId);
				}
			}
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "Error in ProcessEndedAuctions");
		}
	}

	private async Task<List<Bid>> GetEndedBids(ApplicationDbContext dbContext, CancellationToken stoppingToken)
	{
		return await dbContext.Bids
			.Include(b => b.Bid_subs)
			.Where(b => b.EndTime <= DateTime.UtcNow &&
					   b.Bid_subs.Any() && // Only include bids that have submissions
					   b.Bid_subs.All(bs => bs.BStatus != "Sold" && bs.BStatus != "Closed"))
			.ToListAsync(stoppingToken);
	}

	private async Task ProcessSingleBid(Bid bid, IBidSubService bidSubService)
	{
		_logger.LogInformation("Processing ended auction for bid {BidId}", bid.BidId);

		var result = await bidSubService.FinalizeBidAndNotifyWinner(bid.BidId);

		if (result)
		{
			_logger.LogInformation("Successfully finalized auction for bid {BidId}", bid.BidId);
		}
		else
		{
			_logger.LogWarning("Failed to finalize auction for bid {BidId}. No qualifying bids found or other error occurred.", bid.BidId);
		}
	}
}