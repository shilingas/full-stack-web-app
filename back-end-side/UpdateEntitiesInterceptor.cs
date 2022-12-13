using back_end_side.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace back_end_side
{
    public class UpdateEntitiesInterceptor : SaveChangesInterceptor
    {
        public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
        {
            DbContext? dbContext = eventData.Context;
            if (dbContext == null)
            {
                return base.SavingChangesAsync(eventData, result, cancellationToken);
            }
            IEnumerable<EntityEntry<Record>> entries = dbContext.ChangeTracker.Entries<Record>();

            foreach (EntityEntry<Record> entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Property(a => a.CreatedOnUtc).CurrentValue = DateTime.UtcNow;
                }
            }
            return base.SavingChangesAsync(eventData, result, cancellationToken);
        }
    }
}
