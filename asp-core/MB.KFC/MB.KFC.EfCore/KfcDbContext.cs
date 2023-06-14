using MB.KFC.Entities;
using MB.KFC.Entities.Customers;
using Microsoft.EntityFrameworkCore;

namespace MB.KFC.EfCore
{
    public class KfcDbContext : DbContext
    {
        public KfcDbContext(DbContextOptions<KfcDbContext> options) : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }


        public DbSet<UploaderImage> UploaderImages { get; set; }
        public DbSet<CustomerImage> CustomerImages { get; set; }
        public DbSet<Customer> Customers { get; set; }



        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Cart> Carts { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UploaderImage>().UseTpcMappingStrategy()
                .ToTable("UploaderImages");

            modelBuilder.Entity<CustomerImage>()
                .ToTable("CustomerImages");
        }
    }
}
