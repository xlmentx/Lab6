// product-item.js

class ProductItem extends HTMLElement {
    constructor() {
        super();
      
        this.attachShadow({mode: 'open'});
      
        const wrapper = document.createElement('span');
            wrapper.className = 'product';
        const picture = wrapper.appendChild(document.createElement('img'));
            picture.className = 'img';
        const title = wrapper.appendChild(document.createElement('p'));
            title.className = 'title';
        const price = wrapper.appendChild(document.createElement('p'));
            price.className = 'price';
        const button = wrapper.appendChild(document.createElement('button'));
            button.className = 'button';
            button.addEventListener("click", function(event) {
                event.preventDefault();
                var cart = JSON.parse(window.localStorage.getItem('cart'));
                if(button.innerText == 'Add to Cart') { 
                    button.innerText = 'Remove from Cart'
                    document.getElementById('cart-count').textContent++;
                    cart[this.id-1] = 1;
                    alert('Added to Cart!');  
                } 
                else {
                    button.innerText = 'Add to Cart';
                    document.getElementById('cart-count').textContent--;
                    cart[this.id-1] = 0;
                    alert('Removed from Cart!');
                }
                window.localStorage.setItem('cart', JSON.stringify(cart));
                console.log(cart);
            });
      
        const styling = document.createElement('style');
        styling.textContent = `
            .product {
              align-items: center;
              background-color: white;
              border-radius: 5px;
              display: grid;
              grid-template-areas: 
              'image'
              'title'
              'price'
              'add';
              grid-template-rows: 67% 11% 11% 11%;
              height: 450px;
              filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
              margin: 0 30px 30px 0;
              padding: 10px 20px;
              width: 200px;
            }
        
            .product > button {
              background-color: rgb(255, 208, 0);
              border: none;
              border-radius: 5px;
              color: black;
              justify-self: center;
              max-height: 35px;
              padding: 8px 20px;
              transition: 0.1s ease all;
            }
            
            .product > button:hover {
              background-color: rgb(255, 166, 0);
              cursor: pointer;
              transition: 0.1s ease all;
            }
            
            .product > img {
              align-self: center;
              justify-self: center;
              width: 100%;
              max-height: 300px;
            }

            .price {
              color: green;
              font-size: 1.8em;
              font-weight: bold;
              margin: 0;
            }

            .title {
              font-size: 1.1em;
              margin: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            
            .title:hover {
              font-size: 1.1em;
              margin: 0;
              white-space: wrap;
              overflow: auto;
              text-overflow: unset;
            }`;

        this.shadowRoot.append(wrapper,styling);
    }

    update(item, stored){ 
        this.id = item.id;
        var wrapper = this.shadowRoot.firstChild.childNodes;
        wrapper[0].src = item.image;
        wrapper[0].alt = item.description;
        wrapper[1].innerText = item.title;
        wrapper[2].innerText = item.price;
        wrapper[3].id = item.id;
        if(stored){ 
            wrapper[3].innerText = 'Remove from Cart';
            document.getElementById('cart-count').textContent++;
        }else{
            wrapper[3].innerText = 'Add to Cart';
        }
        console.log(item.id+' '+stored);
    }
}

customElements.define('product-item', ProductItem);