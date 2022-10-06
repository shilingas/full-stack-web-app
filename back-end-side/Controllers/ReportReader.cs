using back_end_side.Models;
using CsvHelper;
using System.Globalization;

namespace back_end_side.Controllers
{
    public class ReportReader
    {
        public static List<Record> ReadFromCsvFile()
        {
            // swedbank = 0, SEB = 1
            int bank = 0;

            using var streamReader = new StreamReader("../swedbank.csv");
            using var csvReader = new CsvReader(streamReader, CultureInfo.InvariantCulture);
            var records = csvReader.GetRecords<Record>().ToList();

            if (bank == 0)
            {
                int numberOfElements = records.Count;
                records.RemoveAt(numberOfElements - 1);
            }

            return records;
        }
    }
}
