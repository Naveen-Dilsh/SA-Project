using Car_Auction_Backend.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

public class PaymentConfig : IEntityTypeConfiguration<Payment>
{
	public void Configure(EntityTypeBuilder<Payment> builder)
	{
		builder.ToTable("Payment");
		builder.HasKey(x => x.PId);
		builder.Property(x => x.PId).UseIdentityColumn();
		builder.Property(x => x.PAmount).IsRequired();
		builder.Property(x => x.PMethod).IsRequired();
		builder.Property(x => x.PStatus).HasDefaultValue("Pending");
		builder.Property(x => x.PDate).IsRequired();

		builder.HasOne(b => b.Bid_Sub)
			.WithOne(c => c.Payment)
			.HasForeignKey<Payment>(b => b.SubmissionId)
			.HasConstraintName("FK_Payment_BidSub")
			.OnDelete(DeleteBehavior.Cascade);  // Keep this as Cascade

		builder.HasOne(b => b.User)
			.WithMany(c => c.Payments)
			.HasForeignKey(b => b.UsersId)
			.HasConstraintName("FK_Payment_Users")
			.OnDelete(DeleteBehavior.Restrict);  // Change this to Restrict
	}
}