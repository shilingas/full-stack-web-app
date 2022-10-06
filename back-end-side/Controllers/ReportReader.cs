using back_end_side.Models;
using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;
using System.Reflection.PortableExecutable;

namespace back_end_side.Controllers
{
    public class ReportReader
    {
        public static List<Record> ReadFromCsvFile()
        {
            // swedbank = 0, paysera = 1, seb = 2
            int bank = 2;

            if (bank == 2)
            {
                var config = new CsvConfiguration(CultureInfo.InvariantCulture)
                {
                    Delimiter = ";",
                };

                using var streamReader = new StreamReader("../seb.csv");
                streamReader.ReadLine();
                using var csvReader = new CsvReader(streamReader, config);

                var records = csvReader.GetRecords<Record>().ToList();

                for (int i = records.Count - 1; i >= 0; --i)
                {
                    if (records.ElementAt(i).PaymentType != null && records.ElementAt(i).PaymentType.Contains("įskaitymas"))
                    {
                        records.RemoveAt(i);
                    }

                    records.ElementAt(i).Amount /= 100;
                }

                return records;
            } else
            {
                using var streamReader = new StreamReader("../swedbank.csv");
                streamReader.ReadLine();
                using var csvReader = new CsvReader(streamReader, CultureInfo.InvariantCulture);

                var records = csvReader.GetRecords<Record>().ToList();

                if (bank == 0)
                {
                    int numberOfElements = records.Count;
                    records.RemoveAt(numberOfElements - 1);
                }
                else if (bank == 1)
                {

                    for (int i = records.Count - 1; i >= 0; --i)
                    {
                        if (records.ElementAt(i).Amount > 0)
                        {
                            records.RemoveAt(i);
                        }
                        else
                        {
                            records.ElementAt(i).Amount *= -1;
                        }
                    }

                }

                return records;
            }
        }
    }
}
