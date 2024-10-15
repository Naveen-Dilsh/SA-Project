using Car_Auction_Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Car_Auction_Backend.Data.Configs
{
	public class UserConfig : IEntityTypeConfiguration<User>
	{
		public void Configure(EntityTypeBuilder<User> builder)
		{
			builder.ToTable("Users");
			builder.HasKey(x => x.UId);

			builder.Property(x => x.UId).UseIdentityColumn();

			builder.Property(n => n.UName).IsRequired();
			builder.Property(n => n.UPassword).IsRequired();
			builder.Property(n => n.URole).HasDefaultValue("User");
			builder.Property(n => n.UEmail).IsRequired();
			builder.Property(n => n.Address).IsRequired(false);
			builder.Property(n => n.C_Number).IsRequired(false);
		}
	}
}
