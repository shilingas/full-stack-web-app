using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Record = back_end_side.Models.Record;
using back_end_side.Controllers;

namespace back_end_side.UnitTests
{
    public class ExtensionMethodsTests
    {
        [Fact]
        public void MoveToOtherList_OneRecordInListExists_RecordIsMovedToOtherList()
        {
            var list = new List<Record>();
            var secondList = new List<Record>();
            var record = new Record
            {
                Date = new DateTime(2022, 12, 10),
                Seller = "Kazkas",
                Amount = 20
            };
            list.Add(record);
            list.MoveToOtherList(secondList, 0, false);
            Assert.Equal(list[0], secondList[0]);

            list.MoveToOtherList(secondList, 0);
            Assert.Empty(list);
        }
    }
}
