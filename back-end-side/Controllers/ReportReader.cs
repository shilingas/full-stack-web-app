using back_end_side.Models;
using CsvHelper;
using System.Globalization;

namespace back_end_side.Controllers
{
    public class ReportReader
    {
        public static List<Record> ReadFromCsvFile()
        {
            if (File.Exists("../back-end-side/uploadedFiles/test.csv"))
            {
                using var streamReader = new StreamReader("../back-end-side/uploadedFiles/test.csv");
                using var csvReader = new CsvReader(streamReader, CultureInfo.InvariantCulture);
                var records = csvReader.GetRecords<Record>().ToList();
                return records;
            }
            return new List<Record>();
        }
    }
}
