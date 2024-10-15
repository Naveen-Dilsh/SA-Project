using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Car_Auction_Backend.Models;
using Car_Auction_Backend.Data;
using System;
using System.Threading.Tasks;

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

		/// <summary>
		/// Adds a new bid to the database.
		/// </summary>
		/// <param name="bid">The bid object to add.</param>
		/// <returns>The created bid object.</returns>
		/// <response code="201">Returns the newly created bid.</response>
		/// <response code="400">If the bid object is null or invalid.</response>
		[HttpPost]
		[ProducesResponseType(typeof(Bid), StatusCodes.Status201Created)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public async Task<ActionResult<Bid>> AddBid([FromBody] Bid bid)
		{
			if (bid == null)
			{
				return BadRequest("Bid object is null");
			}

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			// Check if the associated Admin exists
			var adminExists = await _context.Admins.AnyAsync(a => a.AId == bid.AdminId);
			if (!adminExists)
			{
				return BadRequest("The specified Admin does not exist.");
			}

			// Ensure we're not trying to set the Admin navigation property
			bid.Admin = null;

			_context.Bids.Add(bid);
			await _context.SaveChangesAsync();

			return CreatedAtAction(nameof(GetBid), new { id = bid.BidId }, bid);
		}

		/// <summary>
		/// Retrieves a bid by ID.
		/// </summary>
		/// <param name="id">The ID of the bid to retrieve.</param>
		/// <returns>The bid object.</returns>
		/// <response code="200">Returns the requested bid.</response>
		/// <response code="404">If the bid is not found.</response>
		[HttpGet("{id}")]
		[ProducesResponseType(typeof(Bid), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<ActionResult<Bid>> GetBid(int id)
		{
			var bid = await _context.Bids.FindAsync(id);

			if (bid == null)
			{
				return NotFound();
			}

			return bid;
		}

		/// <summary>
		/// Retrieves admin details for a specific bid.
		/// </summary>
		/// <param name="bidId">The ID of the bid.</param>
		/// <returns>The admin details associated with the bid.</returns>
		/// <response code="200">Returns the admin details.</response>
		/// <response code="404">If the bid or associated admin is not found.</response>
		[HttpGet("{bidId}/admin")]
		[ProducesResponseType(typeof(Admin), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<ActionResult<Admin>> GetAdminForBid(int bidId)
		{
			var bid = await _context.Bids
				.Include(b => b.Admin)
				.FirstOrDefaultAsync(b => b.BidId == bidId);

			if (bid == null)
			{
				return NotFound("Bid not found.");
			}

			if (bid.Admin == null)
			{
				return NotFound("Associated admin not found.");
			}

			return bid.Admin;
		}

		/// <summary>
		/// Retrieves all bids with their associated admin details.
		/// </summary>
		/// <returns>A list of bids with admin details.</returns>
		/// <response code="200">Returns the list of bids with admin details.</response>
		[HttpGet("with-admin")]
		[ProducesResponseType(typeof(IEnumerable<Bid>), StatusCodes.Status200OK)]
		public async Task<ActionResult<IEnumerable<Bid>>> GetAllBidsWithAdmins()
		{
			return await _context.Bids
				.Include(b => b.Admin)
				.ToListAsync();
		}
		[HttpGet("{bidId}/CAr")]
		[ProducesResponseType(typeof(Car), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
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
				return NotFound("Associated admin not found.");
			}

			return bid.Car;
		}
	}
}