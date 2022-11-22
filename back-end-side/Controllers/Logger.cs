﻿using System;
using System.Configuration;
namespace back_end_side.Controllers
{
    public static class Logger
    {
        public static void WriteLog(string message)
        {
            // cia pakeisiu patha kad i direktorija projekto ikeltu tiesiog
            string logPath = "../back-end-side/Logs.txt";
            using (StreamWriter streamWriter = new StreamWriter(logPath, true))
            {
                streamWriter.WriteLine($"{DateTime.Now} : {message}");
            }
        }
    }
}