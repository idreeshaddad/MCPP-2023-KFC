using MB.KFC.Entities;
using Microsoft.EntityFrameworkCore;

namespace MB.KFC.EfCore
{
    public class KfcDbContext : DbContext
    {
        public KfcDbContext(DbContextOptions<KfcDbContext> options) : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Cart> Carts { get; set; }
    }
}
