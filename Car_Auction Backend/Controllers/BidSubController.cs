using Car_Auction_Backend.Data;
using Car_Auction_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Car_Auction_Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class BidSubController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public BidSubController(ApplicationDbContext context)
		{
			_context = context;
		}

		// POST: api/Admin
		[HttpPost]
		public async Task<ActionResult<Bid_Sub>> PostBidSub(Bid_Sub bid_Sub)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			// IsMainAdmin and AStatus will use the default values set in AdminConfig
			// if not explicitly provided in the request

			_context.Bid_subs.Add(bid_Sub);
			await _context.SaveChangesAsync();

			return (bid_Sub);
		}
		[HttpGet("{bid_subId}/admin")]
		[ProducesResponseType(typeof(Admin), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<ActionResult<User>> GetUserForBidSub(int bid_subId)
		{
			var bid = await _context.Bid_subs
				.Include(b => b.User)
				.FirstOrDefaultAsync(b => b.SubId == bid_subId);

			if (bid == null)
			{
				return NotFound("Bid not found.");
			}

			if (bid.User == null)
			{
				return NotFound("Associated admin not found.");
			}

			return bid.User;
		}
	}
}
