function AddOrderInfo() {
    var orderinfo = {
        name: $('#Name').val(),
        address: $('#Address').val(),
        phone: $('#Phone').val(),
        email: $('#Email').val(),
        Payment: $('input[name=optradio]:checked').val(),
        Deliverymethod: $('input[name=optradio1]:checked').val()
    }
    console.log(orderinfo)
}
$(document).ready(function () {
    $('#OrederCheck').click(function (e) {
        AddOrderInfo();
    });
});