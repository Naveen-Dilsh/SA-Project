using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Car_Auction_Backend.Migrations
{
    /// <inheritdoc />
    public partial class bstatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BStatus",
                table: "Bid_subs",
                newName: "BSStatus");

            migrationBuilder.AddColumn<string>(
                name: "Bstatus",
                table: "Bids",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "Ongoing");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Bstatus",
                table: "Bids");

            migrationBuilder.RenameColumn(
                name: "BSStatus",
                table: "Bid_subs",
                newName: "BStatus");
        }
    }
}
