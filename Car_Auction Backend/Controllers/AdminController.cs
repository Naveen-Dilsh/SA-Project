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

		// GET: api/Admin/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Admin>> GetAdmin(int id)
		{
			var admin = await _context.Admins.FindAsync(id);

			if (admin == null)
			{
				return NotFound();
			}

			return admin;
		}
	}
}