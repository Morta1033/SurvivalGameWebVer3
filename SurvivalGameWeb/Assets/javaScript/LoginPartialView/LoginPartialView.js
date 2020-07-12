let Log_In = document.querySelectorAll(".Log_In");
let ModalEmail = document.getElementById("ModalEmail");
let Modalrule_email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

let ModalPassword = document.getElementById("ModalPassword");
let Modalrule_password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,35}$/;

let ModalEmailInvalid = document.querySelector(".ModalEmailInvalid");
let ModalPasswordInvalid = document.querySelector(".ModalPasswordInvalid");

let ModalLoginButton = document.querySelector(".login100-form-btn");

Log_In.forEach(el => {
    el.addEventListener("click", function () {
        $("#LoginModal").modal('show');
    });
});

$().ready(function () {
    ModalEmail.addEventListener("keyup", function () {
        if (Modalrule_email.test(ModalEmail.value) === true && ModalEmail.value != "") {
            ModalEmailInvalid.setAttribute("style", "display: none;");

        } else {
            ModalEmailInvalid.setAttribute("style", "display: block;");
        }
    })

    ModalPassword.addEventListener("keyup", function () {
        if (Modalrule_password.test(ModalPassword.value) === true && ModalPassword.value != "") {
            ModalPasswordInvalid.setAttribute("style", "display: none;");
        } else {
            ModalPasswordInvalid.setAttribute("style", "display: block;");
        }
    })
});

ModalLoginButton.onclick = function (e) {
    e.preventDefault();

    if ((ModalEmailInvalid.getAttribute("style") != "display: none;") && (ModalPasswordInvalid.getAttribute("style") != "display: none;")) {
        alert("Data Not Full");
        return;
    }
    
    let ModalMemberItem = {
        Email: ModalEmail.value,
        Password: ModalPassword.value
    };
    console.log(JSON.stringify(ModalMemberItem));
    $.ajax({
        url: "/Member/GetLogin",
        method: "post",
        contentType: 'application/json',
        data: JSON.stringify(ModalMemberItem),
        success: function (data) {
            //server ¤w¸gset cookie¤F
            if (data.status) {
                member.$data.isLogin = true;
                member.$data.memMail = data.Name;

                $('#LoginModal').modal('hide');
                //location.reload();
            }
        }
    });
}