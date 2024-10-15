using Car_Auction_Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Car_Auction_Backend.Data.Configs
{
	public class NotificationConfig : IEntityTypeConfiguration<Notification>
	{
		public void Configure(EntityTypeBuilder<Notification> builder)
		{
			builder.ToTable("Notification");

			builder.HasKey(x => x.NId);
			builder.Property(x => x.NId).UseIdentityColumn();

			builder.Property(x => x.NType).IsRequired();
			builder.Property(x => x.NMessage).IsRequired();

			builder.HasOne(b => b.User)
				.WithMany(c => c.Notifications)
				.HasForeignKey(b => b.UserssId)
				.HasConstraintName("FK_Notification_User");
		}
	}
}
