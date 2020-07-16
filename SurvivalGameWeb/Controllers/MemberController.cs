﻿using SurvivalGameWeb.ViewModels.MemberLogin;
using SurvivalGameWeb.ViewModels.MemberRegister;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Http;
using System.Web.Security;
using SurvivalGameWeb.Services;
using Newtonsoft.Json;
using SurvivalGameWeb.ViewModels;
using SurvivalGame.Security;
using SurvivalGame.Filter;
using System.Text;
using Jose;
using System.Drawing;
using System.IO;

namespace SurvivalGameWeb.Controllers
{
    public class MemberController : Controller
    {
        static string endpoint = "http://survivalgameweb.azurewebsites.net/api";
        // GET: Member
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult MemberRegister()
        {
            return View();
        }

<<<<<<< HEAD
        //[JwtAuthActionFilter]
=======
        public ActionResult MemberLogin()
        {
            return View();
        }

        [JwtAuthActionFilter]
>>>>>>> 23d4502c9e3b2a1738da63a1ad5fa6045e549d4f
        public ActionResult MemberCenter()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetRegistered([Bind(Include = "Name, Password, CheckPassword, Birth, Postcode, Address, Phone, Email, InputCode")] MemberRegisteredViewModel registeredVM)
        {
            if (!ModelState.IsValid)
            {
                return RedirectToAction("Index", "Home");
            }

            //call http get
            var client = new HttpClient();
            var endpointurl = endpoint + "/Member/CheckRedister";

            registeredVM.Name = HttpUtility.HtmlEncode(registeredVM.Name);
            registeredVM.Email = HttpUtility.HtmlEncode(registeredVM.Email);
            registeredVM.Password = HttpUtility.HtmlEncode(registeredVM.Password).MD5Hash();
            registeredVM.Birth = DateTime.Parse(HttpUtility.HtmlEncode(registeredVM.Birth));
            registeredVM.PostCode = HttpUtility.HtmlEncode(registeredVM.PostCode);
            registeredVM.Address = HttpUtility.HtmlEncode(registeredVM.Address);
            registeredVM.Phone = HttpUtility.HtmlEncode(registeredVM.Phone);
            registeredVM.InputCode = HttpUtility.HtmlEncode(registeredVM.InputCode);

            var reqJson = JsonConvert.SerializeObject(registeredVM);
            var content = new StringContent(reqJson, System.Text.Encoding.UTF8, "application/json");
            var response = client.PostAsync(endpointurl, content).Result;
            var resultJSON = response.Content.ReadAsStringAsync().Result;

            string code = registeredVM.InputCode;
            TempData.Keep();
            if (code == TempData["code"].ToString())
            {
                var result = JsonConvert.DeserializeObject<APIResult>(resultJSON);
                if (!result.IsSuccess)
                {
                    return Json(new
                    {
                        isSuccess = false,
                        exception = result.ExceptionString
                    });
                }

                return Json( new { 
                    isSuccess = true,
                    exception = "/Home/Index"
                });
            }
            else
            {
                return Json(new { 
                    isSuccess = false,
                    exception = "Verification code error!!!"

                });
            }
        }

        private string RandomCode(int length)
        {
            string s = "0123456789zxcvbnmasdfghjklqwertyuiop";
            StringBuilder sb = new StringBuilder();
            Random rand = new Random();
            int index;
            for (int i = 0; i < length; i++)
            {
                index = rand.Next(0, s.Length);
                sb.Append(s[index]);
            }
            return sb.ToString();
        }
        private void PaintInterLine(Graphics g, int num, int width, int height)
        {
            Random r = new Random();
            int startX, startY, endX, endY;
            for (int i = 0; i < num; i++)
            {
                startX = r.Next(0, width);
                startY = r.Next(0, height);
                endX = r.Next(0, width);
                endY = r.Next(0, height);
                g.DrawLine(new Pen(Brushes.Red), startX, startY, endX, endY);
            }
        }
        public ActionResult GetValidateCode()
        {
            byte[] data = null;
            string randomCode = RandomCode(5);
            TempData["code"] = randomCode;
            //定義一個畫板
            MemoryStream ms = new MemoryStream();
            using (Bitmap map = new Bitmap(100, 40))
            {
                //畫筆，在指定畫板上畫圖
                //g.Dispose();
                using (Graphics g = Graphics.FromImage(map))
                {
                    g.Clear(Color.White);
                    g.DrawString(randomCode, new Font("黑體", 18.0F), Brushes.Blue, new Point(10, 8));
                    //繪製干擾線(數字代表幾條)
                    PaintInterLine(g, 10, map.Width, map.Height);
                }
                map.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
            }
            data = ms.GetBuffer();
            return File(data, "image/jpeg");
        }

