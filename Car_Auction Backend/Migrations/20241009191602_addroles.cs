using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Car_Auction_Backend.Migrations
{
    /// <inheritdoc />
    public partial class addroles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "URole",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "User");

            migrationBuilder.AddColumn<string>(
                name: "ARole",
                table: "Admins",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "Admin");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "URole",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ARole",
                table: "Admins");
        }
    }
}
