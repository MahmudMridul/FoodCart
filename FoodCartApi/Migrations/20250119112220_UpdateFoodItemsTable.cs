using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FoodCartApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateFoodItemsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "276e2c8f-9839-4f78-8f7c-6ca20448b3d0");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "65e95205-af32-4a0a-8e46-9b3016d15c5b");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "FoodItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "330bde88-6e0e-4150-9ca7-2a103028049e", null, "Admin", "ADMIN" },
                    { "cfff46ba-46bf-4079-9ab0-fc14a21c5de7", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "330bde88-6e0e-4150-9ca7-2a103028049e");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "cfff46ba-46bf-4079-9ab0-fc14a21c5de7");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "FoodItems");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "276e2c8f-9839-4f78-8f7c-6ca20448b3d0", null, "Admin", "ADMIN" },
                    { "65e95205-af32-4a0a-8e46-9b3016d15c5b", null, "User", "USER" }
                });
        }
    }
}
