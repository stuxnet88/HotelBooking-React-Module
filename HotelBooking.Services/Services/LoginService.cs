using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace HotelBooking.Services
{
    public class LoginService : ILoginService
    {
        public bool ValidateUser(string username, string password)
        {
            string result = string.Empty;
            string validateUserURL = "https://userauthenticationfunction.azurewebsites.net/api/LoginFunction";
            var myObject = (dynamic)new JObject();
            myObject.userName = username;// "sheffy";
            myObject.password = password;// "Hosting@123";
            var content = new StringContent(myObject.ToString(), Encoding.UTF8, "application/json");

            using (HttpClient client = new HttpClient())
            using (HttpResponseMessage response = client.PostAsync(validateUserURL, content).Result)
            using (HttpContent respContent = response.Content)
            {
                // ... Read the response as a string.
                var tr = respContent.ReadAsStringAsync().Result;
                // ... deserialize the response, we know it has a 'result' field
                dynamic azureResponse = JsonConvert.SerializeObject(tr);
                // ... read the data we want
                result = azureResponse;
                return true;
            }
        }
    }

}