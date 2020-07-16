var pagination_frank = new Vue({
    el: '#productsArea',
    data: {      
        pDetailRoot: '/product/ProductDetails',
        perPage: 10,
        currentPage: 1,
        orderTyoe: 0,
        typeDirSelected: '',
        IsReverse: false,
        orderTypes: [
            { Name: 'Default', Value: 'Default' },
            { Name: 'Name', Value: 'Name' },
            { Name: 'Price', Value: 'Price' },
            { Name: 'Newest', Value: 'PurchasingDay' },
            { Name: 'Most Popular', Value: 'OrderAmount' }
        ],
        orderDirs: [
            'Ascending', 'Descending'
        ],
        originData : [],
        items: [
            { ID: 'PD001', Name: 'Bacardi 151', Price: '69.00', img: 'https://imgur.com/UoTEHoW.jpg' }],
        showItems: [],
        catagoryList: []
    },
    computed: {
        rows() {
            return this.items.length;
        }
    },
    methods: {
        pageChange: function (p) {
            console.log("current page: " + p);
            this.currentPage = p;
            this.showItems = this.items.slice(this.perPage * (p - 1), this.perPage * p);
        },
        onOrderRuleChange: function (e) {
            console.log("onOrderRuleChange: ", e.currentTarget.selectedIndex);
            let isChange = false;
            let i = e.currentTarget.selectedIndex;
            let key = this.orderTypes[i].Value;
            if (this.orderTyoe != i) {
                this.items.sort(function (a, b) {
                    if (a[key] == null && b[key] == null) {
                        return 0;
                    }
                    else if (a[key] == null) {
                        return -1;
                    }
                    else if (b[key] == null) {
                        return 1;
                    }

                    if (a[key] > b[key]) return 1;
                    else if (b[key] > a[key]) return -1;
                    else return 0;
                });
                this.orderTyoe = i;
                isChange = true;
            }
            if (isChange) {
                this.currentPage = 1;
                this.pageChange(this.currentPage);
                this.IsReverse = false;
                this.typeDirSelected = this.orderDirs[0];
            }
            console.log(this.items);
        },
        onOrderDieChange: function (e) {
            console.log("onOrderDieChange: ", e);
            if (e.currentTarget.selectedIndex == 1 && !this.IsReverse) {
                this.items = this.items.reverse();
                this.pageChange(this.currentPage);
                this.IsReverse = true;
            }
            else if (this.IsReverse) {
                this.items = this.items.reverse();
                this.currentPage = 1;
                this.pageChange(this.currentPage);
                this.IsReverse = false;
            }
        },
        catagoryClick: function (e) {
            e.preventDefault();
            console.log("catagory click!!", e.currentTarget.getAttribute('data-caID'));
            caID = e.currentTarget.getAttribute('data-caID');
            caID = `${caID ? caID.trim() : ''}`;
            //if (caID) {
            //    this.items = this.originData.filter(x => x.CatagoryID == caID);
            //}
            //else {
            //    this.items = this.originData;
            //}
            //let url = root + (caID ? '/' + caID : '')
            //let sendData = { caID: caID };
            let self = this;
            //window.history.pushState("change sort", "test Title", `/Product/ProductMenu${caID ? '/' + caID.trim() : ''}`);
            window.history.pushState("change sort", "test Title", `/Product/ProductMenu${caID ? '/' + caID.trim() : ''}`);
            console.log('caID: ' ,caID);
            $.ajax({
                type: 'Get',
                url: 'https://survivalgameweb.azurewebsites.net/api/sortableProduct/' + caID,
                dataType: 'json',
                //data: sendData,
                success: function (datas) {
                    if (datas.IsSuccess) {
                        console.log(datas.Data);
                        self.originData = datas.Data;
                        self.items = datas.Data;

                        self.pageChange(1);
                        contentWayPoint();

                        let i = self.orderTyoe;
                        let key = self.orderTypes[i].Value;
                        console.log('key:' ,key);
                        self.items.sort(function (a, b) {
                            if (a[key] == null && b[key] == null) {
                                return 0;
                            }
                            else if (a[key] == null) {
                                return -1;
                            }
                            else if (b[key] == null) {
                                return 1;
                            }
        
                            if (a[key] > b[key]) return 1;
                            else if (b[key] > a[key]) return -1;
                            else return 0;
                        });
                        self.typeDirSelected = self.orderDirs[0];
                    }
                }
            });

            //this.pageChange(this.currentPage);
        },
        gotoCart: function (e) {
            e.preventDefault();
            let selectID = e.currentTarget.getAttribute('data-id');
            let selectProduct = this.items.find(x => x.ID == selectID);
            let cartsObj = 
            {
                ItemId: selectProduct.ID,
                ItemName: selectProduct.Name,
                ItemPrice: selectProduct.Price,
                ItemCount: 1,
                ItemImg: (selectProduct.ImgList[0] ? selectProduct.ImgList[0] : undefined)
            }
            console.log("gorto carts", cartsObj);
            LocalCart(cartsObj);
        }
    },
    mounted: function () {
        let self = this;
        //let sendData = { caID : caID };
        $.ajax({
            type: 'Get',
            url: 'https://survivalgameweb.azurewebsites.net/api/sortableProduct/' + caID,
            dataType: 'json',
            //data: sendData,
            success: function (datas) {
                if (datas.IsSuccess) {
                    console.log(datas.Data);
                    self.originData = datas.Data;
                    self.items = datas.Data;

                    self.pageChange(1);
                    contentWayPoint();

                    self.typeDirSelected = self.orderDirs[0];
                }
            }
        });
        $.ajax({
            type: 'Get',
            url: 'https://survivalgameweb.azurewebsites.net/api/Product/AllCatagory',
            dataType: 'json',
            success: function (datas) {
                if (datas.IsSuccess) {
                    self.catagoryList = datas.Data;
                }
            }
        });
    },
    updated: function () {
        console.log('products updated');
        contentWayPoint();

        $('.selectpicker').selectpicker('refresh');
    }
});


//var sideBar_frank = new Vue(
//    {
//        el: '#sideArea',
//        data: {
//            catagoryList: [
//                {
//                    "ID": "CG001     ",
//                    "Name": "Gun",
//                    "SubCatagoryList": [
//                        {
//                            "ID": null,
//                            "Name": "All"
//                        },
//                        {
//                            "ID": "CL001     ",
//                            "Name": "Pistol"
//                        },
//                        {
//                            "ID": "CL002     ",
//                            "Name": "Rifle"
//                        },
//                        {
//                            "ID": "CL003     ",
//                            "Name": "Submachine Gun"
//                        },
//                        {
//                            "ID": "CL004     ",
//                            "Name": "Sniper Rifle"
//                        },
//                        {
//                            "ID": "CL005     ",
//                            "Name": "Grenade Gun"
//                        },
//                        {
//                            "ID": "CL006     ",
//                            "Name": "Machine Gun"
//                        }
//                    ]
//                }
//            ]
//        },
//        methods: {
//            catagoryClick: function (e) {
//                e.preventDefault();
//                console.log("catagory click!!", e.currentTarget.getAttribute('data-caID'));
//                console.log(pagination_frank.data);
//            }
//        },
//        mounted: function () {
//            let self = this;
//            $.ajax({
//                type: 'Get',
//                url: 'https://survivalgameweb.azurewebsites.net/api/Product/AllCatagory',
//                dataType: 'json',
//                success: function (datas) {
//                    if (datas.IsSuccess) {
//                        self.catagoryList = datas.Data;
//                    }
//                }
//            });

//        },
//    }
//);