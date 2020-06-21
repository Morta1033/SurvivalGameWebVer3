using SurvivalGameWeb.ViewModels.ProductDetails;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace SurvivalGameWeb.Controllers
{
    public class ProductController : Controller
    {
        // GET: Product
        public ActionResult ProductMenu()
        {
            return View();
        }
        public ActionResult ShoppingCart()
        {
            return View();
        }

        public ActionResult CheckOut()
        {
            return View();
        }

        public ActionResult ProductDetails(string ID)
        {
            HttpClient client = new HttpClient();
            string endpoint = "http://survivalgameweb.azurewebsites.net/api/Product/GetProductDetail/";
            string uri = endpoint + ID;
            var content = new StringContent("", System.Text.Encoding.UTF8, "application/json");
            var response = client.PostAsync(uri, content).Result;
            var JSON = response.Content.ReadAsStringAsync().Result;
            var result =JsonConvert.DeserializeObject<Rootobject>(JSON);
            return View(result);
        }
    }
}