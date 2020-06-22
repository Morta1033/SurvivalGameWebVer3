let LoginEmail = document.getElementById("LoginEmail");
let rule_LoginEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

let Password = document.getElementById("LoginPassword");
let rule_password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,35}$/;

let LoginEmailInvalid = document.querySelector(".LoginEmailInvalid");
let PasswordInvalid = document.querySelector(".PasswordInvalid");

let LoginButton = document.querySelector(".LoginBtn");


LoginEmail.addEventListener("keyup", function () {
    if (rule_LoginEmail.test(LoginEmail.value) === true && LoginEmail.value != "") {
        LoginEmailInvalid.setAttribute("style", "display: none;");
    } else {
        LoginEmailInvalid.setAttribute("style", "display: block;");
    }
})

Password.addEventListener("keyup", function () {
    if (rule_password.test(Password.value) === true && Password.value != "") {
        PasswordInvalid.setAttribute("style", "display: none;");
    } else {
        PasswordInvalid.setAttribute("style", "display: block;");
    }
})


LoginButton.onclick = function (e) {
    e.preventDefault();

    if ((LoginEmailInvalid.getAttribute("style") != "display: none;") && (PasswordInvalid.getAttribute("style") != "display: none;")) {
        alert("Data Not Full");
        return;
    }

    let MemberItem = {
        LoginEmail: LoginEmail.value,
        Password: Password.value
    };
    console.log(JSON.stringify(MemberItem));
    $.ajax({
        url: "/Member/GetLogin",
        method: "post",
        contentType: 'application/json',
        data: JSON.stringify(MemberItem),
        success: function () {
        }
    });
}