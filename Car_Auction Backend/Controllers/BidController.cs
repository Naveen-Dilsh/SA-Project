using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Car_Auction_Backend.Models;
using Car_Auction_Backend.Data;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Car_Auction_Backend.DTOs;
using Microsoft.Extensions.Caching.Memory;

namespace Car_Auction_Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class BidController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public BidController(ApplicationDbContext context)
		{
			_context = context;
		}


		//---------------------------------------------------------------------Add a Bid-------------------------------------------------------------------//

		// POST: api/Bid
		[HttpPost]
		public async Task<ActionResult<Bid>> AddBid([FromBody] Bid bid)
		{
			if (bid == null)
			{
				return BadRequest("Bid object is null.");
			}

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			// Ensure the associated Admin exists
			var adminExists = await _context.Admins.AnyAsync(a => a.AId == bid.AdminId);
			if (!adminExists)
			{
				return BadRequest("Admin not found.");
			}

			// Set HighBid equal to OpeningBid when a new bid is created
			bid.HighBid = bid.OpeningBid;

			// Add bid to the database
			_context.Bids.Add(bid);
			await _context.SaveChangesAsync();

			return CreatedAtAction(nameof(GetBid), new { id = bid.BidId }, bid);
		}

		// GET: api/Bid/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Bid>> GetBid(int id)
		{
			var bid = await _context.Bids
				.Include(b => b.Car) // Include Car details
				.FirstOrDefaultAsync(b => b.BidId == id);

			if (bid == null)
			{
				return NotFound("Bid not found.");
			}

			return bid;
		}

		//---------------------------------------------------------Get car detailes by using Bid Id-------------------------------------------//

		// GET: api/Bid/with-admin
		[HttpGet("with-admin")]
		public async Task<ActionResult<IEnumerable<Bid>>> GetAllBidsWithAdmins()
		{
			return await _context.Bids
				.Include(b => b.Admin)
				.Include(b => b.Car) // Include Car details in the bid
				.ToListAsync();
		}

		// GET: api/Bid/{bidId}/car
		[HttpGet("{bidId}/car")]
		public async Task<ActionResult<Car>> GetCarForBid(int bidId)
		{
			var bid = await _context.Bids
				.Include(b => b.Car)
				.FirstOrDefaultAsync(b => b.BidId == bidId);

			if (bid == null)
			{
				return NotFound("Bid not found.");
			}

			if (bid.Car == null)
			{
				return NotFound("Associated car not found.");
			}

			return bid.Car;
		}


		//------------------------------------------------------------Get data for Latest Auction------------------------------------------------//

		// GET: api/Bid/car-details
		[HttpGet("car-details")]
		public async Task<ActionResult<IEnumerable<CarInfoDto>>> GetAllCarDetailsFromBids()
		{
			// Fetch bids with their associated cars
			var bidsWithCars = await _context.Bids
				.Include(b => b.Car)  // Include Car details in the bid
				.ToListAsync();

			// Select the car details (ImageUrl, Brand, Model) from the cars associated with the bids
			var carDetails = bidsWithCars
				.Where(bid => bid.Car != null && !string.IsNullOrEmpty(bid.Car.ImageUrl) && bid.Bstatus == "Ongoing" ) // Ensure Car is not null and ImageUrl is valid
				.Select(bid => new CarInfoDto
				{
					BidId = bid.BidId,
					ImageUrl = bid.Car.ImageUrl,
					Brand = bid.Car.Brand,
					Model = bid.Car.Model
				})
				.Distinct() // Get distinct car details
				.ToList();

			if (carDetails == null || carDetails.Count == 0)
			{
				return NotFound("No car details found.");
			}

			return Ok(carDetails);
		}

		//--------------------------------------------------------------Get Images detailes for Bid data-------------------------------------------------------//

		// GET: api/Bid/car-details/{bidId}
		[HttpGet("Bid-details/{bidId}")]
		public async Task<ActionResult<BidDto>> GetBidDetailsByBidId(int bidId)
		{
			// Fetch the bid with the given BidId and include the associated car
			var bid = await _context.Bids
				.Include(b => b.Car)  // Include Car details
				.FirstOrDefaultAsync(b => b.BidId == bidId);

			// If bid not found or no car associated with the bid, return NotFound
			if (bid == null || bid.Car == null)
			{
				return NotFound("Bid or associated car not found.");
			}

			// Prepare the DTO with car details
			var BidDetails = new BidDto
			{
				BidId = bid.BidId,
				ImageUrl = bid.Car.ImageUrl,
				Brand = bid.Car.Brand,
				Model = bid.Car.Model,
				Description = bid.Car.Description,
				StartTime = bid.StartTime,
				EndTime = bid.EndTime,
				OpeningBid = bid.OpeningBid,
			};

			// Return the car details
			return Ok(BidDetails);
		}


		// GET: api/Bid/all-bids-with-cars
		[HttpGet("all-bids-with-cars")]
		public async Task<ActionResult<IEnumerable<object>>> GetAllBidsWithCars()
		{
			var bidsWithCars = await _context.Bids
				.Include(b => b.Car)
				.Select(b => new
				{
					BidId = b.BidId,
					HighBid = b.HighBid,
					Car = new
					{
						CId = b.Car.CId,
						Brand = b.Car.Brand,
						Model = b.Car.Model,
						Year = b.Car.Year,
						ImageUrl = b.Car.ImageUrl,
						Description = b.Car.Description
					}
				})
				.ToListAsync();

			if (bidsWithCars == null || !bidsWithCars.Any())
			{
				return NotFound("No bids with cars found.");
			}

			return Ok(bidsWithCars);
		}

		// GET: api/Bid/admin/{adminId}/active-auctions
		[HttpGet("admin/{adminId}/active-auctions")]
		public async Task<ActionResult<int>> GetActiveAuctionsCountForAdmin(int adminId)
		{
			// Check if the admin exists
			var adminExists = await _context.Admins.AnyAsync(a => a.AId == adminId);
			if (!adminExists)
			{
				return NotFound("Admin not found.");
			}

			// Count the number of ongoing auctions for the specified admin
			var activeAuctionsCount = await _context.Bids
				.Where(b => b.AdminId == adminId && b.Bstatus == "Ongoing")
				.CountAsync();

			return Ok(activeAuctionsCount);
		}



	}

}

