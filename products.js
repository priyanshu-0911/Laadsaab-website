// ======================= All Products Page Logic =======================
import { PRODUCTS } from './products-data.js';

document.addEventListener('DOMContentLoaded', () => {
  const productsGrid   = document.getElementById('all-products-grid');
  const categoryWrap   = document.getElementById('category-filters');
  const sizeWrap       = document.getElementById('size-filters');
  const priceRange     = document.getElementById('price-range');
  const priceValue     = document.getElementById('price-value');

  if (!productsGrid) return;

  const formatINR = (n) => `₹${n.toLocaleString('en-IN')}`;

  function card(p) {
    return `
      <article class="product-card" data-product-id="${p.id}">
        <div class="product-card__image-wrapper">
          <img src="${p.image}" alt="${p.name}" class="product-card__image">
          ${p.isNew ? '<div class="product-card__badge">New</div>' : ''}
        </div>
        <div class="product-card__content">
          <h3 class="product-card__name">${p.name}</h3>
          <div class="product-card__price">
            <span class="price">${formatINR(p.price)}</span>
            <span class="price--original">${formatINR(p.originalPrice)}</span>
          </div>
          <button class="add-to-cart-btn">Add to Cart</button>
        </div>
      </article>
    `;
  }

  function render(list) {
    productsGrid.innerHTML = list.map(card).join('');
  }

  // Initial render
  render(PRODUCTS);

  // Filter state
  const state = {
    category: '',
    sizes: new Set(),
    maxPrice: 5000
  };

  // Category (radio)
  if (categoryWrap) {
    categoryWrap.addEventListener('change', (e) => {
      const v = (e.target && e.target.value) || '';
      state.category = v;
      apply();
    });
  }

  // Sizes (checkboxes)
  if (sizeWrap) {
    sizeWrap.addEventListener('change', (e) => {
      if (e.target && e.target.type === 'checkbox') {
        const v = e.target.value;
        if (e.target.checked) state.sizes.add(v);
        else state.sizes.delete(v);
        apply();
      }
    });
  }

  // Price
  if (priceRange && priceValue) {
    priceRange.addEventListener('input', () => {
      state.maxPrice = parseInt(priceRange.value, 10) || 5000;
      priceValue.textContent = `₹${state.maxPrice.toLocaleString('en-IN')}`;
      apply();
    });
  }

  function apply() {
    // If multiple sizes selected, keep any product that includes any selected size
    const list = PRODUCTS.filter(p => {
      const catOK = !state.category || p.category === state.category;
      const priceOK = p.price <= state.maxPrice;
      const sizeOK = state.sizes.size === 0 || p.sizes?.some(s => state.sizes.has(s));
      return catOK && priceOK && sizeOK;
    });
    render(list);
  }
});
export const findProduct = (id) => PRODUCTS.find(p => p.id === id);

export const filterProducts = ({ category = '', size = '', maxPrice = Infinity, query = '' }) => {
  return PRODUCTS.filter(p => {
    const catOK   = !category || p.category === category;
    const sizeOK  = !size || (p.sizes || []).includes(size);
    const priceOK = p.price <= maxPrice;
    const queryOK = !query || p.name.toLowerCase().includes(query.toLowerCase());
    return catOK && sizeOK && priceOK && queryOK;
  });
};
