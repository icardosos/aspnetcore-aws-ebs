namespace webapi.Configuration
{
    public class AppConfig
    {
        public DatabaseConfig DatabaseConfig { get; set; }
        public ServerConfig ServerConfig { get; set; }
    }

    public class DatabaseConfig
    {
        public string ConnectionString { get; set; }
    }

    public class ServerConfig
    {
        public string Endpoint { get; set; }
    }
}
