// ================== Couture Thread Loader Logic ==================
import { PRODUCTS, findProduct } from './products-data.js';
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('is-loading');
});

window.addEventListener('load', () => {
  const loader   = document.getElementById('loader');
  const swash    = document.getElementById('swash-path');
  const monoWrap = document.getElementById('monogram-wrap');
  const monoImg  = document.getElementById('monogram-img');

  const heroImg  = document.querySelector('.hero__background-image');
  const title    = document.querySelector('.hero__title');
  const subtitle = document.querySelector('.hero__subtitle');
  const cta      = document.querySelector('.hero__cta');

  // If loader elements are missing, just reveal the page safely
  if (!loader || !swash || !monoWrap || !monoImg) {
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-loaded');
    return;
  }

  // Prepare swash for "thread draw"
  let swashLen = 800;
  try { swashLen = swash.getTotalLength(); } catch (_) {}
  swash.style.strokeDasharray  = swashLen;
  swash.style.strokeDashoffset = swashLen;

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  // Thread draw across the swash
// Thread draw across the swash (shorter, sleeker)
tl.fromTo(
  swash,
  { strokeDashoffset: swashLen, opacity: 0.85 },
  { strokeDashoffset: 0, opacity: 0.95, duration: 1.5, ease: 'power3.out' },
  0.1
);

// Softer, fewer glints
tl.to(swash, { opacity: 1.0, duration: 0.06 }, 0.65);
tl.to(swash, { opacity: 0.94, duration: 0.10 }, 1.00);
tl.to(swash, { opacity: 1.00, duration: 0.08 }, 1.30);

  // Monogram reveal + soft glow settle
  tl.to(monoWrap, { opacity: 1, scale: 1.0, duration: 0.7, ease: 'power2.out' }, 1.05);
  tl.to(monoImg,  { filter: 'drop-shadow(0 2px 16px rgba(212,175,55,0.35))', duration: 0.4, ease: 'sine.out' }, '>-0.55');
  tl.to(monoImg,  { filter: 'drop-shadow(0 2px 10px rgba(212,175,55,0.22))', duration: 0.6, ease: 'sine.inOut' }, '>-0.15');

 // Thread retract
tl.to(swash, { strokeDashoffset: swashLen * 0.65, duration: 0.35, ease: 'power3.in' }, '>-0.1');
tl.to(swash, { opacity: 0, duration: 0.25, ease: 'sine.out' }, '>-0.15');

// NUCLEAR FIX: Force header visible immediately
tl.add(() => {
  // Remove loading flag first
  document.body.classList.remove('is-loading');
  document.body.classList.add('is-loaded');
  
  // Force header visible with direct style override
  const header = document.querySelector('.header');
  if (header) {
    header.style.opacity = '1';
    header.style.visibility = 'visible';
    header.style.pointerEvents = 'auto';
    header.style.display = 'block';
  }
}, '>-0.5');

// Hide loader after header is definitely visible
tl.add(() => {
  loader.classList.add('is-hidden');
  loader.style.pointerEvents = 'none';
  loader.style.zIndex = '-1';
}, '>+0.2');


  // Cinematic hero enrich
  if (heroImg) {
    tl.to(
      heroImg,
      { filter: 'saturate(1.0) contrast(1.05) brightness(0.95)', scale: 1.04, duration: 0.9 },
      '>-0.4'
    );
  }

  // Masked text reveals
  if (title)    tl.to(title,    { y: '0%', opacity: 1, duration: 0.7, ease: 'power3.out' }, '>-0.4');
  if (subtitle) tl.to(subtitle, { y: '0%', opacity: 1, duration: 0.7, ease: 'power3.out' }, '>-0.45');
  if (cta)      tl.to(cta,      { y: '0%', opacity: 1, duration: 0.7, ease: 'power3.out' }, '>-0.5');
});

