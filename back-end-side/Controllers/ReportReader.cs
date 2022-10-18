using back_end_side.Models;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Components;
using System.Globalization;

namespace back_end_side.Controllers
{
    enum Banks
    {
        Swedbank,
        Paysera,
        Seb
    }

    public class ReportReader
    {
        public int? bank = null;
        public IFormFile fileData;
        private static List<Record> IncomeList = new List<Record>();
        public ReportReader(int bank, IFormFile fileData)
        {
            this.bank = bank;
            this.fileData = fileData;
        }
        public List<Record>? ReadFromCsvFile()
        {
            var DelimiterToSemicolon = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                Delimiter = ";",
            };
                
            using var streamReader = new StreamReader(fileData.OpenReadStream());

            if (bank == (int)Banks.Swedbank)
            {
                using var csvReader = new CsvReader(streamReader, CultureInfo.InvariantCulture);

                var records = csvReader.GetRecords<Record>().ToList();

                for (int i = records.Count - 1; i >= 0; --i)
                {
                    if ((records.ElementAt(i).Seller.Equals("") && records.ElementAt(i).Purpose.Equals("Likutis pradžiai")) ||
                        (records.ElementAt(i).Seller.Equals("") && records.ElementAt(i).Purpose.Equals("Apyvarta")) )
                    {
                        records.RemoveAt(i);
                    } 
                    else if (records.ElementAt(i).PaymentType.Equals("K"))
                    {
                        records.MoveToOtherList(ref IncomeList, i);
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
                        records.MoveToOtherList(ref IncomeList, i);
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
                    records.ElementAt(i).Amount /= 100;

                    if (records.ElementAt(i).PaymentType.Equals("K"))
                    {
                        records.MoveToOtherList(ref IncomeList, i);
                    }
                }
                return records;
                  
            } else
            {
                return null;
            }
        } 
    }
            
   }