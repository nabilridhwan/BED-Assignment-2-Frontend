const getCart = () => {
    let cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(cart)
    } else {
        localStorage.setItem('cart', JSON.stringify([]));
        return [];
    }
}

const addItemToCart = ({
    productid,
    discount_id,
    quantity
}) => {
    let cart = localStorage.getItem('cart');
    let cartObj = JSON.parse(cart);

    let item = cartObj.find(item => item.productid === productid);
    if (item) {
        item.quantity += quantity;
    } else {
        cartObj.push({
            productid,
            discount_id,
            quantity
        });
    }

    localStorage.setItem('cart', JSON.stringify(cartObj));
}

const removeItemFromCart = ({
    productid,
}) => {
    let cart = localStorage.getItem('cart');
    let cartObj = JSON.parse(cart);

    let itemIndex = cartObj.findIndex(item => item.productid === productid);

    if (itemIndex > -1) {
        cartObj.splice(itemIndex, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cartObj));
}

const increaseCartItem = (productid) => {
    let cart = localStorage.getItem('cart');
    let cartObj = JSON.parse(cart);

    let item = cartObj.find(item => item.productid === productid);
    if (item) {
        item.quantity += 1;
    } else {
        cartObj.push({
            productid,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cartObj));
}

const decreaseCartItem = (productid) => {
    let cart = localStorage.getItem('cart');
    let cartObj = JSON.parse(cart);

    let item = cartObj.find(item => item.productid === productid);
    if (item) {
        item.quantity -= 1;

        if (item.quantity < 1) {
            removeItemFromCart({
                productid,
            });
        } else {
            localStorage.setItem('cart', JSON.stringify(cartObj));
        }
    }
}