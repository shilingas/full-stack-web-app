﻿using back_end_side.Models;
using System;

namespace back_end_side.Controllers
{
    public class Sorting
    {

        public static List<Record> RecordsFromFile = ReportReader.ReadFromCsvFile();

        public static SortingModel SortToCategories()
        {
            string[] Supermarkets = { "MAXIMA", "NORFA", "lIDL", "IKI", "RIMI", "AIBE" };
            string[] ClothesShops = { "ZARA", "STRADIVARIUS", "H&M" };
            string[] CarMaintenanceShops = { "CIRCLE K", "VIADA" };
            string[] HouseMaintenanceShops = { "JYSK", "MOKI VEZI", "SENUKAI" };
            string[] EntertainmentShops = { "GG ARENA" };

            SortingModel Model = new()
            {
                CarSum = 0,
                EntertaintmentSum = 0,
                OtherSum = 0,
                HouseSum = 0,
                ClothesSum = 0,
                FoodSum = 0
            };

            foreach (var record in RecordsFromFile)
            {
                if (CheckType(record, Supermarkets))
                {
                    record.Category = "food";
                    Model.FoodSum += record.Amount;
                }
                else if (CheckType(record, ClothesShops))
                {
                    record.Category = "clothes";
                    Model.ClothesSum += record.Amount;
                }
                else if (CheckType(record, CarMaintenanceShops))
                {
                    record.Category = "car";
                    Model.CarSum += record.Amount;
                }
                else if (CheckType(record, HouseMaintenanceShops))
                {
                    record.Category = "house";
                    Model.HouseSum += record.Amount;
                }
                else if (CheckType(record, EntertainmentShops))
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

            return Model;

        }

        public static List<Record> SortedList()
        {
            SortToCategories();
            return RecordsFromFile;
        }

        public static Boolean CheckType(Record record, String[] shopNames)
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
