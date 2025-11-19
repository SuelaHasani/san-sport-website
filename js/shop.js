/* Shop script (jQuery)
   - Holds the products array (catalog)
   - Renders products into #product-list
   - Manages cart state (stored in localStorage under key san_sport_cart_v1)
   - Provides add/remove/qty, cart UI (panel), and a simulated checkout
*/

$(function () {
  const STORAGE_KEY = 'san_sport_cart_v1';

  // Product catalog: edit/add items here; images can be added later
  const products = [
    { id: 'mu_home', name: 'Man United Home Jersey', team: 'Manchester United', category: 'Football', price: 69.99, image: 'images/jersey-mu.jpg' },
    { id: 'psg_home', name: 'PSG Home Jersey', team: 'Paris Saint-Germain', category: 'Football', price: 74.99, image: 'images/jersey-psg.jpg' },
    { id: 'barca_kit', name: 'FC Barcelona Jersey', team: 'Barcelona', category: 'Football', price: 74.99, image: 'images/jersey-barca.jpg' },
    { id: 'f1_jacket', name: 'F1 Team Softshell Jacket', team: 'F1 - Racing', category: 'F1', price: 129.99, image: 'images/jacket-f1.jpg' },
    { id: 'f1_cap', name: 'F1 Team Cap', team: 'F1 - Racing', category: 'F1', price: 24.99, image: 'images/cap-f1.jpg' },
    { id: 'fan_scarf', name: 'Fan Scarf', team: 'Merch', category: 'Accessory', price: 14.99, image: 'images/scarf.jpg' },
    { id: 'match_ticket', name: 'Match Ticket (Digital)', team: 'Tickets', category: 'Ticket', price: 49.00, image: 'images/ticket.jpg' }
  ];

  // Load persisted cart or start with empty object
  let cart = loadCart();

  // Helpers for persistence and simple calculations
  function loadCart() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveCart() { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }
  function cartCount() { return Object.values(cart).reduce((s, q) => s + q, 0); }
  function cartTotal() {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const p = products.find(x => x.id === id);
      return sum + (p ? p.price * qty : 0);
    }, 0);
  }

  // Render catalog into the product grid (#product-list)
  function renderProducts() {
    const $list = $('#product-list').empty();
    products.forEach(p => {
      const $card = $(`
        <article class="shop-product">
          <div class="shop-img-wrap">
            <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/600x400?text=No+Image'">
          </div>
          <div class="shop-body">
            <h3 class="shop-title">${p.name}</h3>
            <div class="shop-meta">${p.team} • ${p.category}</div>
            <div class="shop-bottom">
              <div class="shop-price">$${p.price.toFixed(2)}</div>
              <div class="shop-actions">
                <button class="btn primary btn-add" data-id="${p.id}">Add</button>
                <button class="btn muted btn-info" data-id="${p.id}">Info</button>
              </div>
            </div>
          </div>
        </article>
      `);
      $list.append($card);
    });
  }

  // Render cart panel contents
  function renderCart() {
    $('#cart-count').text(cartCount());
    $('#cart-total').text(cartTotal().toFixed(2));
    const $items = $('#cart-items').empty();
    if (cartCount() === 0) {
      $items.append('<p class="cart-empty">Your cart is empty.</p>');
      return;
    }
    Object.entries(cart).forEach(([id, qty]) => {
      const p = products.find(x => x.id === id);
      if (!p) return;
      const $item = $(`
        <div class="cart-item" data-id="${id}">
          <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/120?text=No+Image'">
          <div class="info">
            <div style="display:flex;justify-content:space-between;gap:8px">
              <strong>${p.name}</strong>
              <div style="font-weight:700">$${(p.price * qty).toFixed(2)}</div>
            </div>
            <div class="meta" style="color:#666;font-size:.9rem">${p.team}</div>
            <div class="qty-controls">
              <button class="qty-decrease" title="Decrease">-</button>
              <div style="min-width:28px;text-align:center;">${qty}</div>
              <button class="qty-increase" title="Increase">+</button>
              <button class="btn muted btn-remove" style="margin-left:auto">Remove</button>
            </div>
          </div>
        </div>
      `);
      $items.append($item);
    });
  }

  // Cart manipulation functions
  function addToCart(id, amount = 1) {
    cart[id] = (cart[id] || 0) + amount;
    saveCart();
    renderCart();
  }
  function setQty(id, qty) {
    if (qty <= 0) delete cart[id];
    else cart[id] = qty;
    saveCart();
    renderCart();
  }
  function removeFromCart(id) {
    delete cart[id];
    saveCart();
    renderCart();
  }
  function clearCart() {
    cart = {};
    saveCart();
    renderCart();
  }

  // UI controls for cart panel (open/close)
  function openCart() {
    $('#cart-panel').addClass('open');
    $('#cart-backdrop').addClass('show');
    renderCart();
  }
  function closeCart() {
    $('#cart-panel').removeClass('open');
    $('#cart-backdrop').removeClass('show');
  }

  // Event bindings (delegated where appropriate)
  $(document).on('click', '.btn-add', function () {
    const id = $(this).data('id');
    addToCart(id, 1);
    $('#cart-count').addClass('pulse');
    setTimeout(() => $('#cart-count').removeClass('pulse'), 400);
  });

  $(document).on('click', '.btn-info', function () {
    const id = $(this).data('id');
    const p = products.find(x => x.id === id);
    if (p) alert(`${p.name}\n\nTeam: ${p.team}\nCategory: ${p.category}\nPrice: $${p.price.toFixed(2)}`);
  });

  $('#open-cart').on('click', openCart);
  $('#close-cart').on('click', closeCart);
  $('#cart-backdrop').on('click', closeCart);

  $('#cart-items').on('click', '.qty-increase', function () {
    const id = $(this).closest('.cart-item').data('id');
    setQty(id, (cart[id] || 0) + 1);
  });
  $('#cart-items').on('click', '.qty-decrease', function () {
    const id = $(this).closest('.cart-item').data('id');
    setQty(id, (cart[id] || 0) - 1);
  });
  $('#cart-items').on('click', '.btn-remove', function () {
    const id = $(this).closest('.cart-item').data('id');
    removeFromCart(id);
  });

  $('#clear-cart').on('click', function () {
    if (confirm('Clear your cart?')) clearCart();
  });

  $('#checkout').on('click', function () {
    if (cartCount() === 0) {
      alert('Cart is empty.');
      return;
    }
    // Simple simulated checkout flow
    const total = cartTotal().toFixed(2);
    if (confirm(`Proceed to checkout. Total: $${total}`)) {
      alert('Thank you! Your order is placed (simulation).');
      clearCart();
      closeCart();
      // Optionally redirect to checkout page:
      // window.location.href = 'checkout.html';
    }
  });

  // Initial render on page load
  renderProducts();
  renderCart();

  // Expose for debugging in console: window.shop
  window.shop = { products, cart, addToCart, setQty, removeFromCart, clearCart };
});

