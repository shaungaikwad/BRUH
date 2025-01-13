const products = [
    { id: 1, name: "Sofa", price: 12000, image: "sofa.jpg" },
    { id: 2, name: "Chair", price: 3000, image: "chair.jpg" },
    { id: 3, name: "Table", price: 8000, image: "table.jpg" },
    { id: 4, name: "Bed", price: 20000, image: "bed.jpg" },
  ];
  
  let cart = [];
  
  function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
  
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
  
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: ₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
  
      productList.appendChild(productCard);
    });
  }
  
  function addToCart(id) {
    const product = products.find((item) => item.id === id);
    cart.push(product);
    updateCartCount();
  }
  
  function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.length;
  }
  
  function displayCart() {
    const cartSection = document.getElementById("cart-section");
    const cartItems = document.getElementById("cart-items");
  
    cartItems.innerHTML = "";
    let total = 0;
  
    cart.forEach((item, index) => {
      total += item.price;
      const cartItem = document.createElement("div");
      cartItem.innerHTML = `
        <p>${item.name} - ₹${item.price} <button onclick="removeFromCart(${index})">Remove</button></p>
      `;
      cartItems.appendChild(cartItem);
    });
  
    document.getElementById("total-price").innerText = total;
    cartSection.style.display = "block";
  }
  
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    displayCart();
  }
  
  function initiatePayment() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
  
    const options = {
      key: https://razorpay.me/@shaunbalugaikwad,
      amount: total * 100, // Convert to paise
      currency: "INR",
      name: "IKEA Clone",
      description: "Thank you for shopping with us!",
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        cart = [];
        updateCartCount();
        displayCart();
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
    };
  
    const payment = new Razorpay(options);
    payment.open();
  }
  
  document.getElementById("cart-btn").addEventListener("click", displayCart);
  document.getElementById("checkout-btn").addEventListener("click", initiatePayment);
  
  displayProducts();
  