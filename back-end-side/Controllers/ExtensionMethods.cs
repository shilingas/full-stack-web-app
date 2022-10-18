using back_end_side.Models;

namespace back_end_side.Controllers
{
    public static class ExtensionMethods
    {
        public static List<T> MoveToOtherList<T>(this List<T> list, ref List<T> list2, int elementId)
        {
            list2.Add(list[elementId]);
            list.RemoveAt(elementId);
            return list;
        }
    }
}
