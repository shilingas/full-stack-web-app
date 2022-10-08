using back_end_side.Models;
using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;
using System.Reflection.PortableExecutable;

namespace back_end_side.Controllers
{
    public class ReportReader
    {
        public static List<Record>? ReadFromCsvFile()
        {
            // swedbank = 0, paysera = 1, seb = 2
            int bank = 0;

            var DelimiterToSemicolon = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                Delimiter = ";",
            };

            if (bank == 2)
            {
                using var streamReader = new StreamReader("../seb.csv");
                streamReader.ReadLine();
                using var csvReader = new CsvReader(streamReader, DelimiterToSemicolon);

                var records = csvReader.GetRecords<Record>().ToList();

                for (int i = records.Count - 1; i >= 0; --i)
                {
                    if (records.ElementAt(i).PaymentType.Equals("K"))
                    {
                        records.RemoveAt(i);
                    }

                    records.ElementAt(i).Amount /= 100;
                }

                return records;
            } else
            {
                if (bank == 0)
                {
                    using var streamReader = new StreamReader("../swedbank.csv");
                    using var csvReader = new CsvReader(streamReader, CultureInfo.InvariantCulture);

                    var records = csvReader.GetRecords<Record>().ToList();

                    int numberOfElements = records.Count;
                    records.RemoveAt(numberOfElements - 1);

                    for (int i = records.Count - 1; i >= 0; --i)
                    {
                        if ((records.ElementAt(i).Seller.Equals("") && records.ElementAt(i).Purpose.Equals("Likutis pradžiai")) ||
                            (records.ElementAt(i).Seller.Equals("") && records.ElementAt(i).Purpose.Equals("Apyvarta")) ||
                            records.ElementAt(i).PaymentType.Equals("K"))
                        {
                            records.RemoveAt(i);
                        }
                    }

                    return records;
                }
                else if (bank == 1)
                {
                    using var streamReader = new StreamReader("../paysera.csv");

                    using var csvReader = new CsvReader(streamReader, CultureInfo.InvariantCulture);

                    var records = csvReader.GetRecords<Record>().ToList();

                    for (int i = records.Count - 1; i >= 0; --i)
                    {
                        if (records.ElementAt(i).PaymentType.Equals("K"))
                        {
                            records.RemoveAt(i);
                        }
                        else
                        {
                            records.ElementAt(i).Amount *= -1;
                        }
                    }

                    return records;

                } else
                {
                    Console.WriteLine("Invalid bank ID");
                }
            }

            return null;
        }

    }
}
