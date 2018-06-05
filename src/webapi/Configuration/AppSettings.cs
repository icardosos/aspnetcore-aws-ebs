using Microsoft.Extensions.Configuration;
using System;

namespace webapi.Configuration
{
    public interface IAppSettings
    {
        string GetSection(string name);
        T Bind<T>(string section) where T : class;
        T Bind<T>() where T : class;
    }

    public class AppSettings : IAppSettings
    {
        private IConfiguration _configuration;

        public AppSettings(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        public string GetSection(string name)
        {
            return this._configuration.GetSection(name).Value;
        }

        public T Bind<T>(string section) where T : class
        {
            var obj = Activator.CreateInstance<T>();
            this._configuration.GetSection(section).Bind(obj);
            return obj;
        }

        public T Bind<T>() where T : class
        {
            return this._configuration.Get<T>();                        
        }
    }
}
