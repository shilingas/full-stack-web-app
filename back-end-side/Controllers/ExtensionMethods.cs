using back_end_side.Models;

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

        public static List<Record> RemoveDuplicates(this List<Record> list)
        {
            var uniqueList = list.Where(i => i.ExpenseCode != null).DistinctBy(i => i.ExpenseCode).ToList();
            var nullList = list.Where(i => i.ExpenseCode == null).ToList();
            uniqueList.AddRange(nullList);
            return uniqueList;
        }
    }
}
