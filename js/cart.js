function loadCart() {
  const cartContainer = document.getElementById("cart-container");
  const totalPriceElement = document.getElementById("total-price");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
        <span>${item.name}</span>
        <span>${item.qty} x GEL${item.price.toFixed(2)}</span>
        <span>GEL${(item.qty * item.price).toFixed(2)}</span>
        <button onclick="removeItem(${index})">Remove</button>
      `;
    cartContainer.appendChild(div);
  });

  totalPriceElement.textContent = "Total: GEL" + total.toFixed(2);
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

window.onload = loadCart;

