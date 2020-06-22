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

            var Result = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(resultJSON);
            if(Result == false)
            {
                
            }
            //return Result;

            return RedirectToAction("Index", "Home");

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


            //var repository = new SGRepository<Members>(new SGModel());
            //var result = repository.GetAll().Where(x => x.Name == loginVM.Account && x.Password == loginVM.Password).FirstOrDefault();
            //if (result == null)
            //{
            //    return Json(new
            //    {
            //        status = false ,
            //        token = "Email Or Password Error"
            //    });
            //}

            //JwtAuthUtil jwtAuthUtil = new JwtAuthUtil();
            //string jwtToken = jwtAuthUtil.GenerateToken(loginVM.Email);
            //return Json(new
            //{
            //    status = true,
            //    token = jwtToken
            //});

            return RedirectToAction("Index", "Home");
        }
    }
}