// ======================= App Logic =======================
document.addEventListener('DOMContentLoaded', () => {
  const PRODUCTSGrid     = document.getElementById('PRODUCTS-grid');
  let cart = JSON.parse(localStorage.getItem('laadsaab_cart') || '[]');
function saveCart() { localStorage.setItem('laadsaab_cart', JSON.stringify(cart)); }


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

  if (PRODUCTSGrid) {
    PRODUCTSGrid.innerHTML = PRODUCTS.map(createProductCard).join('');
  }

  // --- ANIMATION OBSERVER ---
  const animatedCards = document.querySelectorAll('.product-card, .feature-card');
  if (animatedCards.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    animatedCards.forEach((card) => observer.observe(card));
  }

  // --- SHOPPING CART LOGIC ---
  const cartButton      = document.getElementById('cart-button');
  const cartSidebar     = document.getElementById('cart-sidebar');
  const closeCartButton = document.getElementById('close-cart-btn');
  const cartCountBadge  = document.getElementById('cart-count');
  const cartContent     = document.getElementById('cart-content');
  const cartSubtotalEl  = document.getElementById('cart-subtotal');
  const emptyCartMessage = cartContent ? cartContent.querySelector('.empty-cart-message') : null;

  const openCart  = () => { if (cartSidebar) cartSidebar.classList.add('is-open'); };
  const closeCart = () => { if (cartSidebar) cartSidebar.classList.remove('is-open'); };

  function updateCart() {
    if (!cartContent || !cartCountBadge || !cartSubtotalEl) return;

    if (cart.length === 0) {
      if (emptyCartMessage) emptyCartMessage.style.display = 'flex';
      const itemsWrapper = cartContent.querySelector('.cart-items-wrapper');
      if (itemsWrapper) itemsWrapper.remove();
    } else {
      if (emptyCartMessage) emptyCartMessage.style.display = 'none';
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
    cartCountBadge.textContent = String(totalItems);

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartSubtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  }

  function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) existingItem.quantity++;
    else cart.push({ ...product, quantity: 1 });
    updateCart();
  }

  // Bind cart open/close if elements exist
  if (cartButton)      cartButton.addEventListener('click', openCart);
  if (closeCartButton) closeCartButton.addEventListener('click', closeCart);

  // Delegate add-to-cart from grid
  if (PRODUCTSGrid) {
    PRODUCTSGrid.addEventListener('click', (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.classList.contains('add-to-cart-btn')) {
        const card = t.closest('.product-card');
        if (!card) return;
        const productId = parseInt(card.dataset.productId || '0', 10);
        if (!productId) return;
        addToCart(productId);
        openCart();
      }
      if (t.classList.contains('product-card__image')) {
        const card = t.closest('.product-card');
        if (!card) return;
        const productId = parseInt(card.dataset.productId || '0', 10);
        const product = PRODUCTS.find(p => p.id === productId);
        if (product) renderProductModal(product);
      }
    });
  }

  // Cart item interactions
  if (cartContent) {
    cartContent.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const cartItem = target.closest('.cart-item');
      if (!cartItem) return;

      const productId = parseInt(cartItem.getAttribute('data-id') || '0', 10);
      const itemInCart = cart.find(item => item.id === productId);
      if (!itemInCart) return;

      if (target.closest('.remove-btn')) {
        cart = cart.filter(item => item.id !== productId);
      } else if (target.getAttribute('data-action') === 'increase') {
        itemInCart.quantity++;
      } else if (target.getAttribute('data-action') === 'decrease') {
        itemInCart.quantity--;
        if (itemInCart.quantity <= 0) {
          cart = cart.filter(item => item.id !== productId);
        }
      }
      updateCart();
    });
  }

  // ======================= Mobile Navigation Logic =======================
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav        = document.getElementById('mobile-nav');
  const mobileNavClose   = document.getElementById('mobile-nav-close');

  const openMobileNav  = () => { if (mobileNav) mobileNav.classList.add('is-open'); };
  const closeMobileNav = () => { if (mobileNav) mobileNav.classList.remove('is-open'); };

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileNav);
  if (mobileNavClose)   mobileNavClose.addEventListener('click', closeMobileNav);
  document.querySelectorAll('.mobile-nav__link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // ======================= Command Palette Search Logic =======================
  const searchButton  = document.getElementById('searchBtn');
  const searchPalette = document.getElementById('search-palette');
  const searchInput   = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const mainContent   = document.querySelector('main');
  const header        = document.querySelector('header');

  const animatedPlaceholders = [
    "Search for Anarkali...",
    "Try 'Festive Wear'",
    "Looking for Silk Kurtas?",
    "Search by color, e.g., 'Blue'"
  ];
  let placeholderIndex = 0, letterIndex = 0, currentPlaceholder = '';
  let isDeleting = false;
  let typingInterval;

  function typePlaceholder() {
    if (!searchInput) return;
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
        typingInterval = setInterval(typePlaceholder, 100);
      }, 2000);
    } else if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      placeholderIndex = (placeholderIndex + 1) % animatedPlaceholders.length;
      clearInterval(typingInterval);
      typingInterval = setInterval(typePlaceholder, 200);
    }
  }

  function openSearch() {
    if (!searchPalette || !mainContent || !header || !searchInput) return;
    searchPalette.classList.add('is-open');
    mainContent.classList.add('search-active');
    header.classList.add('search-active');
    setTimeout(() => {
      searchInput.focus();
      typingInterval = setInterval(typePlaceholder, 200);
    }, 400);
  }

  function closeSearch() {
    if (!searchPalette || !mainContent || !header || !searchInput || !searchResults) return;
    searchPalette.classList.remove('is-open');
    mainContent.classList.remove('search-active');
    header.classList.remove('search-active');
    searchInput.value = '';
    searchResults.innerHTML = '';
    clearInterval(typingInterval);
    searchInput.setAttribute('placeholder', '');
  }

  function handleSearch() {
    if (!searchInput || !searchResults) return;
    const query = searchInput.value.toLowerCase();
    if (query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }
    const filteredPRODUCTS = PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(query)
    );
    if (filteredPRODUCTS.length > 0) {
      searchResults.innerHTML = filteredPRODUCTS.map(product => `
        <a href="#" class="search-result-item" data-product-id="${product.id}">
          <img src="${product.image}" alt="${product.name}">
          <div>
            <div class="search-result-item__name">${product.name}</div>
            <div class="search-result-item__price">₹${product.price.toLocaleString('en-IN')}</div>
          </div>
        </a>
      `).join('');
    } else {
      searchResults.innerHTML = '<p style="color: var(--color-text-muted); text-align: center; padding: 24px;">No PRODUCTS found.</p>';
    }
  }

  if (searchButton)  searchButton.addEventListener('click', openSearch);
  if (searchInput)   searchInput.addEventListener('input', handleSearch);
  if (window && searchPalette) {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchPalette.classList.contains('is-open')) {
        closeSearch();
      }
    });
  }
  if (searchPalette) {
    searchPalette.addEventListener('click', (e) => {
      if (e.target === searchPalette) closeSearch();
    });
  }

  // ======================= Product Detail Modal Logic =======================
  const modalOverlay = document.getElementById('modal-overlay');
  const productModal = document.getElementById('product-modal');

  function openModal() {
    if (!modalOverlay || !productModal) return;
    modalOverlay.classList.add('is-open');
    productModal.classList.add('is-open');
  }
  function closeModal() {
    if (!modalOverlay || !productModal) return;
    modalOverlay.classList.remove('is-open');
    productModal.classList.remove('is-open');
  }

  function renderProductModal(product) {
    if (!productModal) return;
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
  const checkoutModal   = document.getElementById('checkout-modal');
  const checkoutOverlay = document.getElementById('checkout-overlay');
  const closeCheckoutBtn = document.getElementById('close-checkout-btn');
  const cartCheckoutBtn  = document.querySelector('.cart-checkout-btn');
  const summaryItemsEl   = document.getElementById('summary-items');
  const summaryTotalEl   = document.getElementById('summary-total');

  function openCheckoutModal() {
    if (!summaryItemsEl || !summaryTotalEl || !checkoutOverlay || !checkoutModal) return;
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
    closeCart();
    checkoutOverlay.classList.add('is-open');
    checkoutModal.classList.add('is-open');
  }

  function closeCheckoutModal() {
    if (!checkoutOverlay || !checkoutModal) return;
    checkoutOverlay.classList.remove('is-open');
    checkoutModal.classList.remove('is-open');
  }

  if (cartCheckoutBtn)  cartCheckoutBtn.addEventListener('click', openCheckoutModal);
  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
  if (checkoutOverlay)  checkoutOverlay.addEventListener('click', closeCheckoutModal);

  // Guard all delegated listeners with container presence
  if (PRODUCTSGrid) {
    PRODUCTSGrid.addEventListener('click', (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.classList.contains('product-card__image')) {
        const card = t.closest('.product-card');
        if (!card) return;
        const productId = parseInt(card.dataset.productId || '0', 10);
        const product = PRODUCTS.find(p => p.id === productId);
        if (product) renderProductModal(product);
      }
    });
  }

  if (productModal) {
    productModal.addEventListener('click', (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest('#close-modal-btn')) {
        closeModal();
      }
      if (t.classList.contains('modal-add-to-cart-btn')) {
        const productId = parseInt(t.getAttribute('data-id') || '0', 10);
        if (productId) {
          addToCart(productId);
          closeModal();
          openCart();
        }
      }
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // --- INITIAL CALLS ---
  updateCart(); // Safe even if some cart DOM is missing (it checks first)
});
