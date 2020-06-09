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
    }
}