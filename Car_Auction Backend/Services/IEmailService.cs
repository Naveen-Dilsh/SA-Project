using Car_Auction_Backend.Models;

namespace Car_Auction_Backend.Services
{
	public interface IEmailService
	{
		Task SendVerificationEmail(User user, string token);
		Task SendAdminRegistrationNotification(Admin admin);
		Task SendAdminApprovalNotification(Admin admin);
		Task SendAdminRejectionNotification(Admin admin);
		Task SendWinningBidNotification(User user, Bid bid);
	}
}
