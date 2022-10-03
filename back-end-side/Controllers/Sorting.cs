using back_end_side.Models;
using System;

namespace back_end_side.Controllers
{
    public class Sorting
    {
        static private String[] Supermarkets = { "MAXIMA", "NORFA", "lIDL", "IKI", "RIMI", "AIBE" };
        static private String[] ClothesShops = { "ZARA", "STRADIVARIUS", "H&M" };
        static private String[] CarMaintenanceShops = { "CIRCLE K", "VIADA" };
        static private String[] HouseMaintenanceShops = { "JYSK", "MOKI VEZI", "SENUKAI" };
        static private String[] EntertainmentShops = { "GG ARENA" };

        //public double foodSum, clothesSum, carSum, houseSum, entertainmentSum, otherSum;

        public static SortingModel Model = new SortingModel();

        static List<Record> recordsFromFile = ReportReader.ReadFromCsvFile();
        public static SortingModel SortToCategories()
        {
            Model.CarSum = 0;
            Model.EntertaintmentSum = 0;
            Model.OtherSum = 0;
            Model.HouseSum = 0;
            Model.ClothesSum = 0;
            Model.FoodSum = 0;

            foreach (var record in recordsFromFile)
            {
                if (checkType(record, Supermarkets))
                {
                    record.Category = "food";
                    Model.FoodSum += record.Amount;
                    //foodSum += record.Amount;
                }
                else if (checkType(record, ClothesShops))
                {
                    record.Category = "clothes";
                    Model.ClothesSum += record.Amount;
                    //clothesSum += record.Amount;
                }
                else if (checkType(record, CarMaintenanceShops))
                {
                    record.Category = "car";
                    Model.CarSum += record.Amount;
                    //carSum += record.Amount;
                }
                else if (checkType(record, HouseMaintenanceShops))
                {
                    record.Category = "house";
                    Model.HouseSum += record.Amount;
                    //houseSum += record.Amount;
                }
                else if (checkType(record, EntertainmentShops))
                {
                    record.Category = "entertainment";
                    Model.EntertaintmentSum += record.Amount;
                    //entertainmentSum += record.Amount;
                }
                else
                {
                    record.Category = "other";
                    Model.OtherSum += record.Amount;
                    //otherSum += record.Amount;
                }
            }

            return Model;

        }

        public static List<Record> SortedList()
        {
            SortToCategories();
            return recordsFromFile;
        }

        public static Boolean checkType(Record record, String[] shopNames)
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
