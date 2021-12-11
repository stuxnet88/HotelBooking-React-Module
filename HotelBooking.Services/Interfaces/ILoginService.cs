using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBooking.Services
{
   public interface  ILoginService 
    {
        bool ValidateUser(string UserName, string Password);
    }
}
