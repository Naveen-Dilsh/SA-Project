using Car_Auction_Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Car_Auction_Backend.Data.Configs
{
	public class CarConfig : IEntityTypeConfiguration<Car>
	{
		public void Configure(EntityTypeBuilder<Car> builder)
		{
			builder.ToTable("Cars");
			builder.HasKey(x => x.CId);

			builder.Property(x => x.CId).UseIdentityColumn();

			builder.Property(n => n.Model).IsRequired();
			builder.Property(n => n.Brand).IsRequired();
			builder.Property(n => n.Year).IsRequired();
			builder.Property(n => n.Description).IsRequired(false);
			builder.Property(n => n.ImageUrl).IsRequired(false);
			builder.Property(n => n.CStatus).HasDefaultValue("Unsold");

		}
	}
}
