using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SurvivalGameWeb.ViewModels.CheckOut
{
    public class CheckOutViewModel
    {
        public string Name { get; set; }
        public string Adress { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string PaymentMethod { get; set; }
        public decimal? Total { get; set; }
    }
}