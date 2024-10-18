using Car_Auction_Backend.Data;
using Car_Auction_Backend.Models;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace Car_Auction_Backend.Services
{
	public class AuctionFinalizationService : BackgroundService
	{
		private readonly IServiceProvider _serviceProvider;

		public AuctionFinalizationService(IServiceProvider serviceProvider)
		{
			_serviceProvider = serviceProvider;
		}

		protected override async Task ExecuteAsync(CancellationToken stoppingToken)
		{
			while (!stoppingToken.IsCancellationRequested)
			{
				using (var scope = _serviceProvider.CreateScope())
				{
					var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
					var emailService = scope.ServiceProvider.GetRequiredService<IEmailService>(); // Resolve IEmailService in scope
					var now = DateTime.Now;

					// Get all ongoing auctions that have ended
					var endedAuctions = await dbContext.Bids
						.Where(b => b.EndTime <= now && b.Bstatus == "Ongoing")
						.Include(b => b.Car)
						.ToListAsync();

					Console.WriteLine($"Ended auctions count: {endedAuctions.Count}");
					foreach (var bid in endedAuctions)
					{
						// Debug: Output each auction's details
						Console.WriteLine($"Auction ID: {bid.BidId}, EndTime: {bid.EndTime}, Status: {bid.Bstatus}");

						var highestBid = await dbContext.Bid_subs
							.Where(bs => bs.BidID == bid.BidId)
							.OrderByDescending(bs => bs.Amount)
							.FirstOrDefaultAsync();

						if (highestBid != null)
						{
							highestBid.BSStatus = "Sold";
							bid.Bstatus = "Sold";

							// Mark all other bids as closed
							var otherBids = await dbContext.Bid_subs
								.Where(bs => bs.BidID == bid.BidId && bs.SubId != highestBid.SubId)
								.ToListAsync();

							foreach (var otherBid in otherBids)
							{
								otherBid.BSStatus = "Closed";
							}

							// Send email to the highest bidder
							User highestBidder = await dbContext.users.FindAsync(highestBid.UserId); // Assuming UserId is the foreign key in Bid_sub
							Console.WriteLine($"Highest Bidder ID: {highestBidder.UId}, Email: {highestBidder.UEmail}, Name: {highestBidder.UName}");
							Console.WriteLine($"Car Model: {bid.Car?.Model}, Brand: {bid.Car?.Brand}");
							if (highestBidder != null)
							{
								await emailService.SendHighestBidderNotification(highestBidder, bid);
							}
						}

						bid.Bstatus = "Closed"; // Finalize auction
					}

					await dbContext.SaveChangesAsync();
				}

				// Check every minute
				await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
			}
		}
	}
}
