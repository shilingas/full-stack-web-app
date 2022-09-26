using back_end_side.Models;

namespace back_end_side.Controllers
{
    public class Sorting
    {
        String[] Supermarkets = { "MAXIMA", "NORFA", "lIDL", "IKI", "RIMI", "AIBE" };
        String[] ClothesShops = { "ZARA", "STRADIVARIUS", "H&M" };
        String[] CarMaintenanceShops = { "CIRCLE K", "VIADA" };
        String[] HouseMaintenanceShops = { "JYSK", "MOKI VEZI", "SENUKAI" };
        String[] EntertainmentShops = { "GG ARENA" };

        public double foodSum, clothesSum, carSum, houseSum, entertainmentSum, otherSum;

        List<Record> recordsFromFile = ReportReader.ReadFromCsvFile();
        public void SortToCategories()
        {
            foreach (var record in recordsFromFile)
            {
                if (checkType(record, Supermarkets))
                {
                    record.Category = "food";
                    foodSum += record.Amount;
                }
                else if (checkType(record, ClothesShops))
                {
                    record.Category = "clothes";
                    clothesSum += record.Amount;
                }
                else if (checkType(record, CarMaintenanceShops))
                {
                    record.Category = "car";
                    carSum += record.Amount;
                }
                else if (checkType(record, HouseMaintenanceShops))
                {
                    record.Category = "house";
                    houseSum += record.Amount;
                }
                else if (checkType(record, EntertainmentShops))
                {
                    record.Category = "entertainment";
                    entertainmentSum += record.Amount;
                }
                else
                {
                    record.Category = "other";
                    otherSum += record.Amount;
                }

                Console.WriteLine(record.Date);
                Console.WriteLine(record.Seller);
                Console.WriteLine(record.Purpose);
                Console.WriteLine(record.Amount + " Eur");
                Console.WriteLine(record.Category);
                Console.WriteLine();
            }

        }

        private Boolean checkType(Record record, String[] shopNames)
        {
            foreach (String shopName in shopNames)
            {
                if (record.Seller != null && record.Seller.ToUpper().Contains(shopName))
                {
                    return true;
                }

            }

            return false;
        }


    }
}
