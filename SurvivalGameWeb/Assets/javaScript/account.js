//var member = new Vue({
//    el: '#memberArea',
//    data: {
//        needLogin: true,
//        isLogin: false,
//        memMail: 'test@gmail.com'
//    },
//    methods: {
//        onLogOutClick: function (e) {
//            e.preventDefault();
//            localStorage.removeItem('MemberID');
//            localStorage.removeItem('MemberName');
//            localStorage.removeItem('Authorization');
//            location.reload();
//        }
//    },
//    mounted: function () {
//        let self = this;
//        //let authData = localStorage.getItem('Authorization');
//        if (authData) {
//            $.ajax({
//                type: "Post",
//                url: checkLoginUrl,
//                dataType: "JSON",
//                //headers: { //add jwt token
//                //    Authorization: authData
//                //},
//                success: function (response) {
//                    if (response.Status) {
//                        self.needLogin = false;
//                        self.isLogin = true;
//                        self.memMail = response.Name;
//                        //if (response.Token) {
//                        //    localStorage.setItem('Authorization', response.Token);
//                        //}
//                        isLogin = true;
//                    }
//                    else {
//                        localStorage.removeItem('MemberID');
//                        localStorage.removeItem('MemberName');
//                        localStorage.removeItem('Authorization');
//                    }
//                }
//            });
//        }
//    }
//});

var member;
function binding() {
    member = new Vue({
        el: "#memberArea",
        data: {
            isLogin: false,
            memMail: ''
        },
        methods: {
            loginShow: function () {
                $("#LoginModal").modal('show');
            },
            onLogOutClick: function () {
                this.isLogin = false;
                //console.log(document.cookie);
                document.cookie = 'expire-my-session-cookie=true; Path=/;';
                //document.cookie = "authentication=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
                //logout 清除 auth 的 cookie
                //console.log(document.cookie);
            }
            
        }
    });
}
function load() {
    //cookies 內有auth
    $.ajax({
        type: "Get",
        url: checkLoginUrl,
        dataType: "JSON",
        success: function (response) {
            if (response.Status) {
                member.$data.isLogin = true;
                member.$data.memMail = response.Name;
            }
        }
    });
}
function checkLoginStatus() {
    return member.$data.isLogin;
}



$(document).ready(function () {
    binding();
    load();
});