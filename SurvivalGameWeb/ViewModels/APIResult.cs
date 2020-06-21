using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SurvivalGameWeb.ViewModels
{
    public class APIResult
    {
        public bool IsSuccess { get; set; }
        public string ExceptionString { get; set; }
        public object Data { get; set; }
    }
}