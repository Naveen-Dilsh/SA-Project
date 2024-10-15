using Car_Auction_Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Car_Auction_Backend.Data.Configs
{
	public class BidConfig : IEntityTypeConfiguration<Bid>
	{
		public void  Configure(EntityTypeBuilder<Bid> builder)
		{
			builder.ToTable("Bids");
			builder.HasKey(x => x.BidId);

			builder.Property(x => x.BidId).UseIdentityColumn();

			builder.Property(n => n.OpeningBid).IsRequired();
			builder.Property(n => n.StartTime).IsRequired();
			builder.Property(n => n.EndTime).IsRequired();

			builder.HasOne(n => n.Admin)
				.WithMany(n => n.Bids)
				.HasForeignKey(n => n.AdminId)
				.HasConstraintName("FK_Bids_Admins");

			builder.HasOne(b => b.Car)
				.WithOne(c => c.Bid)
				.HasForeignKey<Bid>(b => b.CarId)
				.HasConstraintName("FK_Bids_Cars");


		}
	}
}
