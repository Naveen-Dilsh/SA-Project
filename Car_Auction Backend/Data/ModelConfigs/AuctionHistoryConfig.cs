using Car_Auction_Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Car_Auction_Backend.Data.Configs
{
	public class AuctionHistoryConfig : IEntityTypeConfiguration <AuctionHistory>
	{
		public void Configure(EntityTypeBuilder<AuctionHistory> builder)
		{
			builder.ToTable("Auction_History");
			builder.HasKey(b => b.HId);

			builder.Property(b => b.HId).UseIdentityColumn();
			builder.Property(b => b.EndTime).IsRequired();
			builder.Property(b => b.FinalBidAmount).IsRequired();

			builder.HasOne(b => b.Bid_Sub)
				.WithOne(c => c.AuctionHistory)
				.HasForeignKey<AuctionHistory>(c => c.Submissions_Id)
				.HasConstraintName("FK_Auction_BidSub");
		}
	}
}
