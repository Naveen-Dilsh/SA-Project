using Car_Auction_Backend.Models;
using System.Net.Mail;

namespace Car_Auction_Backend.Services
{
	public class EmailService : IEmailService
	{
		private readonly SmtpClient _smtpClient;
		private readonly string _senderEmail;

		public EmailService(SmtpClient smtpClient, IConfiguration configuration)
		{
			_smtpClient = smtpClient;
			_senderEmail = configuration.GetSection("SmtpSettings")["SenderEmail"];
		}

		public async Task SendVerificationEmail(User user, string token)
		{
			var verificationLink = $"http://localhost:3000/verify-email?token={token}";
			var mailMessage = new MailMessage
			{
				From = new MailAddress(_senderEmail),
				Subject = "Verify your email",
				Body = $"Please verify your email by clicking <a href='{verificationLink}'>here</a>",
				IsBodyHtml = true,
			};
			mailMessage.To.Add(user.UEmail);
			await _smtpClient.SendMailAsync(mailMessage);
		}

		public async Task SendAdminRegistrationNotification(Admin admin)
		{
			var mailMessage = new MailMessage
			{
				From = new MailAddress(_senderEmail),
				Subject = "New Admin Registration",
				Body = $"A new admin account has been registered for {admin.AName}. Please review and approve.",
				IsBodyHtml = true,
			};
			mailMessage.To.Add("mainadmin@yourapp.com"); // Replace with your main admin email

			await _smtpClient.SendMailAsync(mailMessage);
		}

		public async Task SendAdminApprovalNotification(Admin admin)
		{
			var mailMessage = new MailMessage
			{
				From = new MailAddress(_senderEmail),
				Subject = "Admin Account Approved",
				Body = $"Your admin account ({admin.AName}) has been approved. You can now log in to the system.",
				IsBodyHtml = true,
			};
			mailMessage.To.Add(admin.AEmail);

			await _smtpClient.SendMailAsync(mailMessage);
		}
		public async Task SendAdminRejectionNotification(Admin admin)
		{
			var mailMessage = new MailMessage
			{
				From = new MailAddress(_senderEmail),
				Subject = "Admin Account Rejected",
				Body = $"Your admin account ({admin.AName}) has been rejected. Please contact the main administrator for more information.",
				IsBodyHtml = true,
			};
			mailMessage.To.Add(admin.AEmail);

			await _smtpClient.SendMailAsync(mailMessage);
		}
	}


}
