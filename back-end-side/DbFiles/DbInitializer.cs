using System.Diagnostics;
using back_end_side.Models;

namespace back_end_side.DbFiles
{
    public class DbInitializer
    {
        public static void Initialize(ExpensesContext context)
        {
            // Look for any students.
            /*if (context.Expenses.Any())
            {
                return;   // DB has been seeded
            }

            var students = new Record[]
            {
                new Record{Date=DateTime.Parse("2019-09-01"), Seller="TEST1", Purpose="smth", Amount = 12},
                new Record{Date=DateTime.Parse("2019-09-02"), Seller="TEST2", Purpose="testing", Amount = 10},
                new Record{Date=DateTime.Parse("2019-09-03"), Seller="TEST3", Purpose="test", Amount = 15.13},
               
               
            };

            context.Expenses.AddRange(students);
            context.SaveChanges();*/
        }
    }
}
