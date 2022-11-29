using back_end_side.Models;
using Microsoft.EntityFrameworkCore;

namespace back_end_side.DbFiles
{
    public class ExpensesContext : DbContext
    {
        public ExpensesContext(DbContextOptions<ExpensesContext> options) : base(options)
        {

        }

        public DbSet<Record> Expenses { get; set; }
        public DbSet<IncomeModel> Income { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Record>().ToTable("Expenses");
            modelBuilder.Entity<IncomeModel>().ToTable("Income");
        }
    }
}
