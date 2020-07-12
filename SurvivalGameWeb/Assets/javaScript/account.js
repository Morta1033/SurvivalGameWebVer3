var member = new Vue({
    el: '#memberArea',
    data: {
        needLogin: true,
        isLogin: false,
        memMail: 'test@gmail.com'
    },
    methods: {
        onLogOutClick: function (e) {
            e.preventDefault();
            localStorage.removeItem('MemberID');
            localStorage.removeItem('MemberName');
            localStorage.removeItem('Authorization');
            location.reload();
        }
    },
    mounted: function () {
        let self = this;
        //let authData = localStorage.getItem('Authorization');
        if (authData) {
            $.ajax({
                type: "Post",
                url: checkLoginUrl,
                dataType: "JSON",
                //headers: { //add jwt token
                //    Authorization: authData
                //},
                success: function (response) {
                    if (response.Status) {
                        self.needLogin = false;
                        self.isLogin = true;
                        self.memMail = response.Name;
                        //if (response.Token) {
                        //    localStorage.setItem('Authorization', response.Token);
                        //}
                        isLogin = true;
                    }
                    else {
                        localStorage.removeItem('MemberID');
                        localStorage.removeItem('MemberName');
                        localStorage.removeItem('Authorization');
                    }
                }
            });
        }
    }
});




//$(document).ready(function () {
    
//});