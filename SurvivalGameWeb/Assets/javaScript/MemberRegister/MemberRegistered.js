let inputName = document.getElementById("Name");
let rule_name = /^[a-zA-Z\u2E80-\u9FFF]{2,25}$/;

let inputPassword = document.getElementById("Password");
let rule_password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,35}$/;

let inputCheckPassword = document.getElementById("CheckPassword");

let inputBirth = document.getElementById("Birth");

let inputPostCode = document.getElementById("PostCode");
let rule_postCode = /^\d{3,6}$/;

let inputAddress = document.getElementById("Address");
let rule_address = /^[a-zA-Z\u2E80-\u9FFF][\w*\u2E80-\u9FFF]{10,50}$/;

let inputPhone = document.getElementById("Phone");
let rule_phone = /^09\d{8}$/;

let inputEmail = document.getElementById("Email");
let rule_email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

let InputCode = document.getElementById("InputCode");

let NameInvalid = document.querySelector(".NameInvalid");
let PasswordInvalid = document.querySelector(".PasswordInvalid");
let CheckPasswordInvalid = document.querySelector(".CheckPasswordInvalid");
let BirthdayInvalid = document.querySelector(".BirthdayInvalid");
let PostCodeInvalid = document.querySelector(".PostCodeInvalid");
let AddressInvalid = document.querySelector(".AddressInvalid");
let PhoneInvalid = document.querySelector(".PhoneInvalid");
let EmailInvalid = document.querySelector(".EmailInvalid");

let InvalidFeedback = document.querySelector(".billing-form").querySelectorAll(".invalid-feedback");
let RegisterBtn = document.getElementById("RegisterBtn");

RegisterBtn.addEventListener("click", function (e) {
    for (let i = 0; i < InvalidFeedback.length; i++) {
        if (InvalidFeedback[i].getAttribute("style") != "display: none;") {
            alert("Data Not Full");
            return;
        }
    }

    if (!$("#Look").prop('checked')) {
        alert("Please check the membership terms.");
        return;
    }

    let MemberItem = {
        Name: inputName.value,
        Password: inputPassword.value,
        CheckPassword: inputCheckPassword.value,
        Birth: inputBirth["value"],
        postcode: inputPostCode.value,
        address: inputAddress.value,
        phone: inputPhone.value,
        email: inputEmail.value,
        InputCode: InputCode.value
    };
    //console.log(JSON.stringify(MemberItem));

    $.ajax({
        url: "/Member/GetRegistered",
        method: "POST",
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify(MemberItem),
        success: function (r) {
            if (!r.isSuccess) {
                alert(r.exception);
            }
            else {
                window.location.href = r.redirect;
            }
        }
    });
    e.preventDefault();
})

inputName.addEventListener("keyup", function () {
    if (rule_name.test(inputName.value) === true && inputName.value != "") {
        NameInvalid.setAttribute("style", "display: none;");
    } else {
        NameInvalid.setAttribute("style", "display: block;");
    }
})

inputPassword.addEventListener("keyup", function () {
    if (rule_password.test(inputPassword.value) === true && inputPassword.value != "") {
        PasswordInvalid.setAttribute("style", "display: none;");
    } else {
        PasswordInvalid.setAttribute("style", "display: block;");
    }
})

inputCheckPassword.addEventListener("keyup", function () {
    if (inputCheckPassword.value === inputPassword.value && inputCheckPassword.value != "") {
        CheckPasswordInvalid.setAttribute("style", "display: none;");
    } else {
        CheckPasswordInvalid.setAttribute("style", "display: block;");
    }
})

inputBirth.addEventListener("change", function () {
    if (inputBirth["value"] != "") {
        BirthdayInvalid.setAttribute("style", "display: none;");
    } else {
        BirthdayInvalid.setAttribute("style", "display: block;");
    }
})

inputPostCode.addEventListener("keyup", function () {
    if (rule_postCode.test(inputPostCode.value) === true && inputPostCode.value.length >= 3 && inputPostCode.value.length != "") {
        PostCodeInvalid.setAttribute("style", "display: none;");
    } else {
        PostCodeInvalid.setAttribute("style", "display: block;");
    }
})

inputAddress.addEventListener("keyup", function () {
    if (rule_address.test(inputAddress.value) === true && inputAddress.value.length != "") {
        AddressInvalid.setAttribute("style", "display: none;");
    } else {
        AddressInvalid.setAttribute("style", "display: block;");
    }
})

inputPhone.addEventListener("keyup", function () {
    if (rule_phone.test(inputPhone.value) === true && inputPhone.value.length == 10 && inputPhone.value.length != "") {
        PhoneInvalid.setAttribute("style", "display: none;");
    } else {
        PhoneInvalid.setAttribute("style", "display: block;");
    }
})

inputEmail.addEventListener("keyup", function () {
    if (rule_email.test(inputEmail.value) === true && inputEmail.value != "") {
        EmailInvalid.setAttribute("style", "display: none;");
    } else {
        EmailInvalid.setAttribute("style", "display: block;");
    }
})