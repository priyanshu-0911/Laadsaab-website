// ======================= "Divine Weave" Loader Logic =======================
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('is-loading');
});

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');

    setTimeout(() => {
        if (loader) {
            loader.classList.add('is-hidden');
        }
        document.body.classList.remove('is-loading');
        document.body.classList.add('is-loaded');
    }, 3000); 
});

// ======================= Product Data =======================

const products = [
    {
        id: 1,
        name: "Oasis Bloom Kurta",
        price: 2699,
        originalPrice: 3299,
        image: "images/1.jpeg", // Formerly 1000075352.jpeg
        isNew: true,
        description: "Escape to paradise with the Oasis Bloom Kurta. Featuring a vibrant, tropical print on a pristine white base with delicate schiffli embroidery, this piece is crafted from breathable cotton for ultimate comfort on warm, sunny days.",
        sizes: ["S", "M", "L"],
        colors: ["Tropical White"],
        rating: 4.9,
        reviews: [
            { author: "Vikram R.", text: "The print is even more stunning in person. Perfect for a beach vacation!" }
        ]
    },
    {
        id: 2,
        name: "Azure Paisley Kurta",
        price: 2499,
        originalPrice: 2999,
        image: "images/2.jpeg", // Formerly 1000075388.jpeg
        isNew: true,
        description: "A modern take on a classic motif. This kurta, in a calming shade of azure green, features bold, contemporary paisley prints. The subtle, textured fabric adds a layer of sophistication, making it ideal for both casual outings and artistic events.",
        sizes: ["M", "L", "XL"],
        colors: ["Azure Green"],
        rating: 4.7,
        reviews: [
            { author: "Sameer T.", text: "Love the unique design. It's a real head-turner." }
        ]
    },
    {
        id: 3,
        name: "Sunset Ombre Kurta",
        price: 2899,
        originalPrice: 3499,
        image: "images/3.jpeg", // Formerly 1000075346.jpeg
        isNew: false,
        description: "Capture the warmth of a desert sunset with this stunning ombre kurta. Transitioning from a soft cream to a rich mango yellow, it's adorned with delicate, silver elephant embroidery, adding a touch of royal charm.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Mango Yellow"],
        rating: 4.8,
        reviews: [
            { author: "Karan J.", text: "The color gradient is beautiful. Very elegant piece." }
        ]
    },
    {
        id: 4,
        name: "Rosegold Festive Kurta",
        price: 3199,
        originalPrice: 3999,
        image: "images/4.jpeg", // Formerly 1000075355.jpeg
        isNew: true,
        description: "Radiate elegance at your next celebration. This rosegold pink kurta features intricate mirror work on the yoke and a stunning, multi-colored embroidered border, making it a masterpiece of festive wear.",
        sizes: ["M", "L", "XL"],
        colors: ["Rosegold Pink"],
        rating: 4.9,
        reviews: [
            { author: "Arjun M.", text: "Perfect for weddings. The detail on the border is incredible." }
        ]
    },
    {
        id: 5,
        name: "Midnight Paisley Kurta",
        price: 2599,
        originalPrice: 3199,
        image: "images/5.jpeg", // Formerly 1000075403.jpeg
        isNew: false,
        description: "Bold and charismatic, the Midnight Paisley Kurta is designed for the man who makes a statement. The deep black canvas is brought to life with striking white paisley embroidery, creating a powerful and sophisticated contrast.",
        sizes: ["M", "L", "XL", "XXL"],
        colors: ["Black & White"],
        rating: 4.8,
        reviews: []
    },
    {
        id: 6,
        name: "Sterling Vine Kurta",
        price: 2799,
        originalPrice: 3399,
        image: "images/6.jpeg", // Formerly 1000075340.jpeg
        isNew: true,
        description: "Subtle luxury defines the Sterling Vine Kurta. In a sophisticated shade of pale mint green, it features delicate, self-colored floral vine embroidery throughout. A perfect choice for daytime events and sophisticated gatherings.",
        sizes: ["S", "M", "L"],
        colors: ["Sterling Mint"],
        rating: 4.7,
        reviews: [
            { author: "Rahul D.", text: "Very classy and understated. The fabric feels amazing." }
        ]
    },
    {
        id: 7,
        name: "Smoked Steel Kurta",
        price: 2999,
        originalPrice: 3699,
        image: "images/7.jpeg", // Formerly 1000075397.jpeg
        isNew: false,
        description: "A masterpiece of modern ethnic wear. This kurta showcases a stunning grey ombre effect, transitioning from a light silver to a deep charcoal, all adorned with an intricate geometric and floral pattern.",
        sizes: ["M", "L", "XL"],
        colors: ["Smoked Steel"],
        rating: 4.9,
        reviews: []
    },
    {
        id: 8,
        name: "Plum Noir Embroidered Kurta",
        price: 2699,
        originalPrice: 3299,
        image: "images/8.jpeg", // Formerly 1000075364.jpeg
        isNew: false,
        description: "Deep, mysterious, and elegant. This rich plum-colored kurta is enhanced with fine black embroidery on the collar, placket, and a cascading pattern at the hem, offering a look of refined sophistication.",
        sizes: ["L", "XL", "XXL"],
        colors: ["Plum Noir"],
        rating: 4.8,
        reviews: [
            { author: "Nikhil G.", text: "The color is very unique and looks very royal." }
        ]
    },
    {
        id: 9,
        name: "Sandstone Texture Kurta",
        price: 2299,
        originalPrice: 2799,
        image: "images/9.jpeg", // Formerly 1000075370.jpeg
        isNew: false,
        description: "Inspired by natural textures, this sandstone beige kurta features a subtle, vertically striated pattern. Its understated and earthy tone makes it a versatile piece for a variety of occasions, from casual to semi-formal.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Sandstone Beige"],
        rating: 4.6,
        reviews: []
    }
];
// ======================= App Logic =======================
document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('products-grid');
    let cart = []; // This array will hold our cart items

    // --- RENDER PRODUCTS ---
    function createProductCard(product) {
        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-card__image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-card__image">
                    ${product.isNew ? '<div class="product-card__badge">New</div>' : ''}
                </div>
                <div class="product-card__content">
                    <h3 class="product-card__name">${product.name}</h3>
                    <div class="product-card__price">
                        <span class="price">₹${product.price.toLocaleString('en-IN')}</span>
                        <span class="price--original">₹${product.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <button class="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        `;
    }

    if (productsGrid) {
        productsGrid.innerHTML = products.map(createProductCard).join('');
    }

    // --- ANIMATION OBSERVER ---
    const animatedCards = document.querySelectorAll('.product-card, .feature-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedCards.forEach(card => {
        if (card) observer.observe(card);
    });

    // --- SHOPPING CART LOGIC ---
    const cartButton = document.getElementById('cart-button');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartButton = document.getElementById('close-cart-btn');
    const cartCountBadge = document.getElementById('cart-count');
    const cartContent = document.getElementById('cart-content');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const emptyCartMessage = cartContent.querySelector('.empty-cart-message');

    function openCart() { cartSidebar.classList.add('is-open'); }
    function closeCart() { cartSidebar.classList.remove('is-open'); }

    function updateCart() {
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'flex';
            const itemsWrapper = cartContent.querySelector('.cart-items-wrapper');
            if (itemsWrapper) itemsWrapper.remove();
        } else {
            emptyCartMessage.style.display = 'none';
            let itemsWrapper = cartContent.querySelector('.cart-items-wrapper');
            if (!itemsWrapper) {
                itemsWrapper = document.createElement('div');
                itemsWrapper.className = 'cart-items-wrapper';
                cartContent.appendChild(itemsWrapper);
            }
            
            itemsWrapper.innerHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item__image">
                    <div class="cart-item__info">
                        <div>
                            <h4 class="cart-item__name">${item.name}</h4>
                            <p class="cart-item__price">₹${item.price.toLocaleString('en-IN')}</p>
                        </div>
                        <div class="cart-item__actions">
                            <div class="quantity-controls">
                                <button class="qty-btn" data-action="decrease">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="qty-btn" data-action="increase">+</button>
                            </div>
                            <button class="remove-btn"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountBadge.textContent = totalItems;

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartSubtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }
    
    // ======================= Mobile Navigation Logic =======================
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavClose = document.getElementById('mobile-nav-close');

    function openMobileNav() {
        mobileNav.classList.add('is-open');
    }

    function closeMobileNav() {
        mobileNav.classList.remove('is-open');
    }

    mobileMenuToggle.addEventListener('click', openMobileNav);
    mobileNavClose.addEventListener('click', closeMobileNav);

    // Close mobile nav when a link is clicked
    document.querySelectorAll('.mobile-nav__link').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // ======================= Command Palette Search Logic =======================
    const searchButton = document.getElementById('searchBtn');
    const searchPalette = document.getElementById('search-palette');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const mainContent = document.querySelector('main');
    const header = document.querySelector('header');

    // --- Animated Placeholder Logic ---
    const animatedPlaceholders = [
        "Search for Anarkali...",
        "Try 'Festive Wear'",
        "Looking for Silk Kurtas?",
        "Search by color, e.g., 'Blue'"
    ];
    let placeholderIndex = 0;
    let letterIndex = 0;
    let currentPlaceholder = '';
    let isDeleting = false;
    let typingInterval;

    function typePlaceholder() {
        const placeholderText = animatedPlaceholders[placeholderIndex];
        
        if (isDeleting) {
            currentPlaceholder = placeholderText.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            currentPlaceholder = placeholderText.substring(0, letterIndex + 1);
            letterIndex++;
        }

        searchInput.setAttribute('placeholder', currentPlaceholder);

        if (!isDeleting && letterIndex === placeholderText.length) {
            isDeleting = true;
            clearInterval(typingInterval);
            typingInterval = setTimeout(() => {
                typingInterval = setInterval(typePlaceholder, 100); // Faster delete speed
            }, 2000); // Pause for 2 seconds
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            placeholderIndex = (placeholderIndex + 1) % animatedPlaceholders.length;
            clearInterval(typingInterval);
            typingInterval = setInterval(typePlaceholder, 200); // Normal typing speed
        }
    }
    // --- End of Animated Placeholder Logic ---

    function openSearch() {
        searchPalette.classList.add('is-open');
        mainContent.classList.add('search-active');
        header.classList.add('search-active');
        setTimeout(() => {
            searchInput.focus();
            // Start the typing animation
            typingInterval = setInterval(typePlaceholder, 200);
        }, 400); // Focus and start typing after animation
    }

    function closeSearch() {
        searchPalette.classList.remove('is-open');
        mainContent.classList.remove('search-active');
        header.classList.remove('search-active');
        searchInput.value = '';
        searchResults.innerHTML = '';
        // Stop the typing animation and reset
        clearInterval(typingInterval);
        searchInput.setAttribute('placeholder', '');
    }

    function handleSearch() {
        const query = searchInput.value.toLowerCase();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query)
        );

        if (filteredProducts.length > 0) {
            searchResults.innerHTML = filteredProducts.map(product => `
                <a href="#" class="search-result-item" data-product-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                        <div class="search-result-item__name">${product.name}</div>
                        <div class="search-result-item__price">₹${product.price.toLocaleString('en-IN')}</div>
                    </div>
                </a>
            `).join('');
        } else {
            searchResults.innerHTML = '<p style="color: var(--color-text-muted); text-align: center; padding: 24px;">No products found.</p>';
        }
    }

    searchButton.addEventListener('click', openSearch);
    searchInput.addEventListener('input', handleSearch);
    
    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchPalette.classList.contains('is-open')) {
            closeSearch();
        }
    });

    // Also close by clicking the overlay itself
    searchPalette.addEventListener('click', (e) => {
        if (e.target === searchPalette) {
            closeSearch();
        }
    });


    // ======================= Product Detail Modal Logic =======================
    const modalOverlay = document.getElementById('modal-overlay');
    const productModal = document.getElementById('product-modal');

    function openModal() {
        modalOverlay.classList.add('is-open');
        productModal.classList.add('is-open');
    }

    function closeModal() {
        modalOverlay.classList.remove('is-open');
        productModal.classList.remove('is-open');
    }

    function renderProductModal(product) {
        productModal.innerHTML = `
            <button class="close-modal-btn" id="close-modal-btn"><i class="fas fa-times"></i></button>
            <div class="product-detail">
                <img src="${product.image}" alt="${product.name}" class="product-detail__image">
                <div class="product-detail__info">
                    <h2>${product.name}</h2>
                    <div class="product-detail__price">
                        <span class="price">₹${product.price.toLocaleString('en-IN')}</span>
                        <span class="price--original">₹${product.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <p class="product-detail__description">${product.description}</p>
                    
                    <div class="option-group">
                        <h3 class="option-group__title">Size</h3>
                        <div class="option-buttons">
                            ${product.sizes.map(size => `<button class="option-btn">${size}</button>`).join('')}
                        </div>
                    </div>

                    <div class="option-group">
                        <h3 class="option-group__title">Color</h3>
                        <div class="option-buttons">
                            ${product.colors.map(color => `<button class="option-btn">${color}</button>`).join('')}
                        </div>
                    </div>

                    <button class="btn modal-add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        openModal();
    }

    // ======================= Checkout Modal Logic =======================
    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutOverlay = document.getElementById('checkout-overlay');
    const closeCheckoutBtn = document.getElementById('close-checkout-btn');
    const cartCheckoutBtn = document.querySelector('.cart-checkout-btn');
    const summaryItemsEl = document.getElementById('summary-items');
    const summaryTotalEl = document.getElementById('summary-total');

    function openCheckoutModal() {
        // Populate summary
        summaryItemsEl.innerHTML = cart.map(item => `
            <div class="summary-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <p>${item.name}</p>
                    <p>Qty: ${item.quantity}</p>
                </div>
            </div>
        `).join('');

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        summaryTotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

        // Close cart and open checkout
        closeCart();
        checkoutOverlay.classList.add('is-open');
        checkoutModal.classList.add('is-open');
    }

    function closeCheckoutModal() {
        checkoutOverlay.classList.remove('is-open');
        checkoutModal.classList.remove('is-open');
    }

    cartCheckoutBtn.addEventListener('click', openCheckoutModal);
    closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
    checkoutOverlay.addEventListener('click', closeCheckoutModal);

    productsGrid.addEventListener('click', (e) => {
        // Find if a product image was clicked, not the add to cart button
        if (e.target.classList.contains('product-card__image')) {
            const card = e.target.closest('.product-card');
            const productId = parseInt(card.dataset.productId);
            const product = products.find(p => p.id === productId);
            renderProductModal(product);
        }
    });

    // Event listener for closing and adding to cart from within the modal
    productModal.addEventListener('click', (e) => {
        if (e.target.closest('#close-modal-btn')) {
            closeModal();
        }
        if (e.target.classList.contains('modal-add-to-cart-btn')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
            closeModal();
            openCart(); // Show the cart after adding
        }
    });

    modalOverlay.addEventListener('click', closeModal);
    
    // --- EVENT LISTENERS ---
    cartButton.addEventListener('click', openCart);
    closeCartButton.addEventListener('click', closeCart);

    productsGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const card = e.target.closest('.product-card');
            const productId = parseInt(card.dataset.productId);
            addToCart(productId);
            openCart();
        }
    });

    cartContent.addEventListener('click', (e) => {
        const target = e.target;
        const cartItem = target.closest('.cart-item');
        if (!cartItem) return;

        const productId = parseInt(cartItem.dataset.id);
        const itemInCart = cart.find(item => item.id === productId);

        if (target.closest('.remove-btn')) {
            cart = cart.filter(item => item.id !== productId);
        }
        if (target.dataset.action === 'increase') {
            itemInCart.quantity++;
        }
        if (target.dataset.action === 'decrease') {
            itemInCart.quantity--;
            if (itemInCart.quantity === 0) {
                cart = cart.filter(item => item.id !== productId);
            }
        }
        updateCart();
    });

    mobileMenuToggle.addEventListener('click', openMobileNav);
    mobileNavClose.addEventListener('click', closeMobileNav);

    document.querySelectorAll('.mobile-nav__link').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // --- INITIAL CALLS ---
    updateCart(); // Set the initial state of the cart
});