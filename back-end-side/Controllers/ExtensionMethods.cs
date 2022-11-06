using back_end_side.DbFiles;
using back_end_side.Models;
using Microsoft.EntityFrameworkCore;

namespace back_end_side.Controllers
{
    public static class ExtensionMethods
    {
        public static List<T> MoveToOtherList<T>(this List<T> list, List<T> list2, int elementId, bool removeFromFirstList = true)
        {
            list2.Add(list[elementId]);
            if (removeFromFirstList)
            {
                list.RemoveAt(elementId);
            }
            return list;
        }

        public static void RemoveDuplicates(this ExpensesContext context)
        {
            var duplicates = context.Expenses.AsEnumerable().GroupBy(r =>  r.ExpenseCode).SelectMany(grp => grp.Skip(1));
            context.Expenses.RemoveRange(duplicates);
            context.SaveChanges();

        }
    }
}
