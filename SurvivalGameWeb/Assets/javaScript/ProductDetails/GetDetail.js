var ItemAdd = document.getElementById("AddCartBtn");
ItemAdd.addEventListener("click", function (e) {
    e.preventDefault();
    let data = GetDetail();
    LocalCart(data);
    //console.log(data);
})

function GetDetail() {
    let ID = document.getElementById('ProductID').innerText;
    let Name = document.querySelector('h3').innerText;
    let Price = document.querySelector('.price span').innerText;
    let Count = document.getElementById('quantity').value;
    let Img = document.querySelector('.carousel-item img:first-child').getAttribute('src');

    let data =
    {
        ItemId: ID,
        ItemName: Name,
        ItemPrice: Price,
        ItemCount: Count,
        ItemImg: Img
    };
    return data;
}