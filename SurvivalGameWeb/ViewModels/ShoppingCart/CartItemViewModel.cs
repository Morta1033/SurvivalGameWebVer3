using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SurvivalGameWeb.ViewModels.ShoppingCart
{
    public class CartItemViewModel
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Img { get; set; }
        public decimal? Price { get; set; }
        public int Count { get; set; }
        public decimal? Total => Price * Count; 
    }
}