using back_end_side.Models;
using CsvHelper;
using System.Globalization;

namespace back_end_side.Controllers
{
    public class ReportReader
    {
        public static List<Record> ReadFromCsvFile()
        {
            using (var streamReader = new StreamReader("../test.csv"))
            {

                using (var csvReader = new CsvReader(streamReader, CultureInfo.InvariantCulture))
                {
                    var records = csvReader.GetRecords<Record>().ToList();

                    foreach (var record in records) // printing everything for testing
                    {
                        Console.WriteLine(record.Date);
                        Console.WriteLine(record.Seller);
                        Console.WriteLine(record.Purpose);
                        Console.WriteLine(record.Amount + " Eur");
                        Console.WriteLine();
                    }

                    return records;
                }
            }
        }
    }
}
