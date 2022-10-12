using back_end_side.Models;
using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;

namespace back_end_side.Controllers
{
    public class ReportReader
    {
        
        public int? bank = null;
        public ReportReader(int bank)
        {
            this.bank = bank;
        }
        public List<Record>? ReadFromCsvFile()
        {
            
            if (File.Exists("../back-end-side/uploadedFiles/report.csv"))
            {
                var DelimiterToSemicolon = new CsvConfiguration(CultureInfo.InvariantCulture)
                {
                    Delimiter = ";",
                };

                using var streamReader = new StreamReader("../back-end-side/uploadedFiles/report.csv");

                if (bank == (int)Banks.Swedbank)
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
                else if (bank == (int)Banks.Paysera)
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
                else if (bank == (int)Banks.Seb)
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
                    return null;
                }
               
            }
            return new List<Record>();
            
        }

    }
    enum Banks
    {
        Swedbank,
        Paysera,
        Seb
    }
}
