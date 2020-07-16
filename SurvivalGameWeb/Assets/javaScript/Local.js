let CartDetail = document.querySelector('a.dropdown-item')
var CartList = document.querySelector('.dropdown-menu ')
// 判定LOCAL裡面是否有東西
function LocalCart(el) {
    var list = {
        ItemId: el.ItemId.trim(),
        ItemName: el.ItemName,
        ItemPrice: el.ItemPrice,
        ItemCount: el.ItemCount,
        ItemImg: el.ItemImg
    }
    ItemAddCart(list)
    LoadCartCount();
    var items = JSON.parse(localStorage.getItem('Cart'))
    if (localStorage.getItem('Cart') == null) {
        let detail = [];
        detail.push(list)
        localStorage.setItem('Cart', JSON.stringify(detail))
    } else {
        var result = $.map(items, function (item, index) {
            return item.ItemId;
        }).indexOf(list.ItemId);
        if (result === -1) {
            items.push(list)
            localStorage.setItem('Cart', JSON.stringify(items))
        }
        else {
            items.splice(result, 1, list);
            localStorage.setItem('Cart', JSON.stringify(items))
        }
    }
    CartListDetail();
}

function ItemAddCart(el) {
    // 購物車單一物品模板
    let create = document.getElementById('CartItem')
    let clonecontent = create.content.cloneNode(true);
    let ItemPrice = clonecontent.querySelector('.price')
    let ItemName = clonecontent.querySelector('.text h4')
    let ItemCount = clonecontent.querySelector('.quantity')
    let ItemImg = clonecontent.querySelector('.img')
    ItemName.textContent = el.ItemName
    ItemPrice.textContent = `$${el.ItemPrice}`
    ItemCount.textContent = `Quantity:${el.ItemCount}`
    ItemImg.style.backgroundImage = `url(${el.ItemImg})`
    CartList.insertBefore(clonecontent, document.querySelector('a.dropdown-item'))
}
// 計算購物車數量
function LoadCartCount() {
    let CartBag = document.querySelector('.align-items-center small')
    if (JSON.parse(localStorage.getItem('Cart')) != null) {
        let count = JSON.parse(localStorage.getItem('Cart')).length
        CartBag.innerText = count;
    } else {
        CartBag.innerText = '0'
    }
}
// 監聽跨頁面storage
window.addEventListener('storage', function () {
    CartListDetail();
    LoadCartCount();
});
// 網頁讀取時判定storage是否有東西
window.onload = function () {
    if (JSON.parse(localStorage.getItem('Cart')) != null) {
        let items = JSON.parse(localStorage.getItem('Cart'))
        items.forEach(element => {
            ItemAddCart(element)
        })
        RemoveLocal()
        LoadCartCount();
    }
};
// 購物車清單詳情
function CartListDetail() {
    let RemoveItem = document.querySelectorAll('.dropdown-menu-right .dropdown-item:not(a)')
    RemoveItem.forEach(element => {
        CartList.removeChild(element)
    });
    if (JSON.parse(localStorage.getItem('Cart')) != null) {
        let items = JSON.parse(localStorage.getItem('Cart'))
        items.forEach(element => {
            ItemAddCart(element)
        })
        RemoveLocal()
        LoadCartCount();
    }
}
function RemoveLocal() {
    let BtnRemove = document.querySelectorAll('.fa-close')
    let itemremove = document.querySelectorAll('.align-items-start h4')
    BtnRemove.forEach((el, index) => {
        el.addEventListener('click', function (e) {
            if (JSON.parse(localStorage.getItem('Cart')) != null) {
                let items = JSON.parse(localStorage.getItem('Cart'))
                var result = $.map(items, function (item, index) {
                    return item.ItemName;
                }).indexOf(itemremove[index].innerText);
                items.splice(result, 1)
                localStorage.setItem('Cart', JSON.stringify(items))
                if (items.length < 1) {
                    localStorage.clear();
                }
                LoadCartCount()
            }
        })
    });
}

function Cartlist() {
    let RemoveItem = document.querySelectorAll('.dropdown-menu-right .dropdown-item:not(a)')
    RemoveItem.forEach(element => {
        CartList.removeChild(element)
    });
    if (JSON.parse(localStorage.getItem('Cart')) != null) {
        let items = JSON.parse(localStorage.getItem('Cart'))
        items.forEach(element => {
            ItemAddCart(element)
        })
        LoadCartCount();
    }
}