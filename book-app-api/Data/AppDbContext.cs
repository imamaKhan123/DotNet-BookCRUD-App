using Microsoft.EntityFrameworkCore;
using BookAppApi.Models;

namespace BookAppApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Book> Books => Set<Book>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Favorite> Favorites { get; set; }

}
