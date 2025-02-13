using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FoodCartApi.Migrations
{
    /// <inheritdoc />
    public partial class AddIndexingInFoodItemTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "330bde88-6e0e-4150-9ca7-2a103028049e");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "cfff46ba-46bf-4079-9ab0-fc14a21c5de7");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "FoodItems",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "06b25540-c848-4de0-aa95-ec286f47901b", null, "User", "USER" },
                    { "8a24345e-3233-4b1c-ad0e-c96600045927", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_FoodItems_Name_Price",
                table: "FoodItems",
                columns: new[] { "Name", "Price" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_FoodItems_Name_Price",
                table: "FoodItems");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "06b25540-c848-4de0-aa95-ec286f47901b");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "8a24345e-3233-4b1c-ad0e-c96600045927");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "FoodItems",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "330bde88-6e0e-4150-9ca7-2a103028049e", null, "Admin", "ADMIN" },
                    { "cfff46ba-46bf-4079-9ab0-fc14a21c5de7", null, "User", "USER" }
                });
        }
    }
}
