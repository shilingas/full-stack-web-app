using back_end_side.DbFiles;
using back_end_side.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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

        public static void RemoveDuplicates(this List<Record> list, ExpensesContext context)
        {
            //removing duplicates in list
            var uniqueList = list.Where(i => i.ExpenseCode != null).DistinctBy(i => i.ExpenseCode).ToList();
            var nullList = list.Where(i => i.ExpenseCode == null).ToList();
            uniqueList.AddRange(nullList);
            list.Clear();
            list.AddRange(uniqueList);
            //removing records that duplicate with database records
            list.RemoveAll(record => context.Expenses.SingleOrDefault(r => r.ExpenseCode == record.ExpenseCode) != null);
           
        }
    }
}
