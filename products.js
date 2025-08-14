document.addEventListener('DOMContentLoaded', () => {
    const allProducts = [
        { id: 1, name: "Classic White Kurta", price: 1299, image: "https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=800&h=1200&fit=crop", category: "classic", sizes: ["S", "M", "L"] },
        { id: 2, name: "Navy Embroidered Kurta", price: 2199, image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=1200&fit=crop", category: "festive", sizes: ["M", "L", "XL"] },
        { id: 3, name: "Burgundy Festive Kurta", price: 2899, image: "https://images.unsplash.com/photo-1556935962-7f2e4f0b5e8d?w=800&h=1200&fit=crop", category: "festive", sizes: ["L", "XL"] },
        { id: 4, name: "Black Printed Kurta", price: 2499, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=1200&fit=crop", category: "classic", sizes: ["S", "M"] },
        { id: 5, name: "Cream Linen Kurta", price: 1699, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=1200&fit=crop", category: "casual", sizes: ["M", "L"] },
        { id: 6, name: "Forest Green Kurta", price: 2799, image: "https://images.unsplash.com/photo-1566479179817-c7b7b04c9f3b?w=800&h=1200&fit=crop", category: "festive", sizes: ["L", "XL"] },
    ];

    const productsGrid = document.getElementById('all-products-grid');
    const categoryFilters = document.getElementById('category-filters');
    const sizeFilters = document.getElementById('size-filters');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');

    function renderProducts(productsToRender) {
        productsGrid.innerHTML = productsToRender.map(product => `
            <div class="product-card">
                <div class="product-card__image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-card__image">
                </div>
                <div class="product-card__content">
                    <h3 class="product-card__name">${product.name}</h3>
                    <div class="product-card__price">
                        <span class="price">₹${product.price.toLocaleString('en-IN')}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function applyFilters() {
        const selectedCategories = Array.from(categoryFilters.querySelectorAll('input:checked')).map(input => input.value);
        const selectedSizes = Array.from(sizeFilters.querySelectorAll('input:checked')).map(input => input.value);
        const maxPrice = parseInt(priceRange.value);

        priceValue.textContent = `₹${maxPrice.toLocaleString('en-IN')}`;

        let filteredProducts = allProducts.filter(product => {
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const sizeMatch = selectedSizes.length === 0 || product.sizes.some(size => selectedSizes.includes(size));
            const priceMatch = product.price <= maxPrice;
            return categoryMatch && sizeMatch && priceMatch;
        });

        renderProducts(filteredProducts);
    }

    // Event Listeners
    categoryFilters.addEventListener('change', applyFilters);
    sizeFilters.addEventListener('change', applyFilters);
    priceRange.addEventListener('input', applyFilters);

    // Initial render
    renderProducts(allProducts);
});