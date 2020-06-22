using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SurvivalGameWeb.ViewModels.MemberLogin
{
    public class MemberLogin
    {
        [Required(ErrorMessage = "Please enter the complete email")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [RegularExpression(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,35}$")]
        [DataType(DataType.Password)]
        [StringLength(35, MinimumLength = 8, ErrorMessage = "Password length is between 8-35 uppercase and lowercase English digits")]
        public string Password { get; set; }
    }
}