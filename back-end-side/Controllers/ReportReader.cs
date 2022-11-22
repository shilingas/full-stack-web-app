using back_end_side.DbFiles;
using back_end_side.Models;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Components;
using System.Globalization;
using System.Text.RegularExpressions;

namespace back_end_side.Controllers
{
    enum Banks
    {
        Swedbank,
        Paysera,
        Seb
    }

    public delegate void DeleteDuplicates(List<Record> list);
    public class ReportReader : IReportReader
    {
        private static Lazy<List<Record>> IncomeList = new Lazy<List<Record>>();
        private int CheckBank(StreamReader streamReader)
        {
            string? firstLine = streamReader.ReadLine();
            string sebPattern = @"^(""SĄSKAITOS  \(LT\d{2}70440\d{11}\) IŠRAŠAS \(UŽ LAIKOTARPĮ:)+";
            Regex expr = new Regex(sebPattern);

            if (expr.Matches(firstLine).Count > 0)
                return 2;

            if (firstLine.Equals("\"Sąskaitos Nr.\",\"\",\"Data\",\"Gavėjas\",\"Paaiškinimai\",\"Suma\",\"Valiuta\",\"D/K\",\"Įrašo Nr.\",\"Kodas\",\"Įmokos kodas\",\"Dok. Nr.\",\"Kliento kodas mokėtojo IS\",\"Kliento kodas\",\"Pradinis mokėtojas\",\"Galutinis gavėjas\","))
                return 0;

            if (firstLine.Equals("Tipas,\"Išrašo nr.\",\"Pervedimo nr.\",\"Data ir laikas\",\"Gavėjas / Mokėtojas\",Kodas,\"Suma ir valiuta\",Valiutos,Paskirtis,\"Įmokos kodas\",\"Kreditas / Debetas\",Likutis"))
                return 1;

            else return -1;
        }
        public List<Record>? ReadFromCsvFile(IFormFile fileData, DeleteDuplicates deleteDuplicates)
        {
            var DelimiterToSemicolon = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                Delimiter = ";",
            };

            Stream stream = fileData.OpenReadStream();
            using var streamReader = new StreamReader(stream);

            int bank = CheckBank(streamReader);

            stream.Position = 0;
            streamReader.DiscardBufferedData();

            if (bank == (int)Banks.Swedbank)
            {
                using var csvReader = new CsvReader(streamReader, CultureInfo.InvariantCulture);

                var records = csvReader.GetRecords<Record>().ToList();

                for (int i = records.Count - 1; i >= 0; --i)
                {
                    if ((records.ElementAt(i).Seller.Equals("") && records.ElementAt(i).Purpose.Equals("Likutis pradžiai")) ||
                        (records.ElementAt(i).Seller.Equals("") && records.ElementAt(i).Purpose.Equals("Apyvarta")))
                    {
                        records.RemoveAt(i);
                    }
                    else if (records.ElementAt(i).PaymentType.Equals("K"))
                    {
                        records.MoveToOtherList(IncomeList.Value, i);
                    }
                }
                deleteDuplicates(records);
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
                        records.MoveToOtherList(IncomeList.Value, i);
                    }
                    else
                    {
                        records.ElementAt(i).Amount *= -1;
                    }
                }
                deleteDuplicates(records);
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

                    if (records.ElementAt(i).PaymentType.Equals("C"))
                    {
                        records.MoveToOtherList(IncomeList.Value, i);
                    }
                }
                deleteDuplicates(records);
                return records;

            }
            else
            {
                return null;
            }
        }
    }

}