using Car_Auction_Backend.Data;
using Car_Auction_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Car_Auction_Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public UserController(ApplicationDbContext context)
		{
			_context = context;
		}


		// POST: api/Admin
		[HttpPost]
		public async Task<ActionResult<User>> PostUser(User user)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			// IsMainAdmin and AStatus will use the default values set in AdminConfig
			// if not explicitly provided in the request

			_context.users.Add(user);
			await _context.SaveChangesAsync();

			return(user);
		}


		// GET: api/User/verified-users-count
		[HttpGet("verified-users-count")]
		public async Task<ActionResult<int>> GetVerifiedUsersCount()
		{
			// Count users where IsEmailVerified is true
			var verifiedUsersCount = await _context.users
				.Where(u => u.IsEmailVerified)
				.CountAsync();

			return Ok(verifiedUsersCount);
		}

	//--------------------------------------------------------------Get Data for Auction History----------------------------------------------------//


		// GET: api/User/{userId}/auction-history
		[HttpGet("{userId}/auction-history")]
		public async Task<ActionResult<IEnumerable<object>>> GetUserAuctionHistory(int userId)
		{
			try
			{
				// Check if user exists
				var user = await _context.users.FindAsync(userId);
				if (user == null)
				{
					return NotFound(new { message = "User not found" });
				}

				// Get all bid submissions for the user where status is Sold or Closed
				var auctionHistory = await _context.Bid_subs
					.Where(bs => bs.UserId == userId &&
						   (bs.BSStatus == "Sold" || bs.BSStatus == "Closed"))
					.Include(bs => bs.Bid)  // Include related Bid
					.ThenInclude(b => b.Car) // Include related Car
					.Select(bs => new
					{
						SubmissionId = bs.SubId,
						BidAmount = bs.Amount,
						ReservationPrice = bs.ReservationPrice,
						Status = bs.BSStatus,
						BidDetails = new
						{
							BidId = bs.Bid.BidId,
							OpeningBid = bs.Bid.OpeningBid,
							StartTime = bs.Bid.StartTime,
							EndTime = bs.Bid.EndTime,
							HighestBid = bs.Bid.HighBid,
							Status = bs.Bid.Bstatus
						},
						CarDetails = new
						{
							CarId = bs.Bid.Car.CId,
							Brand = bs.Bid.Car.Brand,
							Model = bs.Bid.Car.Model,
							Year = bs.Bid.Car.Year,
							Description = bs.Bid.Car.Description,
							ImageUrl = bs.Bid.Car.ImageUrl,
							Status = bs.Bid.Car.CStatus
						}
					})
					.OrderByDescending(bs =>bs.SubmissionId)
					.ToListAsync();

				if (!auctionHistory.Any())
				{
					return Ok(new
					{
						message = "No auction history found for this user",
						data = new List<object>()
					});
				}

				return Ok(new
				{
					message = "Auction history retrieved successfully",
					data = auctionHistory
				});
			}
			catch (Exception ex)
			{
				return StatusCode(500, new
				{
					message = "An error occurred while retrieving auction history",
					error = ex.Message
				});
			}
		}


		//----------------------------------------------Get data for Active Bids----------------------------------//

		// GET: api/User/{userId}/auction-history
		[HttpGet("{userId}/ActiveAuction")]
		public async Task<ActionResult<IEnumerable<object>>> GetUserActiveAuction(int userId)
		{
			try
			{
				// Check if user exists
				var user = await _context.users.FindAsync(userId);
				if (user == null)
				{
					return NotFound(new { message = "User not found" });
				}

				// Get all bid submissions for the user where status is Sold or Closed
				var auctionHistory = await _context.Bid_subs
					.Where(bs => bs.UserId == userId &&
						   (bs.BSStatus == "Ongoing"))
					.Include(bs => bs.Bid)  // Include related Bid
					.ThenInclude(b => b.Car) // Include related Car
					.Select(bs => new
					{
						SubmissionId = bs.SubId,
						BidAmount = bs.Amount,
						ReservationPrice = bs.ReservationPrice,
						Status = bs.BSStatus,
						BidDetails = new
						{
							BidId = bs.Bid.BidId,
							OpeningBid = bs.Bid.OpeningBid,
							StartTime = bs.Bid.StartTime,
							EndTime = bs.Bid.EndTime,
							HighestBid = bs.Bid.HighBid,
							Status = bs.Bid.Bstatus
						},
						CarDetails = new
						{
							CarId = bs.Bid.Car.CId,
							Brand = bs.Bid.Car.Brand,
							Model = bs.Bid.Car.Model,
							Year = bs.Bid.Car.Year,
							Description = bs.Bid.Car.Description,
							ImageUrl = bs.Bid.Car.ImageUrl,
							Status = bs.Bid.Car.CStatus
						}
					})
					.OrderByDescending(bs => bs.SubmissionId)
					.ToListAsync();

				if (!auctionHistory.Any())
				{
					return Ok(new
					{
						message = "No auction history found for this user",
						data = new List<object>()
					});
				}

				return Ok(new
				{
					message = "Auction history retrieved successfully",
					data = auctionHistory
				});
			}
			catch (Exception ex)
			{
				return StatusCode(500, new
				{
					message = "An error occurred while retrieving auction history",
					error = ex.Message
				});
			}
		}

	}
}
