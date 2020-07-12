using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SurvivalGameWeb.Services
{
    public class CookieService
    {
        public void SetCookie(HttpContextBase HttpContext, HttpRequestBase Request ,string jwtToken, string name ,int expMin)
        {
            HttpCookie cookie = Request.Cookies[name];
            if(cookie == null)
            {
                cookie = new HttpCookie(name, jwtToken);
            }
            else
            {
                cookie.Value = jwtToken;
            }
            cookie.HttpOnly = true;
            cookie.Expires = DateTime.Now.AddMinutes(45); //設置Cookie到期時間
            HttpContext.Response.Cookies.Add(cookie);
        }
        public void LogOut(HttpContextBase HttpContext, HttpRequestBase Request)
        {
            HttpCookie cookie = Request.Cookies["authentication"];
            HttpCookie cookieLogout = Request.Cookies["expire-my-session-cookie"];
            if(cookie != null)
            {
                cookie.Expires = DateTime.Now.AddMinutes(-10); //設置Cookie到期時間
                HttpContext.Response.Cookies.Add(cookie);
            }
            if(cookieLogout != null)
            {
                cookieLogout.Expires = DateTime.Now.AddMinutes(-10); //設置Cookie到期時間
                HttpContext.Response.Cookies.Add(cookieLogout);
            }
            
        }
    }
}