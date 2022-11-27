using back_end_side.DbFiles;
using back_end_side.Models;

namespace back_end_side.Controllers
{
    public interface IReportReader
    {
        List<Record>? ReadFromCsvFile(IFormFile fileData, DeleteDuplicates deleteDuplicates);
        List<Record> GetIncomeList();
    }
}