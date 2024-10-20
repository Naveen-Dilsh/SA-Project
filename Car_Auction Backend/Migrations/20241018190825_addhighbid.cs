using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Car_Auction_Backend.Migrations
{
    /// <inheritdoc />
    public partial class addhighbid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "HighBid",
                table: "Bids",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HighBid",
                table: "Bids");
        }
    }
}
