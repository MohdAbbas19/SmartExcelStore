
//nave
function toggleNav() {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("show");
}
//cart
let cart = [];

function addToCart(productName, price) {
  const index = cart.findIndex(item => item.productName === productName);
  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ productName, price, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartItemsEl = document.getElementById("cart-items");
  const cartCountEl = document.getElementById("cart-count");
  const cartTotalEl = document.getElementById("cart-total");

  cartItemsEl.innerHTML = "";
  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach((item, i) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.productName} - ₹${item.price} × ${item.quantity}
      <button onclick="increaseQuantity(${i})">add</button>
      <button onclick="decreaseQuantity(${i})">descart</button>
    `;

    cartItemsEl.appendChild(li);
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;
  });

  cartCountEl.textContent = totalItems;
  cartTotalEl.textContent = totalPrice;
}

function increaseQuantity(index) {
  cart[index].quantity += 1;
  updateCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1); // Remove if quantity is 0
  }
  updateCart();
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("hidden");
}

function checkout() {

 if (cart.length === 0) {
    alert("🛒 Your cart is empty!");
    return;
  }

  let message = "🛒 *Your Cart Details:*\n\n";
  let total = 0;

  cart.forEach(item => {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;
    message += `📦 ${item.productName} - Qty: ${item.quantity} - ₹${lineTotal}\n`;
  });

  message += `\n💰 *Total Amount: ₹${total}*\n`;
  message += `\n👉 Please confirm your order here!`;

  // Copy to clipboard
  navigator.clipboard.writeText(message)
    .then(() => {
      alert("✅ Cart copied to clipboard!\nPaste it in Instagram chat.");
      // Open Instagram profile
      window.open("https://www.instagram.com/smar_tsheet", "_blank");
    })
    .catch(err => {
      alert("❌ Could not copy the message. Please try again.");
      console.error(err);
    });
}




