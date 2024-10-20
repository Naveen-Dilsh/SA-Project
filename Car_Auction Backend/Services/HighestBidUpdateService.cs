using Car_Auction_Backend.Data;
using Car_Auction_Backend.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Car_Auction_Backend.Services
{
	public class HighestBidUpdateService : BackgroundService
	{
		private readonly IServiceProvider _serviceProvider;

		public HighestBidUpdateService(IServiceProvider serviceProvider)
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

					// Get all ongoing bids
					var ongoingBids = await dbContext.Bids
						.Where(b => b.Bstatus == "Ongoing")
						.ToListAsync(stoppingToken);

					foreach (var bid in ongoingBids)
					{
						// Get the highest bid amount for this bid
						var highestBidAmount = await dbContext.Bid_subs
							.Where(bs => bs.BidID == bid.BidId)
							.MaxAsync(bs => (decimal?)bs.Amount, stoppingToken) ?? 0;

						// Update the HighBid in the Bid table
						if (highestBidAmount > bid.HighBid)
						{
							bid.HighBid = highestBidAmount;
							await dbContext.SaveChangesAsync(stoppingToken);
						}
					}
				}

				// Wait for 30 seconds before the next check
				await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
			}
		}
	}
}