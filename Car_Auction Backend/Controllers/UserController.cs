using Car_Auction_Backend.Data;
using Car_Auction_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
	}
}
