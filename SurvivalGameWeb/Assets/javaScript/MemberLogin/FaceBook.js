// Load the Facebook Javascript SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function () {
    FB.init({
        appId: '257302035713857',
        xfbml: true,
        version: 'v7.0'
    });
    FB.AppEvents.logPageView();
};

//使用自己客製化的按鈕來登入
function FBLogin() {
    FB.getLoginStatus(function (res) {
        console.log(`status:${res.status}`);//Debug
        if (res.status === "connected") {
            let userID = res["authResponse"]["userID"];
            console.log("用戶已授權您的App，用戶須先revoke撤除App後才能再重新授權你的App");
            console.log(`已授權App登入FB 的 userID:${userID}`);
            GetProfile();
        } else if (res.status === 'not_authorized' || res.status === "unknown") {
            //App未授權或用戶登出FB網站才讓用戶執行登入動作
            FB.login(function (response) {
                if (response.status === 'connected') {
                    //user已登入FB
                    //抓userID
                    let userID = response["authResponse"]["userID"];
                    console.log(`已授權App登入FB 的 userID:${userID}`);
                    GetProfile();

                } else {
                    // user FB取消授權
                    alert("Facebook帳號無法登入");
                }
                //"public_profile"可省略，仍然可以取得name、userID
            }, { scope: 'email' });
        }
    });


}

//取得用戶姓名、email
function GetProfile() {
    //document.getElementById('content').innerHTML = "";//先清空顯示結果

    //FB.api()使用說明：https://developers.facebook.com/docs/javascript/reference/FB.api
    //取得用戶個資
    FB.api("/me", "GET", { fields: 'name,email,birthday' }, function (user) {
        //user物件的欄位：https://developers.facebook.com/docs/graph-api/reference/user
        if (user.error) {
            console.log(response);
        } else {
            console.log(JSON.stringify(user));
        }
    });

}