function AddOrderInfo() {
    var orderinfo = {
        name: $('#Name').val(),
        address: $('#Address').val(),
        phone: $('#Phone').val(),
        email: $('#Email').val(),
        Payment: $('input[name=optradio]:checked').val(),
        Deliverymethod: $('input[name=optradio1]:checked').val()
    }
}
$(document).ready(function () {
    init()
    $('#OrederCheck').click(function (e) {
        AddOrderInfo();
    });
});

function init() {
    if (localStorage.getItem('CartData') != null) {
        var datatmp = JSON.parse(localStorage.getItem('CartData'))
        console.log(datatmp)
    }
    $('#sub span:last').text('$' + datatmp.total)
    $('.total-price span:last').text('$' + datatmp.total)
}