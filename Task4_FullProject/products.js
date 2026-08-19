const products = [
    {
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2499,
        rating: 4.5,
        icon: "🎧"
    },
    {
        name: "Smart Watch",
        category: "Electronics",
        price: 3999,
        rating: 4.7,
        icon: "⌚"
    },
    {
        name: "Cotton T-Shirt",
        category: "Clothing",
        price: 799,
        rating: 4.2,
        icon: "👕"
    },
    {
        name: "Running Shoes",
        category: "Clothing",
        price: 2299,
        rating: 4.6,
        icon: "👟"
    },
    {
        name: "JavaScript Guide",
        category: "Books",
        price: 599,
        rating: 4.8,
        icon: "📘"
    },
    {
        name: "Web Development Book",
        category: "Books",
        price: 899,
        rating: 4.4,
        icon: "📚"
    }
];

const productContainer =
    document.getElementById("productContainer");

const categoryFilter =
    document.getElementById("categoryFilter");

const sortProducts =
    document.getElementById("sortProducts");

function displayProducts(productArray) {

    productContainer.innerHTML = "";

    if (productArray.length === 0) {
        productContainer.innerHTML =
            "<p>No products found.</p>";
        return;
    }

    productArray.forEach(function (product) {

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-icon">${product.icon}</div>

            <h2>${product.name}</h2>

            <span class="category">
                ${product.category}
            </span>

            <p class="price">
                ₹${product.price}
            </p>

            <p class="rating">
                ⭐ ${product.rating}
            </p>
        `;

        productContainer.appendChild(card);
    });
}

function updateProducts() {

    let filteredProducts = [...products];

    // Category filtering
    const selectedCategory =
        categoryFilter.value;

    if (selectedCategory !== "all") {
        filteredProducts =
            filteredProducts.filter(function (product) {
                return product.category === selectedCategory;
            });
    }

    // Sorting
    const selectedSort =
        sortProducts.value;

    if (selectedSort === "priceLow") {

        filteredProducts.sort(function (a, b) {
            return a.price - b.price;
        });

    } else if (selectedSort === "priceHigh") {

        filteredProducts.sort(function (a, b) {
            return b.price - a.price;
        });

    } else if (selectedSort === "ratingHigh") {

        filteredProducts.sort(function (a, b) {
            return b.rating - a.rating;
        });
    }

    displayProducts(filteredProducts);
}

categoryFilter.addEventListener(
    "change",
    updateProducts
);

sortProducts.addEventListener(
    "change",
    updateProducts
);

// Display products when page loads
displayProducts(products);