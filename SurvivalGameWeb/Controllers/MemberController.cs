using SurvivalGameWeb.ViewModels.MemberLogin;
using SurvivalGameWeb.ViewModels.MemberRegister;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SurvivalGameWeb.Controllers
{
    public class MemberController : Controller
    {
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
            if (ModelState.IsValid)
            {
                //db.Accounts.Add(registeredVM);
                //db.SaveChanges();
                return RedirectToAction("Index", "Home");
            }
            return View(registeredVM);
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
            return View();
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
        }
    }
}