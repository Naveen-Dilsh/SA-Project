using Microsoft.EntityFrameworkCore;
using Car_Auction_Backend.Models;
using Car_Auction_Backend.Data.Configs;

namespace Car_Auction_Backend.Data
{
	public class ApplicationDbContext:DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

		public DbSet<Admin> Admins { get; set; }
		public DbSet<Car> Cars { get; set; }
		public DbSet<Bid> Bids { get; set; }
		public DbSet<User> users { get; set; }
		public DbSet<Bid_Sub> Bid_subs { get; set; }
		public DbSet<Payment> Payments { get; set; }
		public DbSet<Notification> Notifications { get; set; }
		public DbSet<AuctionHistory> AuctionHistory { get; set; }


		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfiguration(new AdminConfig());
			modelBuilder.ApplyConfiguration(new CarConfig());
			modelBuilder.ApplyConfiguration(new BidConfig());
			modelBuilder.ApplyConfiguration(new UserConfig());
			modelBuilder.ApplyConfiguration(new Bid_subConfig());
			modelBuilder.ApplyConfiguration(new PaymentConfig());
			modelBuilder.ApplyConfiguration(new NotificationConfig());
			modelBuilder.ApplyConfiguration(new  AuctionHistoryConfig());
		}
	}
}
