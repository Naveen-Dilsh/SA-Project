using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Car_Auction_Backend.Models;
using Car_Auction_Backend.Data;
using System.Threading.Tasks;

namespace Car_Auction_Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AdminController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public AdminController(ApplicationDbContext context)
		{
			_context = context;
		}

		// POST: api/Admin
		[HttpPost]
		public async Task<ActionResult<Admin>> PostAdmin(Admin admin)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			// IsMainAdmin and AStatus will use the default values set in AdminConfig
			// if not explicitly provided in the request

			_context.Admins.Add(admin);
			await _context.SaveChangesAsync();

			return CreatedAtAction(nameof(GetAdmin), new { id = admin.AId }, admin);
		}

		// GET: api/Admin/{adminId}
		[HttpGet("{adminId}")]
		public async Task<IActionResult> GetAdmin(int adminId)
		{
			var admin = await _context.Admins.FindAsync(adminId);

			if (admin == null)
			{
				return NotFound();
			}

			return Ok(admin);
		}

		//---------------------------------------------------------get Bid detailes from Admin Id----------------------------------------//.

		// GET: api/Admin/{adminId}/car-bid-details
		[HttpGet("{adminId}/car-bid-details")]
			public async Task<ActionResult<object>> GetCarDetailsAndHighestBid(int adminId)
			{
				var result = await _context.Bids
					.Where(b => b.AdminId == adminId)
					.Select(b => new
					{
						AdminId = b.AdminId,
						BidId = b.BidId,
						CarDetails = new
						{
							b.Car.CId,
							b.Car.Model,
							b.Car.Brand,
							b.Car.Year,
							b.Car.Description,
							b.Car.ImageUrl,
							b.Car.CStatus
						},
						HighestBid = b.HighBid
					})
					.ToListAsync();

				if (result == null || !result.Any())
				{
					return NotFound($"No bids found for admin with ID {adminId}");
				}

				return Ok(result);
			}

		//----------------------------------------------------------------Auction History -----------------------------------------------------//

		// GET: api/Admin/history/{adminId}
		[HttpGet("history/{adminId}")]
		public async Task<IActionResult> GetAuctionHistory(int adminId)
		{
			var auctionHistory = await _context.Bids
				.Where(b => b.AdminId == adminId && b.Bstatus == "Closed")
				.Select(b => new
				{
					BidId = b.BidId,
					OpeningBid = b.OpeningBid,
					StartTime = b.StartTime,
					EndTime = b.EndTime,
					Status = b.Bstatus,
					HighestBid = b.HighBid,
					Car = new
					{
						CarId = b.Car.CId,
						Model = b.Car.Model,
						Brand = b.Car.Brand,
						Year = b.Car.Year,
						Description = b.Car.Description,
						ImageUrl = b.Car.ImageUrl,
						Status = b.Car.CStatus
					},
					BidSubmissions = b.Bid_Subs.Select(bs => new
					{
						SubId = bs.SubId,
						Amount = bs.Amount,
						ReservationPrice = bs.ReservationPrice,
						Status = bs.BSStatus,
						User = new
						{
							UserId = bs.User.UId,
							Username = bs.User.UName
						}
					}).OrderByDescending(bs => bs.Amount).ToList()
				})
				.ToListAsync();

			if (auctionHistory == null || !auctionHistory.Any())
			{
				return NotFound("No auction history found for the given admin ID.");
			}

			return Ok(auctionHistory);
		}

		//------------------------------------------------------To get for Manage data----------------------------------------------------//

		[HttpGet("GetManage/{adminId}")]
		public async Task<IActionResult> GetManage(int adminId)
		{
			var auctionHistory = await _context.Bids
				.Where(b => b.AdminId == adminId && b.Bstatus == "Ongoing" )
				.Select(b => new
				{
					BidId = b.BidId,
					OpeningBid = b.OpeningBid,
					StartTime = b.StartTime,
					EndTime = b.EndTime,
					Status = b.Bstatus,
					HighestBid = b.HighBid,
					Car = new
					{
						CarId = b.Car.CId,
						Model = b.Car.Model,
						Brand = b.Car.Brand,
						Year = b.Car.Year,
						Description = b.Car.Description,
						ImageUrl = b.Car.ImageUrl,
						Status = b.Car.CStatus
					},
					BidSubmissions = b.Bid_Subs.Select(bs => new
					{
						SubId = bs.SubId,
						Amount = bs.Amount,
						ReservationPrice = bs.ReservationPrice,
						Status = bs.BSStatus,
						User = new
						{
							UserId = bs.User.UId,
							Username = bs.User.UName
						}
					}).OrderByDescending(bs => bs.Amount).ToList()
				})
				.ToListAsync();

			if (auctionHistory == null || !auctionHistory.Any())
			{
				return NotFound("No auction history found for the given admin ID.");
			}

			return Ok(auctionHistory);
		}




		// New method to end an auction
		[HttpPost("EndAuction")]
		public async Task<IActionResult> EndAuction(int adminId, int bidId)
		{
			var bid = await _context.Bids
				.FirstOrDefaultAsync(b => b.AdminId == adminId && b.BidId == bidId);

			if (bid == null)
			{
				return NotFound($"No bid found with ID {bidId} for admin with ID {adminId}");
			}

			if (bid.Bstatus != "Ongoing")
			{
				return BadRequest("This auction is not ongoing and cannot be ended.");
			}

			bid.EndTime = DateTime.Now;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!BidExists(bidId))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return Ok(new { message = "Auction ended successfully", bid });
		}

		private bool BidExists(int id)
		{
			return _context.Bids.Any(e => e.BidId == id);
		}
	}
	}

