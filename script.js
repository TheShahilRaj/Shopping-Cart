const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
  ];

  const cart = [];

  const renderProductList = () => {
    const productList = document.getElementById('products');
    productList.innerHTML = '';

    Products.forEach((product) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${product.name} - $${product.price}</span>
        <button onclick="addToCart(${product.id})">+</button>
        <span id="quantity-${product.id}">0</span>
        <button onclick="removeFromCart(${product.id})">-</button>
      `;
      productList.appendChild(li);
    });
  };

  const renderCart = () => {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartMessage = document.getElementById('cart-message');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
      cartMessage.style.display = 'block';
      cartTotal.style.display = 'none';
    } else {
      cartMessage.style.display = 'none';
      cartTotal.style.display = 'block';

      cart.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `${item.product.name} - $${item.product.price} x ${item.quantity}`;
        cartItems.appendChild(cartItem);
      });

      const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      cartTotal.innerText = `Total Price: $${total}`;
    }
  };

  const addToCart = (productId) => {
    const product = Products.find((p) => p.id === productId);
    const cartItem = cart.find((item) => item.product.id === productId);

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({ product, quantity: 1 });
    }

    renderProductList();
    renderCart();
  };

  const removeFromCart = (productId) => {
    const cartItem = cart.find((item) => item.product.id === productId);

    if (cartItem) {
      if (cartItem.quantity === 1) {
        cart.splice(cart.indexOf(cartItem), 1);
      } else {
        cartItem.quantity -= 1;
      }

      renderProductList();
      renderCart();
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    renderProductList();
    renderCart();
  });