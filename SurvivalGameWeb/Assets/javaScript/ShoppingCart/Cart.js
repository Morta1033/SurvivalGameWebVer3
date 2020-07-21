Vue.filter('subtotal', function (item) {
    if (item.Quantity > item.InvetoryQuantity) {
        item.Quantity = item.InvetoryQuantity
        return +parseFloat((item.Price * item.Quantity).toPrecision(12));
    }
    return +parseFloat((item.Price * item.Quantity).toPrecision(12));

});
var app = new Vue({
    el: '#app',
    data: {
        items: [],
    },
    created: function () {
        if (localStorage.getItem('Cart') != null) {
            var itendata = JSON.parse(localStorage.getItem('Cart'))
            itendata.forEach(el => {
                this.loadData(el.ItemId)
            });
        }
    },
    computed: {
        total: function () {
            let total = 0;
            this.items.forEach((el) => {
                total += el.Quantity * el.Price
            });
            return +parseFloat(total.toPrecision(12));
        }
    },
    methods: {
        loadData(i) {
            $.ajax({
                type: "Get",
                url: `https://survivalgameweb.azurewebsites.net/api/Detail/${i}`,
                dataType: 'json',
                success: function (datas) {
                    if (datas.IsSuccess) {
                        NewCartItem = datas.Data;
                        NewCartItem.Quantity = 1;
                        NewCartItem.min = 1;
                        app.items.push(NewCartItem)
                    }
                }
            });
        },
        removeItem: function (cartItem) {
            let i = this.items.indexOf(cartItem)
            this.items.splice(i, 1)
            let cart = JSON.parse(localStorage.getItem('Cart'))
            let result = $.map(cart, function (el) {
                return el.ItemId;
            }).indexOf(cartItem.ID.trim());
            cart.splice(result, 1)
            if (cart.length < 1) {
                localStorage.removeItem('Cart')
            } else {
                localStorage.setItem('Cart', JSON.stringify(cart))
            }
            Cartlist();
        },
        SendOrder: function (el) {
            let shopdata = {
                total: this.total,
                detail: []
            }
            el.forEach(element => {
                let product = {
                    ItemId: '',
                    ItemCount: '',
                }
                product.ItemCount = element.Quantity
                product.ItemId = element.ID
                shopdata.detail.push(product)
            });
            if (checkLoginStatus()) {
                localStorage.setItem('CartData', JSON.stringify(shopdata))
                window.location.href = '/Product/CheckOut'
            } else {
                $("#LoginModal").modal('show');

            }
        },
    }
})