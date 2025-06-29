using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace book_app_api.Migrations
{
    /// <inheritdoc />
    public partial class FixPublishDateType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
        migrationBuilder.Sql(
                @"ALTER TABLE ""Books"" ALTER COLUMN ""PublishDate"" TYPE timestamp with time zone USING ""PublishDate""::timestamp with time zone;");
        
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
    migrationBuilder.Sql(
                @"ALTER TABLE ""Books"" ALTER COLUMN ""PublishDate"" TYPE timestamp without time zone USING ""PublishDate""::timestamp without time zone;");
        
        }
    }
}
