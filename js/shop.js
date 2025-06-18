function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(p => p.name === productName);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name: productName, price: price, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} added to cart.`);
}

const products = [
    { name: "პომიდორი", price: 2.00, category: "vegetable", image: "images/tomato.jpg" },
    { name: "კომბოსტო", price: 1.00, category: "vegetable", image: "images/cabbage.jpg", oldPrice: 1.50 },
    { name: "ვაშლი", price: 2.20, category: "fruit", image: "images/apple.jpg" },
    { name: "რძე", price: 5.00, category: "dairy", image: "images/milk.jpg" },
    { name: "ყველი", price: 15.00, category: "dairy", image: "images/cheese.jpg", oldPrice: 20.00 },
    { name: "მსხალი", price: 5.50, category: "fruit", image: "images/pear.jpg" },
    { name: "კარაქი", price: 9.50, category: "dairy", image: "images/butter.jpg" },
    { name: "ბანანი", price: 6.50, category: "fruit", image: "images/banan.jpg" },
    { name: "კარტოფილი", price: 1.85, category: "vegetable", image: "images/potato.jpg", oldPrice: 2.30 },
    { name: "ყურძენი", price: 8.50, category: "fruit", image: "images/graps.jpg" },
    { name: "ლობიო", price: 9.00, category: "vegetable", image: "images/bean.jpg" },
    { name: "ალუბალი", price: 8.50, category: "fruit", image: "images/cerry.jpg", oldPrice: 12.00 },
    { name: "სტაფილო", price: 4.00, category: "vegetable", image: "images/carrot.jpg" },
    { name: "ხაჭო", price: 15.00, category: "dairy", image: "images/Cottage_cheese.jpg" },
    { name: "ლიმონი", price: 8.50, category: "fruit", image: "images/lemon.jpg" },
    { name: "საზამთრო", price: 9.00, category: "fruit", image: "images/watermelon.jpg" },
    { name: "სალათა", price: 5.00, category: "vegetable", image: "images/lettuce.jpg" },
];


const productGrid = document.getElementById("productGrid");
const categoryFilter = document.getElementById("categoryFilter");
const priceSort = document.getElementById("priceSort");

function renderProducts(list) {
    productGrid.innerHTML = "";
    list.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        const priceHTML = product.oldPrice
            ? `<p><span class="old-price">GEL${product.oldPrice.toFixed(2)}</span> <strong>GEL${product.price.toFixed(2)}</strong> / kg</p>`
            : `<p>GEL${product.price.toFixed(2)} / kg</p>`;

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            ${priceHTML}
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        productGrid.appendChild(card);
    });
}

function searchProduct() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(filtered);
}


function applyFiltersAndSort() {
    let filtered = [...products];

    // Filter by category
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== "all") {
        filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Sort by price
    const sortOption = priceSort.value;
    if (sortOption === "lowToHigh") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
        filtered.sort((a, b) => b.price - a.price);
    }
    if (sortOption === "discount") {
        filtered = filtered.filter(p => p.oldPrice);  //pastakleba
    }


    renderProducts(filtered);
}


function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById("cart-count").textContent = count;
}


function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(p => p.name === productName);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name: productName, price: price, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} დაემატა კალათაში.`);
}

function searchProduct() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const results = products.filter(p => p.name.toLowerCase().includes(query));
    const container = document.getElementById("searchResults");

    container.innerHTML = "";
    results.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        const priceHTML = product.oldPrice
            ? `<p><span class="old-price">GEL${product.oldPrice.toFixed(2)}</span> <strong>GEL${product.price.toFixed(2)}</strong> / kg</p>`
            : `<p>GEL${product.price.toFixed(2)} / kg</p>`;

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            ${priceHTML}
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        container.appendChild(card);
    });

    if (results.length === 0) {
        container.innerHTML = "<p>No products found.</p>";
    }
}

window.addEventListener("load", function () {
    if (window.location.hash == "discount-products") {
        priceSort.value = "discount";
        applyFiltersAndSort();
        setTimeout(() => {
            const target = document.getElementById("discount-products");
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        }, 300);
    }
});


// Event listeners
categoryFilter.addEventListener("change", applyFiltersAndSort);
priceSort.addEventListener("change", applyFiltersAndSort);

// Initial render
renderProducts(products);
updateCartCount();


