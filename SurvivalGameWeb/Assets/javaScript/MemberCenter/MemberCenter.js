var member = document.querySelector(".ModfiyLayout")
member.addEventListener('click', checkchange)
let checkclick = document.querySelector("#ModifyLabel")
checkclick.addEventListener('click', checkchange)
let changeitem = document.querySelectorAll('.nav-link')

let editName = document.querySelector("#Name")
let editPassword = document.querySelector("#Password")
let editPhone = document.querySelector("#Phone")
let editPostCode = document.querySelector("#PostCode")
let editAddress = document.querySelector("#Address")
let editEmail = document.querySelector("#Email")

let NameErrorHint = document.querySelector(".NameErrorHint")
let PasswordErrorHint = document.querySelector(".PasswordErrorHint")
let PhoneErrorHint = document.querySelector(".PhoneErrorHint")
let PostCodeErrorHint = document.querySelector(".PostCodeErrorHint")
let AddressErrorHint = document.querySelector(".AddressErrorHint")
let EmailAddressErrorHint = document.querySelector(".EmailAddressErrorHint")

let ErrorHint = document.querySelectorAll(".ErrorHint")

let edit_rule_name = /^[a-zA-Z\u2E80-\u9FFF]*$/;
let edit_rule_password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,35}$/;
let edit_rule_postCode = /^\d{3,6}$/;
let edit_rule_address = /^[a-zA-Z\u2E80-\u9FFF][\w*\u2E80-\u9FFF]{10,50}$/;
let edit_rule_phone = /^09\d{8}$/;
let edit_rule_email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;


changeitem.forEach(element => {
    element.addEventListener('click', function () {
        let el = element.getAttribute('aria-controls')
        let tmp = document.querySelectorAll(".tab-pane")
        tmp.forEach(i => {
            if (i.getAttribute('id') != el) {
                i.classList.add('d-none')
            } else {
                i.classList.remove('d-none')
            }
        })
    })
});

function checkchange() {
    let check = document.getElementById("ModfiyMeber")
    let emC = document.querySelector(".ModfiyLayout em")
    let icon = document.querySelector(".ModfiyLayout i")
    let save = document.querySelector("#ModifySave")
    let read = document.querySelectorAll(".FromList")
    let form = document.querySelector(".billing-form")
    let WriteForm = document.querySelectorAll(".FromOff")
    let ReadForm = document.querySelectorAll(".FromRead")
    if (!check.checked) {
        check.checked = true
        member.classList.add("ModfiyLayoutOn")
        emC.classList.add("ModfiyLayoutEmOn")
        icon.classList.add("ModfiyLayoutIOn")
        emC.innerText = "ON";
        save.style.display = "inline-block"
        read.forEach(el => {
            el.removeAttribute("disabled")
        });
        form.classList.add("was-validated")
        WriteForm.forEach(element => {
            element.style.display = "block"
        });
        ReadForm.forEach(element => {
            element.style.display = "none"
        });

        //ErrorHint.setAttribute("style", "display: block;");
        ErrorHint.forEach(el => {
            el.setAttribute("style", "display: block;");
        });

        editName.addEventListener("keyup", function () {
            if (edit_rule_name.test(editName.value) === true) {
                NameErrorHint.setAttribute("style", "display: none;");
            } else {
                NameErrorHint.setAttribute("style", "display: block;");
            }
        });

        editPassword.addEventListener("keyup", function () {
            if (edit_rule_password.test(editPassword.value) === true) {
                PasswordErrorHint.setAttribute("style", "display: none;");
            } else {
                PasswordErrorHint.setAttribute("style", "display: block;");
            }
        });

        editPostCode.addEventListener("keyup", function () {
            if (edit_rule_postCode.test(editPostCode.value) === true) {
                PostCodeErrorHint.setAttribute("style", "display: none;");
            } else {
                PostCodeErrorHint.setAttribute("style", "display: block;");
            }
        });
        editAddress.addEventListener("keyup", function () {
            if (edit_rule_address.test(editAddress.value) === true) {
                AddressErrorHint.setAttribute("style", "display: none;");
            } else {
                AddressErrorHint.setAttribute("style", "display: block;");
            }
        });
        editPhone.addEventListener("keyup", function () {
            if (edit_rule_phone.test(editPhone.value) === true) {
                PhoneErrorHint.setAttribute("style", "display: none;");
            } else {
                PhoneErrorHint.setAttribute("style", "display: block;");
            }
        });
        editEmail.addEventListener("keyup", function () {
            if (edit_rule_email.test(editEmail.value) === true) {
                EmailAddressErrorHint.setAttribute("style", "display: none;");
            } else {
                EmailAddressErrorHint.setAttribute("style", "display: block;");
            }
        });

        save.onclick = function (e) {

            e.preventDefault();

            let MemberEdit = {
                Name: editName.value,
                Password: editPassword.value,
                postcode: editPostCode.value,
                address: editAddress.value,
                phone: editPhone.value,
                email: editEmail.value
            };
            console.log(JSON.stringify(MemberEdit));
            $.ajax({
                url: "",
                method: "POST",
                contentType: 'application/json',
                data: JSON.stringify(MemberEdit),
                success: function () {
                    //window.location.href = '/Home/Index';
                }
            });
        };


    } else {
        check.checked = false
        member.classList.remove("ModfiyLayoutOn")
        emC.classList.remove("ModfiyLayoutEmOn")
        icon.classList.remove("ModfiyLayoutIOn")
        emC.innerText = "OFF";
        save.style.display = "none"
        read.forEach(el => {
            el.setAttribute("disabled", "disabled")
        });
        form.classList.remove("was-validated")
        WriteForm.forEach(element => {
            element.style.display = "none"
        });
        ReadForm.forEach(element => {
            element.style.display = "block"
        });

        ErrorHint.forEach(el => {
            el.setAttribute("style", "display: none;");
        });
    }
}

window.onload = function () {
    let check = document.getElementById("ModfiyMeber")
    check.checked = true
    checkchange()
}

let change_navLink = document.querySelectorAll(".NavMember .nav-link")


change_navLink.forEach(e => {
    e.addEventListener('click', function () {
        let check = document.getElementById("ModfiyMeber")
        if (check.checked) {
            checkchange()
            return
        }
    })
});