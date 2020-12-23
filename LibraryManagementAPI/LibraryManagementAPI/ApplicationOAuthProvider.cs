using LibraryManagementAPI.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace LibraryManagementAPI
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);

            string name = "admin@gmail.com";
            var pass = "ad<123";
            var admin = await manager.FindByNameAsync(name);
            if(admin == null)
            {
                var us = new ApplicationUser() { UserName = name, Email = name };
                IdentityResult result = manager.Create(us, pass);
                manager.AddToRoles(us.Id, "Admin");
            }

            var user = await manager.FindAsync(context.UserName, context.Password);
            if(user != null)
            {
                if (manager.IsInRole(user.Id, "Admin"))
                {
                    var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                    identity.AddClaim(new Claim("Username", user.UserName));
                    identity.AddClaim(new Claim("Email", user.Email));
                    identity.AddClaim(new Claim("LoggedOn", DateTime.Now.ToString()));

                    context.Validated(identity);
                }
                return;
            }
            else
            {
                return;
            }
        }
    }
}