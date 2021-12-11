using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace HotelBooking.Services
{
    public static class Bootstraper
    {
        public static void InitializeServices(IServiceCollection services, IConfiguration Configuration)
        {

            services.AddScoped<ILoginService, LoginService>();
        }
    }
}
