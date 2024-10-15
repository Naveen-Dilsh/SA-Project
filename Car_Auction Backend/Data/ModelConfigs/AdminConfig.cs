using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Car_Auction_Backend.Models;

namespace Car_Auction_Backend.Data.Configs
{
	public class AdminConfig:IEntityTypeConfiguration<Admin>
	{
		public void Configure(EntityTypeBuilder<Admin> builder)
		{
			builder.ToTable("Admins");
			builder.HasKey(x => x.AId);

			builder.Property(x => x.AId).UseIdentityColumn();

			builder.Property(n => n.AName).IsRequired();
			builder.Property(n => n.APassword).IsRequired();
			builder.Property(n => n.ARole).HasDefaultValue("Admin");
			builder.Property(n => n.AEmail).IsRequired();
			builder.Property(n => n.IsMainAdmin).HasDefaultValue(false);
			builder.Property(n => n.AStatus).HasDefaultValue("Pending");

		}
	}
}
