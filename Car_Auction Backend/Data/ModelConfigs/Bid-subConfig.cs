using Car_Auction_Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Car_Auction_Backend.Data.Configs
{
	public class Bid_subConfig : IEntityTypeConfiguration<Bid_Sub>
	{
		public void Configure(EntityTypeBuilder<Bid_Sub> builder)
		{
			builder.ToTable("Bid_subs");
			builder.HasKey(x => x.SubId);

			builder.Property(x => x.SubId).UseIdentityColumn();

			builder.Property(n => n.Amount).IsRequired();
			builder.Property(n => n.ReservationPrice).IsRequired();
			builder.Property(n => n.BStatus).HasDefaultValue("Ongoing");

			builder.HasOne(n => n.User)
				.WithMany(n => n.Bid_Subs)
				.HasForeignKey(n => n.UserId)
				.HasConstraintName("FK_BidSubs_User");

			builder.HasOne(b => b.Bid)
				.WithMany(c => c.Bid_Subs)
				.HasForeignKey(b => b.BidID)
				.HasConstraintName("FK_BidSub_Bid");


		}
	}
}
