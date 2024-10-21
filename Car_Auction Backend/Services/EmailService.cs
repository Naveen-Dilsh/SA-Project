using Car_Auction_Backend.Models;
using Newtonsoft.Json.Linq;
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

		public async Task SendHighestBidderNotification(User user, Bid bid)
		{
			var carImageUrl = bid.Car?.ImageUrl; // Get the image URL from the Car associated with the Bid
			var payNowLink = $"http://localhost:3000/notification/{bid.BidId}"; // The link to the PayNow component with bidId

			var mailMessage = new MailMessage
			{
				From = new MailAddress(_senderEmail),
				Subject = "You are the highest bidder!",
				Body = $@"
            <h1>Congratulations, {user.UName}!</h1>
            <p>You have won the auction for {bid.Car?.Model}.</p>
            <p>Here is the car you bid on:</p>
            <img src='{carImageUrl}' alt='{bid.Car?.Model}' style='width:400px;height:auto;' />
            <p>Click the button below to proceed with the payment:</p>
            <a href='{payNowLink}' style='display:inline-block;padding:10px 20px;background-color:#4CAF50;color:white;text-decoration:none;border-radius:5px;'>Pay Now</a>
            <p>Thank you for participating in the auction!</p>",
				IsBodyHtml = true, // Set IsBodyHtml to true to allow HTML content
			};

			mailMessage.To.Add(user.UEmail);

			await _smtpClient.SendMailAsync(mailMessage);
		}



	}


}
