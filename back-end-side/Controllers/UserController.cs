using back_end_side.Models;
using back_end_side.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace back_end_side.Controllers
{
    public class SentEmailArgs : EventArgs
    {
        public User? userEmail { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        
            public User user = new Models.User();
            public delegate void SendTextHandler<U>(object source, U args);
            public event SendTextHandler<SentEmailArgs> SendEmail;
            [HttpPost]
            [Produces("application/json")]
            [EnableCors("corsapp")]
            public IActionResult Post([FromBody] User user)
            {
                this.user = user;
                MailService mailService = new MailService();

                this.SendEmail += mailService.OnSentEmail;
                OnSentEmail();
                return Ok(user);
            }
            protected virtual void OnSentEmail()
            {

                if (SendEmail != null)
                {
                    SendEmail(this, new SentEmailArgs() { userEmail = user });
                }
            }
        }
    
}
