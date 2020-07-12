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
            }
            //logout 清除 auth 的 cookie
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