/* Checkout page script
   - Reads the cart from localStorage (same key as shop.js)
   - Renders a simple order summary and simulates placing an order
   - Validates required fields before simulating order success
*/

$(function () {
  const STORAGE_KEY = 'san_sport_cart_v1';

  // Minimal product map (keep synced with shop.js catalog if you change IDs/prices)
  const products = {
    mu_home: { name: 'Man United Home Jersey', price: 69.99 },
    psg_home: { name: 'PSG Home Jersey', price: 74.99 },
    barca_kit: { name: 'FC Barcelona Jersey', price: 74.99 },
    f1_jacket: { name: 'F1 Team Softshell Jacket', price: 129.99 },
    f1_cap: { name: 'F1 Team Cap', price: 24.99 },
    fan_scarf: { name: 'Fan Scarf', price: 14.99 },
    match_ticket: { name: 'Match Ticket (Digital)', price: 49.00 }
  };

  // Read cart from storage and convert to array of items
  function loadCartEntries() {
    try {
      const cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      return Object.entries(cart).map(([id, qty]) => {
        const p = products[id] || { name: id, price: 0 };
        return { id, name: p.name, price: p.price, qty };
      });
    } catch (e) {
      return [];
    }
  }

  // Render checkout summary
  function renderSummary() {
    const entries = loadCartEntries();
    const $list = $('#checkout-items').empty();
    if (!entries.length) {
      $list.append('<p>Your cart is empty. Add items from the shop first.</p>');
      $('#place-order').prop('disabled', true);
      updateTotals(0);
      return;
    }
    $('#place-order').prop('disabled', false);
    entries.forEach(it => {
      $list.append(`<div class="checkout-item" data-id="${it.id}">
        <div>${escapeHtml(it.name)} <small>×${it.qty}</small></div>
        <div>$${(it.price * it.qty).toFixed(2)}</div>
      </div>`);
    });
    const subtotal = entries.reduce((s, it) => s + it.price * it.qty, 0);
    updateTotals(subtotal);
  }

  // Update displayed totals (simple shipping rule)
  function updateTotals(subtotal) {
    const shipping = subtotal > 0 && subtotal < 50 ? 5.00 : 0.00;
    const total = subtotal + shipping;
    $('#subtotal').text(`$${subtotal.toFixed(2)}`);
    $('#shipping').text(`$${shipping.toFixed(2)}`);
    $('#grand-total').text(`$${total.toFixed(2)}`);
  }

  // Basic HTML-escaping helper
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  }

  // Form validation for required fields
  function validateForm() {
    let ok = true;
    $('#checkout-form [required]').each(function () {
      if (!$(this).val() || !$(this).val().trim()) {
        $(this).addClass('input-error');
        ok = false;
      } else {
        $(this).removeClass('input-error');
      }
    });
    const email = $('#email').val();
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      $('#email').addClass('input-error');
      ok = false;
    }
    return ok;
  }

  // Place order (simulation)
  $('#place-order').on('click', function () {
    if (!validateForm()) {
      $('#checkout-message').removeClass().addClass('checkout-message error').text('Please complete the required fields.').show();
      return;
    }
    const entries = loadCartEntries();
    if (!entries.length) {
      $('#checkout-message').removeClass().addClass('checkout-message error').text('Cart is empty.').show();
      return;
    }

    // Simulate processing delay
    $(this).prop('disabled', true).text('Processing...');
    setTimeout(() => {
      localStorage.removeItem(STORAGE_KEY); // clear cart after "success"
      renderSummary();
      $('#checkout-form')[0].reset();
      $('#checkout-message').removeClass().addClass('checkout-message success').text('Order placed (simulation). Thank you!').show();
      $('#place-order').prop('disabled', false).text('Place Order');
    }, 900);
  });

  // Cancel button returns to shop
  $('#cancel-order').on('click', function () {
    window.location.href = 'shop.html';
  });

  // Initial render on load
  renderSummary();
});