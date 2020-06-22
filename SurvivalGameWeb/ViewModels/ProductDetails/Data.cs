using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SurvivalGameWeb.ViewModels.ProductDetails
{

    public class Rootobject
    {
        public bool IsSuccess { get; set; }
        public object ExceptionString { get; set; }
        public Data Data { get; set; }
    }

    public class Data
    {
        public string ID { get; set; }
        public string Name { get; set; }
        public string ClassName { get; set; }
        public string CatagoryName { get; set; }
        public string ManufacturerName { get; set; }
        public float Price { get; set; }
        public int InvetoryQuantity { get; set; }
        public Colors[] Color { get; set; }
        public string Depiction { get; set; }
        public string[] ImgList { get; set; }
        public Pattributelist[] PAttributeList { get; set; }
        public Relatedproductlist[] RelatedProductList { get; set; }
    }

    public class Colors
    {
        public string color { get; set; }
        public string cc { get; set; }
    }

    public class Pattributelist
    {
        public string Name { get; set; }
        public string value { get; set; }
    }

    public class Relatedproductlist
    {
        public string PID { get; set; }
    }

}