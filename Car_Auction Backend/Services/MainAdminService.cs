using Car_Auction_Backend.Data;
using Car_Auction_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Car_Auction_Backend.Services
{
	public class MainAdminService
	{
		private readonly ApplicationDbContext _context;
		private readonly IEmailService _emailService;

		public MainAdminService(ApplicationDbContext context, IEmailService emailService)
		{
			_context = context;
			_emailService = emailService;
		}

		public async Task ApproveAdmin(int adminId)
		{
			var admin = await _context.Admins.FindAsync(adminId);
			if (admin == null)
			{
				throw new Exception("Admin not found.");
			}

			admin.AStatus = "Approved";
			await _context.SaveChangesAsync();

			await _emailService.SendAdminApprovalNotification(admin);
		}

		public async Task<List<Admin>> GetPendingAdmins()
		{
			return await _context.Admins
				.Where(a => a.AStatus == "Pending")
				.ToListAsync();
		}

		public async Task RejectAdmin(int adminId)
		{
			var admin = await _context.Admins.FindAsync(adminId);
			if (admin == null)
			{
				throw new Exception("Admin not found.");
			}

			admin.AStatus = "Rejected";
			await _context.SaveChangesAsync();
		}

		public async Task<Admin> GetAdminById(int adminId)
		{
			var admin = await _context.Admins.FindAsync(adminId);
			if (admin == null)
			{
				throw new Exception("Admin not found.");
			}
			return admin;
		}
	}
}
