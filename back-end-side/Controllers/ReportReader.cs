using back_end_side.Models;
using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;
using System.Reflection.PortableExecutable;

namespace back_end_side.Controllers
{
    public class ReportReader
    {
        public static int? bank = null;
        public static List<Record>? ReadFromCsvFile()
        {
            // swedbank = 0, paysera = 1, seb = 2
            
            if (File.Exists("../back-end-side/uploadedFiles/report.csv"))
            {
                var DelimiterToSemicolon = new CsvConfiguration(CultureInfo.InvariantCulture)
                {
                    Delimiter = ";",
                };
                using var streamReader = new StreamReader("../back-end-side/uploadedFiles/report.csv");

                if (bank == 0)
                {
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
                }
                else if (bank == 2)
                {
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
                    Console.WriteLine("Invalid bank ID"); 
                    bank = null;
                    return null;
                }
               
            }
            return new List<Record>();
            
        }

    }
}
