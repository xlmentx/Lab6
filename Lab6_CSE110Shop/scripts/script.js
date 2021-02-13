// Script.js
window.addEventListener('DOMContentLoaded', () => {
    if(window.localStorage.getItem('data') === null)
    {   fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => window.localStorage.setItem('data', JSON.stringify(data)));
    }
});
var products = JSON.parse(window.localStorage.getItem('data'));

var cart = new Array(products.length).fill(0);
if(window.localStorage.getItem('cart') === null)
    window.localStorage.setItem('cart', JSON.stringify(cart));
else
    cart = JSON.parse(window.localStorage.getItem('cart'));          

var list = document.getElementById('product-list');
for(var i=0; i<products.length; i++)
{   var item = list.appendChild(document.createElement('product-item'));
        item.update(products[i], cart[i]);
}
