using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotelBooking.Services;
using Microsoft.AspNetCore.Mvc;


namespace ReactReduxApp.Controllers
{

    public class SampleDataController : Controller
    {
        private readonly ILoginService _loginService;

        public SampleDataController(ILoginService loginService)
        {
            this._loginService = loginService;
        }

        [HttpPost]
        [Route("api/login")]
        public IActionResult UserLogin([FromBody] LoginModel UserLogin)
        {
            return Ok(_loginService.ValidateUser(UserLogin.UserName , UserLogin.Password));
        }

    }
    public class LoginModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }


}
