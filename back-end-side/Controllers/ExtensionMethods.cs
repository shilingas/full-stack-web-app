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

    }
}
