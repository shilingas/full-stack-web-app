using CsvHelper;
using System.IO;
using System.Globalization;
namespace back_end_side.Controllers
{
    public class ReadingController
    {
        public void ReadFromFile()
        {
            using (var streamReader = new StreamReader(@"C:\Users\Marius\Documents\FullStackWebApp\test.csv"))
            {
                using (var csvReader = new CsvReader(streamReader, CultureInfo.InvariantCulture))
                {
                    var records = csvReader.GetRecords<dynamic>().ToList();
                    System.Diagnostics.Debug.WriteLine(records);
                }
            }
        }
    }
}
