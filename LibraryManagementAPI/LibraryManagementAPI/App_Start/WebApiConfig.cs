using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace LibraryManagementAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            //config.SuppressHostPrincipal();
            // config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            
            // Web API routes
            config.MapHttpAttributeRoutes();
            var xml = GlobalConfiguration.Configuration.Formatters.XmlFormatter;
            xml.UseXmlSerializer = true;
            // config.Formatters.XmlFormatter.UseXmlSerializer = true;


            // GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.PreserveReferencesHandling =
            // Newtonsoft.Json.PreserveReferencesHandling.Arrays;

            // config.Formatters.JsonFormatter.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.None;
            // config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Serialize;

            // json.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.Objects;


            var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            json.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            json.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            //var appXmlType = config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
            //config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType);

            // config.Formatters.Remove(config.Formatters.JsonFormatter);
            // config.Formatters.JsonFormatter.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;

            //EnableCorsAttribute cors = new EnableCorsAttribute("*","*","*");
            //config.EnableCors(cors);

            config.Filters.Add(new AuthorizeAttribute());
        }
    }
}
