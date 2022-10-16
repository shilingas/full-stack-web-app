using back_end_side.Models;
using System;
using System.Reflection;

namespace back_end_side.Controllers
{
    public struct SortingModel
    {
        public double FoodSum { get; set; }
        public double ClothesSum { get; set; }
        public double CarSum { get; set; }
        public double HouseSum { get; set; }
        public double EntertaintmentSum { get; set; }
        public double OtherSum { get; set; }
    }
    public class Sorting
    {
        public static readonly string[] Supermarkets = { "MAXIMA", "NORFA", "LIDL", "IKI", "RIMI", "AIBE", "KFC", "SUBWAY", "MEATBUSTERS", "HESBURGER", "JAMMI", "CAN CAN", "NO FORKS", "ILUNCH", "TAU", "CHAIKA", "Kavinė", "CAFFEINE" };
        public static readonly string[] ClothesShops = { "ZARA", "STRADIVARIUS", "H&M" };
        public static readonly string[] CarMaintenanceShops = { "CIRCLE K", "VIADA", "BOLT", "STOVA", "RIDE SHARE", "SUSISIEKIMO PASLAUGOS", "CITYBEE" };
        public static readonly string[] HouseMaintenanceShops = { "JYSK", "MOKI VEZI", "SENUKAI", "CONSILIUM OPTIMUM", "TELE2", "telia", "TOPO CENTRAS", "BITĖ", "GO3", "IKEA" };
        public static readonly string[] EntertainmentShops = { "CYBERX", "SPOTIFY", "BASKETNEWS", "OCULUS DIGITAL", "STEAM", "ŽALGIRIO KREPŠINIO CENTRAS" };
        public static SortingModel SortToCategories()
        {
            SortingModel Model = new()
            {
                CarSum = 0,
                EntertaintmentSum = 0,
                OtherSum = 0,
                HouseSum = 0,
                ClothesSum = 0,
                FoodSum = 0
            };
            if (UploadController.RecordsFromFile != null)
            {
                foreach (var record in UploadController.RecordsFromFile)
                {
                    if (record.Seller != null && Supermarkets.Any(record.Seller.ToUpper().Contains))
                    {
                        record.Category = "food";
                        Model.FoodSum += record.Amount;
                    }
                    else if (record.Seller != null && ClothesShops.Any(record.Seller.ToUpper().Contains))
                    {
                        record.Category = "clothes";
                        Model.ClothesSum += record.Amount;
                    }
                    else if (record.Seller != null && CarMaintenanceShops.Any(record.Seller.ToUpper().Contains))
                    {
                        record.Category = "car";
                        Model.CarSum += record.Amount;
                    }
                    else if (record.Seller != null && HouseMaintenanceShops.Any(record.Seller.ToUpper().Contains))
                    {
                        record.Category = "house";
                        Model.HouseSum += record.Amount;
                    }
                    else if (record.Seller != null && EntertainmentShops.Any(record.Seller.ToUpper().Contains))
                    {
                        record.Category = "entertainment";
                        Model.EntertaintmentSum += record.Amount;
                    }
                    else
                    {
                        record.Category = "other";
                        Model.OtherSum += record.Amount;
                    }
                }
            }
            
            return Model;

        }

        public static List<Record> SortedList()
        {
            SortToCategories();
            return UploadController.RecordsFromFile;
        }

        public static String CheckInput(InputModel model)
        {
            if (model.Seller != null && Supermarkets.Any(model.Seller.ToUpper().Contains))
                return "food";
            if (model.Seller != null && ClothesShops.Any(model.Seller.ToUpper().Contains))
                return "clothes";
            if (model.Seller != null && CarMaintenanceShops.Any(model.Seller.ToUpper().Contains))
                return "car";
            if (model.Seller != null && HouseMaintenanceShops.Any(model.Seller.ToUpper().Contains))
                return "house";
            if (model.Seller != null && EntertainmentShops.Any(model.Seller.ToUpper().Contains))
                return "entertainment";
            else return "other";
        }


    }
}
