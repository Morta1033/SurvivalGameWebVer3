let CartDetail = document.querySelector('a.dropdown-item')
var CartList = document.querySelector('.dropdown-menu ')

// 判定LOCAL裡面是否有東西
function LocalCart(el) {
    var list = {
        ItemId: el.ItemId,
        ItemName: el.ItemName,
        ItemPrice: el.ItemPrice,
        ItemCount: el.ItemCount,
        ItemImg: el.ItemImg
    }
    if (localStorage.getItem('Cart') == null) {
        let CartData = {
            detail: []
        }
        CartData.detail.push(list)
        localStorage.setItem('Cart', JSON.stringify(CartData))
        return;
    }
    let items = JSON.parse(localStorage.getItem('Cart'))
    items.detail.forEach((el, index) => {
        if (el.ItemId === list.ItemId) {
            items.detail.splice(index, 1, list);
            localStorage.setItem('Cart', JSON.stringify(items));
            return;
        }
        if (el.ItemId.indexOf(list.ItemId) == -1) {
            items.detail.push(list)
            localStorage.setItem('Cart', JSON.stringify(items))
            return
        }
    });
    ItemAddCart(el)
    LoadCartCount();
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
    ItemPrice.textContent = `${el.ItemPrice}`
    ItemCount.textContent = `Quantity:${el.ItemCount}`

    ItemImg.style.backgroundImage = `url(${el.ItemImg})`
    CartList.insertBefore(clonecontent, document.querySelector('a.dropdown-item'))
}
// 計算購物車數量
function LoadCartCount() {
    let CartBag = document.querySelector('small')
    if (JSON.parse(localStorage.getItem('Cart')) != null) {
        let count = JSON.parse(localStorage.getItem('Cart')).detail.length
        CartBag.innerText = count;
        return;
    }
    CartBag.innerText = '0'
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
        items.detail.forEach(element => {
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
        items.detail.forEach(element => {
            ItemAddCart(element)
        })
        RemoveLocal()
        LoadCartCount();
        return
    }
}

function RemoveLocal() {
    let BtnRemove = document.querySelectorAll('.fa-close')
    BtnRemove.forEach(el => {
        el.addEventListener('click', function (e) {
            let key = el.getAttribute('data-key')
            if (JSON.parse(localStorage.getItem('Cart')) != null) {
                let items = JSON.parse(localStorage.getItem('Cart'))
                items.detail.splice(key, 1)
                localStorage.setItem('Cart', JSON.stringify(items))
                if (items.detail.length < 1) {
                    localStorage.clear();
                }
                LoadCartCount()
            }
        })
    });
}