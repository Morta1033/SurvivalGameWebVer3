let Log_In = document.querySelector(".Log_In");

let ModalAccount = document.getElementById("ModalAccount");
let Modalrule_account = /^[a-zA-Z_]\w*$/;

let ModalPassword = document.getElementById("ModalPassword");
let Modalrule_password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,35}$/;

let ModalAccountInvalid = document.querySelector(".ModalAccountInvalid");
let ModalPasswordInvalid = document.querySelector(".ModalPasswordInvalid");

let ModalLoginButton = document.querySelector(".login100-form-btn");

// let localAc = localStorage.getItem('ModalAccount');
// let localPa = localStorage.getItem('ModalPassword');


Log_In.addEventListener("click", function () {
    
    // if(localAc){
    //     $('#ModalAccount').val(localAc);
        
    //     ModalAccountInvalid.setAttribute("style", "display: none;");
    // }if(localPa){
    //     $('#ModalPassword').val(localPa);

    //     ModalPasswordInvalid.setAttribute("style", "display: none;");
    // }

    ModalAccount.addEventListener("keyup", function () {
        if (Modalrule_account.test(ModalAccount.value) === true && ModalAccount.value != "") {
            ModalAccountInvalid.setAttribute("style", "display: none;");
            
        } else {
            ModalAccountInvalid.setAttribute("style", "display: block;");
        }
    })

    ModalPassword.addEventListener("keyup", function () {
        if (Modalrule_password.test(ModalPassword.value) === true && ModalPassword.value != "") {
            ModalPasswordInvalid.setAttribute("style", "display: none;");
        } else {
            ModalPasswordInvalid.setAttribute("style", "display: block;");
        }
    })

})

ModalLoginButton.onclick = function (e) {
    e.preventDefault();
    //alert("XDDD");

    if ((ModalAccountInvalid.getAttribute("style") != "display: none;") && (ModalPasswordInvalid.getAttribute("style") != "display: none;")) {
        alert("Data Not Full");
        return;
    }
    // if ($("#ckb1").prop('checked')) {
    //     localStorage.setItem('ModalAccount', ModalAccount.value);
    //     localStorage.setItem('ModalPassword', ModalPassword.value);

    // }
    // if (!$("#ckb1").prop('checked')) {
    //     localStorage.removeItem('ModalAccount', ModalAccount.value);
    //     localStorage.removeItem('ModalPassword', ModalPassword.value);

    // }
    
    let ModalMemberItem = {
        Account: ModalAccount.value,
        Password: ModalPassword.value
    };
    console.log(JSON.stringify(ModalMemberItem));
    $.ajax({
        url: "/Member/GetLogin",
        method: "post",
        contentType: 'application/json',
        data: JSON.stringify(ModalMemberItem),
        success: function () {
            //window.location.href = '/Home/Index';
        }
    });
}