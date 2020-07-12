using SurvivalGameWeb.ViewModels.MemberLogin;
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

        public ActionResult MemberLogin()
        {
            return View();
        }

        [JwtAuthActionFilter]
        public ActionResult MemberCenter()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetRegistered([Bind(Include = "Name, Password, CheckPassword, Birth, Postcode, Address, Phone, Email")] MemberRegisteredViewModel registeredVM)
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

            var reqJson = JsonConvert.SerializeObject(registeredVM);
            var content = new StringContent(reqJson, System.Text.Encoding.UTF8, "application/json");
            var response = client.PostAsync(endpointurl, content).Result;
            var resultJSON = response.Content.ReadAsStringAsync().Result;

            return Json(JsonConvert.DeserializeObject<APIResult>(resultJSON));

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

            //設定cookie 未完成

            if(result.IsSuccess)
            {
                JwtAuthUtil jwtAuthUtil = new JwtAuthUtil();
                string jwtToken = jwtAuthUtil.GenerateToken((string)result.Data , loginVM.Email);
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
            if (Request.Headers["Authorization"] == null)
            {
                return Json(new
                {
                    Status = false
                },JsonRequestBehavior.AllowGet);
            }
            string secret = "bs2020SurvivalGameProjectOneJwtAuth";//加解密的key,如果不一樣會無法成功解密
                                                                  //解密後會回傳Json格式的物件(即加密前的資料)
            var jwtObject = Jose.JWT.Decode<Dictionary<string, Object>>(
            Request.Headers["Authorization"], Encoding.UTF8.GetBytes(secret), JwsAlgorithm.HS512);

            if (JwtAuthActionFilter.IsTokenExpired(jwtObject["Exp"].ToString()))
            {
                return Json(new
                {
                    Status = false
                });
            }

            return Json(new
            {
                Status = true,
                //ID = jwtObject["MemID"].ToString(),
                Name = jwtObject["Mail"].ToString(),
                //Token = JwtAuthActionFilter.ReGenerateToken(jwtObject["Exp"].ToString(), jwtObject["MemID"].ToString() , jwtObject["Mail"].ToString())
            }, JsonRequestBehavior.AllowGet);
        }
    }
}