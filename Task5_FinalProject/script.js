const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
        id: 3,
        name: "Classic T-Shirt",
        category: "fashion",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
    },
    {
        id: 4,
        name: "Running Shoes",
        category: "fashion",
        price: 74.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
        id: 5,
        name: "Leather Backpack",
        category: "accessories",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
    },
    {
        id: 6,
        name: "Sunglasses",
        category: "accessories",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083"
    },
    {
        id: 7,
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"
    },
    {
        id: 8,
        name: "Denim Jacket",
        category: "fashion",
        price: 64.99,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5"
    }
];

let cart = [];

function displayProducts(productList) {
    const container = document.getElementById("productContainer");

    container.innerHTML = "";

    if (productList.length === 0) {
        container.innerHTML = "<p>No products found.</p>";
        return;
    }

    productList.forEach(product => {
        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img 
                src="${product.image}" 
                alt="${product.name}"
                loading="lazy"
            >

            <div class="product-info">
                <h3>${product.name}</h3>

                <p class="category">
                    ${product.category}
                </p>

                <p class="price">
                    $${product.price.toFixed(2)}
                </p>

                <button 
                    class="add-button"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

function filterProducts() {
    const searchText =
        document.getElementById("searchInput").value.toLowerCase();

    const category =
        document.getElementById("categoryFilter").value;

    const sort =
        document.getElementById("sortFilter").value;

    let filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(searchText);

        const matchesCategory =
            category === "all" ||
            product.category === category;

        return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    displayProducts(filteredProducts);
}

function addToCart(productId) {
    const product = products.find(product => product.id === productId);

    cart.push(product);

    document.getElementById("cartCount").textContent = cart.length;

    alert(`${product.name} added to your cart!`);
}

function showCart() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const total = cart.reduce(
        (sum, product) => sum + product.price,
        0
    );

    alert(
        `You have ${cart.length} item(s) in your cart.\n` +
        `Total: $${total.toFixed(2)}`
    );
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;

    alert(`Thank you, ${name}! Your message has been submitted.`);

    this.reset();
});

displayProducts(products);