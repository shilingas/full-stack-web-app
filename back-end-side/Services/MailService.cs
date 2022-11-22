using back_end_side.Controllers;
using System.Net.Mail;
using System.Net;

namespace back_end_side.Services
{
    public class MailService
    {
        public void OnSentEmail(object source, SentEmailArgs args)
        {
            var from = "expensetrackerappgmvp@gmail.com";
            string password = "mibfjdtzjudrwjwi";
            MailMessage message = new MailMessage();
            message.From = new MailAddress(from);
            message.Subject = "Welcome";
            Console.WriteLine("a");
            message.To.Add(new MailAddress(args.userEmail.Email));
            message.Body = "<html><body> Thank you for coming back to our website! :) </body></html>";
            message.IsBodyHtml = true;

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(from, password),
                EnableSsl = true
            };
            smtpClient.Send(message);
            Console.WriteLine("Email sent");
        }
    }
}
