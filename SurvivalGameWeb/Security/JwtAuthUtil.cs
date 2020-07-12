using Jose;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace SurvivalGame.Security
{
    public class JwtAuthUtil
    {
        public string GenerateToken(string memID ,string Mail)
        {
            string secret = "bs2020SurvivalGameProjectOneJwtAuth";//加解密的key,如果不一樣會無法成功解密
            Dictionary<string ,Object> claim = new Dictionary<string ,Object>();//payload 需透過token傳遞的資料
            claim.Add("MemID", memID);
            claim.Add("Mail", Mail);
            claim.Add("Exp" ,DateTime.Now.AddMinutes(Convert.ToInt32("45")).ToString());//Token 時效設定
            var payload = claim;
            var token = Jose.JWT.Encode(payload ,Encoding.UTF8.GetBytes(secret) ,JwsAlgorithm.HS512);//產生token
            return token;
        }
    }
}