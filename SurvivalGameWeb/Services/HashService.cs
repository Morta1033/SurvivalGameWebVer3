using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace SurvivalGameWeb.Services
{
    public static class HashService
    {
        public static string MD5Hash(this string rawString)
        {
            if (string.IsNullOrEmpty(rawString))
            {
                return "";
            }
            StringBuilder sb;
            using (MD5 md5 = MD5.Create())
            {
                //字串轉byte
                byte[] byteArray = Encoding.UTF8.GetBytes(rawString);
                //進行md5雜湊加密
                byte[] encryption = md5.ComputeHash(byteArray);
                sb = new StringBuilder();
                for (int i = 0; i < encryption.Length; i++)
                {
                    sb.Append(encryption[i].ToString("x2"));
                }
            }
            return sb.ToString();
        }
    }
}