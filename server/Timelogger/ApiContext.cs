using Microsoft.EntityFrameworkCore;
using Timelogger.Entities;

namespace Timelogger
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ItemTask> Tasks { get; set; }

    }
}
