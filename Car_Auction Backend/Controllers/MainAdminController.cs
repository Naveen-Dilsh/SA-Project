using Car_Auction_Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Car_Auction_Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class MainAdminController : ControllerBase
	{
		private readonly MainAdminService _mainAdminService;
		private readonly IEmailService _emailService;

		public MainAdminController(MainAdminService mainAdminService, IEmailService emailService)
		{
			_mainAdminService = mainAdminService;
			_emailService = emailService;
		}


		[HttpGet("pending-admins")]
		public async Task<IActionResult> GetPendingAdmins()
		{
			var isMainAdmin = User.HasClaim(c => c.Type == "IsMainAdmin" && c.Value == "true");
			if (!isMainAdmin)
			{
				Console.WriteLine("invalid", isMainAdmin);
				return Forbid();
			}
			var pendingAdmins = await _mainAdminService.GetPendingAdmins();
			return Ok(pendingAdmins);
		}




		[HttpPost("approve/{adminId}")]
		public async Task<IActionResult> ApproveAdmin(int adminId)
		{
			var isMainAdmin = User.HasClaim(c => c.Type == "IsMainAdmin" && c.Value == "true");
			if (!isMainAdmin)
			{
				return Forbid();
			}

			try
			{
				await _mainAdminService.ApproveAdmin(adminId);
				var admin = await _mainAdminService.GetAdminById(adminId);
				await _emailService.SendAdminApprovalNotification(admin);
				return Ok(new { Message = "Admin approved successfully." });
			}
			catch (Exception ex)
			{
				return BadRequest(new { Message = ex.Message });
			}
		}





		[HttpPost("reject-admin/{adminId}")]
		public async Task<IActionResult> RejectAdmin(int adminId)
		{
			var isMainAdmin = User.HasClaim(c => c.Type == "IsMainAdmin" && c.Value == "true");
			if (!isMainAdmin)
			{
				return Forbid();
			}

			try
			{
				await _mainAdminService.RejectAdmin(adminId);
				var admin = await _mainAdminService.GetAdminById(adminId);
				await _emailService.SendAdminRejectionNotification(admin);
				return Ok(new { Message = "Admin rejected successfully." });
			}
			catch (Exception ex)
			{
				return BadRequest(new { Message = ex.Message });
			}
		}


		[HttpGet("approved-admins")]
		public async Task<IActionResult> GetApprovedAdmins()
		{
			var isMainAdmin = User.HasClaim(c => c.Type == "IsMainAdmin" && c.Value == "true");
			if (!isMainAdmin)
			{
				return Forbid();
			}
			var approvedAdmins = await _mainAdminService.GetApprovedAdmins();
			return Ok(approvedAdmins);
		}

		[HttpDelete("remove-admin/{adminId}")]
		public async Task<IActionResult> RemoveAdmin(int adminId)
		{
			var isMainAdmin = User.HasClaim(c => c.Type == "IsMainAdmin" && c.Value == "true");
			if (!isMainAdmin)
			{
				return Forbid();
			}
			try
			{
				await _mainAdminService.RemoveAdmin(adminId);
				return Ok(new { Message = "Admin removed successfully." });
			}
			catch (Exception ex)
			{
				return BadRequest(new { Message = ex.Message });
			}
		}

		[HttpGet("Rejected-admins")]
		public async Task<IActionResult> GetRejecteddAdmins()
		{
			var isMainAdmin = User.HasClaim(c => c.Type == "IsMainAdmin" && c.Value == "true");
			if (!isMainAdmin)
			{
				return Forbid();
			}
			var approvedAdmins = await _mainAdminService.GetApprovedAdmins();
			return Ok(approvedAdmins);
		}
	}
}
