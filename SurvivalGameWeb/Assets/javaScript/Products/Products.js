var pagination_frank = new Vue({
    el: '#productsArea',
    data: {
        pDetailRoot: 'http://survivalgameweb.azurewebsites.net/api',
        perPage: 10,
        currentPage: 1,
        orderTyoe: 0,
        typeDirSelected: '',
        IsReverse: false,
        orderTypes: [
            { Name: 'Default', Value: 'Default'},
            { Name: 'Name', Value: 'Name'},
            { Name: 'Price', Value: 'Price'},
            { Name: 'Newest', Value: 'PurchasingDay'},
            { Name: 'Most Popular', Value: 'OrderAmount'}
        ],
        orderDirs: [
            'Ascending', 'Descending'
        ],
        items: [
            { ID: 'PD001', Name: 'Bacardi 151', Price: '69.00', img: 'https://imgur.com/UoTEHoW.jpg' }],
        showItems: []
    },
    computed: {
        rows() {
            return this.items.length;
        }
    },
    methods: {
        pageChange: function (p) {
            console.log("current page: " + p);
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
                this.pageChange(this.currentPage);
                this.IsReverse = false;
            }
        }
    },
    mounted: function () {
        let self = this;
        $.ajax({
            type: 'POST',
            url: 'https://survivalgameweb.azurewebsites.net/api/Product/GetSortableProductByCatagory',
            dataType: 'json',
            success: function (datas) {
                if (datas.IsSuccess) {
                    console.log(datas.Data);
                    self.items = datas.Data;
                    self.pageChange(1);
                    contentWayPoint();

                    self.typeDirSelected = self.orderDirs[0];
                }
            }
        });

    },
    updated: function () {
        console.log('products updated');
        contentWayPoint();

        $('.selectpicker').selectpicker('refresh');
    }
})