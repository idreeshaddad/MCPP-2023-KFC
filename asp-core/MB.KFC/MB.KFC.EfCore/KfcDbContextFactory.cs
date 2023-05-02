using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;

namespace MB.KFC.EfCore
{
    public class KfcDbContextFactory : IDesignTimeDbContextFactory<KfcDbContext>
    {
        public KfcDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<KfcDbContext>();
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=MB-KFC;Trusted_Connection=True;MultipleActiveResultSets=true");

            return new KfcDbContext(optionsBuilder.Options);
        }
    }
}
