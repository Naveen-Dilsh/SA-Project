using Car_Auction_Backend.Data;
using Car_Auction_Backend.Models;
using Car_Auction_Backend.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Auction_Backend.Services
{
	public class BidSubService : IBidSubService
	{
		private readonly ApplicationDbContext _context;
		private readonly IEmailService _emailService;
		private readonly ILogger<BidSubService> _logger;

		public BidSubService(ApplicationDbContext context, IEmailService emailService, ILogger<BidSubService> logger)
		{
			_context = context;
			_emailService = emailService;
			_logger = logger;
		}

		public async Task<bool> IsBidFinalized(int bidId)
		{
			return await _context.Bid_subs
				.AnyAsync(b => b.BidID == bidId && (b.BStatus == "Sold" || b.BStatus == "Closed"));
		}

		public async Task<bool> FinalizeBidAndNotifyWinner(int bidId)
		{
			_logger.LogInformation("Finalizing bid {bidId}", bidId);

			var bidSubs = await _context.Bid_subs
				.Include(bs => bs.User)
				.Include(bs => bs.Bid)
				.Where(bs => bs.BidID == bidId)
				.ToListAsync();

			_logger.LogInformation("Found {count} bid submissions for bid {bidId}", bidSubs.Count, bidId);

			if (!bidSubs.Any())
				return false;

			var highestBidSub = bidSubs.OrderByDescending(bs => bs.Amount).FirstOrDefault();
			if (highestBidSub == null)
				return false;

			// Update all bid submissions for this auction to "Closed"
			foreach (var bidSub in bidSubs)
			{
				bidSub.BStatus = "Closed";
			}

			// Update the highest bid status to "Sold"
			highestBidSub.BStatus = "Sold";

			await _context.SaveChangesAsync();

			

			return true;
		}
	}
}