        [HttpPost]
        public ActionResult GetLogin([Bind(Include = "Email, Password")] MemberLoginViewModel loginVM)
        {
            if (!ModelState.IsValid)
            {
                return Json(new
                {
                    status = false,
                    token = "Email Or Password is not Valid"
                });
            }

            //call http get
            var client = new HttpClient();
            var endpointurl = endpoint + "/Member/CheckLogin";

            loginVM.Email = HttpUtility.HtmlEncode(loginVM.Email);
            loginVM.Password = HttpUtility.HtmlEncode(loginVM.Password).MD5Hash();

            var reqJson = JsonConvert.SerializeObject(loginVM);
            var content = new StringContent(reqJson, System.Text.Encoding.UTF8, "application/json");
            var response = client.PostAsync(endpointurl, content).Result;

            var resultJSON = response.Content.ReadAsStringAsync().Result;
            var result = JsonConvert.DeserializeObject<APIResult>(resultJSON);

            if (result.IsSuccess)
            {
                //result.Data 為 memID
                string jwtToken = new JwtAuthUtil().GenerateToken((string)result.Data, loginVM.Email);

                //設定cookie
                var cookieService = new CookieService();
                cookieService.SetCookie(HttpContext ,Request ,jwtToken , "authentication", 45);
                //

                return Json(new
                {
                    status = true,
                    //ID = (string)result.Data,
                    Name = loginVM.Email
                    //token = jwtToken
                });
            }
            else
            {
                return Json(new
                {
                    status = false,
                    ExceptionString = result.ExceptionString
                });
            }
        }

        [HttpGet]
        public ActionResult CheckLoginStatus()
        {
            HttpCookie cookie = Request.Cookies.Get("authentication");
            HttpCookie cookieLogOut = Request.Cookies.Get("expire-my-session-cookie");
            string auth = cookie?.Value;
            if (auth == null || cookieLogOut != null)
            {
                new CookieService().LogOut(HttpContext ,Request);
                return Json(new
                {
                    Status = false
                }, JsonRequestBehavior.AllowGet);
            }
            string secret = "bs2020SurvivalGameProjectOneJwtAuth";//加解密的key,如果不一樣會無法成功解密
                                                                  //解密後會回傳Json格式的物件(即加密前的資料)
            var jwtObject = Jose.JWT.Decode<Dictionary<string, Object>>(auth, Encoding.UTF8.GetBytes(secret), JwsAlgorithm.HS512);

            if (JwtAuthActionFilter.IsTokenExpired(jwtObject["Exp"].ToString()))
            {
                return Json(new
                {
                    Status = false
                }, JsonRequestBehavior.AllowGet);
            }

            //時間較短時，重新發認證
            string jwtToken = JwtAuthActionFilter.ReGenerateToken(jwtObject["Exp"].ToString(), jwtObject["MemID"].ToString(), jwtObject["Mail"].ToString());
            if(jwtToken != null)
            {
                var cookieService = new CookieService();
                cookieService.SetCookie(HttpContext, Request, jwtToken, "authentication", 45);
            }
            //

            return Json(new
            {
                Status = true,
                Name = jwtObject["Mail"].ToString(),
            }, JsonRequestBehavior.AllowGet);


            //if (Request.Headers["Authorization"] == null)
            //{
            //    return Json(new
            //    {
            //        Status = false
            //    },JsonRequestBehavior.AllowGet);
            //}
            //string secret = "bs2020SurvivalGameProjectOneJwtAuth";//加解密的key,如果不一樣會無法成功解密
            //                                                      //解密後會回傳Json格式的物件(即加密前的資料)
            //var jwtObject = Jose.JWT.Decode<Dictionary<string, Object>>(
            //Request.Headers["Authorization"], Encoding.UTF8.GetBytes(secret), JwsAlgorithm.HS512);

            //if (JwtAuthActionFilter.IsTokenExpired(jwtObject["Exp"].ToString()))
            //{
            //    return Json(new
            //    {
            //        Status = false
            //    });
            //}

            //return Json(new
            //{
            //    Status = true,
            //    //ID = jwtObject["MemID"].ToString(),
            //    Name = jwtObject["Mail"].ToString(),
            //    //Token = JwtAuthActionFilter.ReGenerateToken(jwtObject["Exp"].ToString(), jwtObject["MemID"].ToString() , jwtObject["Mail"].ToString())
            //}, JsonRequestBehavior.AllowGet);
        }
    }
}