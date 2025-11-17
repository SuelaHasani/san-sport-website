/* Checkout page logic
 - Loads cart from localStorage key used by the shop: 'san_sport_cart_v1'
 - Uses an internal products catalog (duplicate of shop catalog) to show names/prices
 - Validates form, simulates payment, clears cart and shows confirmation
*/

$(function () {
  const STORAGE_KEY = 'san_sport_cart_v1';

  // Product catalog (keep synced with shop.js if you edit the shop)
  const products = [
    { id: 'mu_home', name: 'Man United Home Jersey', price: 69.99 },
    { id: 'psg_home', name: 'PSG Home Jersey', price: 74.99 },
    { id: 'barca_kit', name: 'FC Barcelona Jersey', price: 74.99 },
    { id: 'f1_jacket', name: 'F1 Team Softshell Jacket', price: 129.99 },
    { id: 'f1_cap', name: 'F1 Team Cap', price: 24.99 },
    { id: 'fan_scarf', name: 'Fan Scarf', price: 14.99 },
    { id: 'match_ticket', name: 'Match Ticket (Digital)', price: 49.00 }
  ];

  function loadCart() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
  }

  function cartEntries(cart) {
    return Object.entries(cart).map(([id, qty]) => {
      const p = products.find(x => x.id === id);
      return {
        id,
        name: p ? p.name : id,
        price: p ? p.price : 0,
        qty
      };
    });
  }

  function renderCart() {
    const cart = loadCart();
    const entries = cartEntries(cart);
    const $list = $('#checkout-items').empty();
    if (entries.length === 0) {
      $list.append('<p>Your cart is empty. Add items from the shop first.</p>');
      $('#place-order').prop('disabled', true);
      updateTotals(0);
      return;
    }

    $('#place-order').prop('disabled', false);

    entries.forEach(item => {
      const row = $(`
        <div class="checkout-item" data-id="${item.id}">
          <div class="ci-left">
            <strong>${escapeHtml(item.name)}</strong>
            <div class="ci-qty">Qty: ${item.qty}</div>
          </div>
          <div class="ci-right">$${(item.price * item.qty).toFixed(2)}</div>
        </div>
      `);
      $list.append(row);
    });

    const subtotal = entries.reduce((s, it) => s + it.price * it.qty, 0);
    updateTotals(subtotal);
  }

  function updateTotals(subtotal) {
    const shipping = subtotal > 0 && subtotal < 50 ? 5.00 : 0.00; // example rule
    const total = subtotal + shipping;
    $('#subtotal').text(`$${subtotal.toFixed(2)}`);
    $('#shipping').text(`$${shipping.toFixed(2)}`);
    $('#grand-total').text(`$${total.toFixed(2)}`);
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  }

  // Form validation (basic)
  function validateForm() {
    let valid = true;
    $('#checkout-form [required]').each(function () {
      if (!$(this).val() || $(this).val().trim() === '') {
        $(this).addClass('input-error');
        valid = false;
      } else {
        $(this).removeClass('input-error');
      }
    });
    const email = $('#email').val();
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      $('#email').addClass('input-error');
      valid = false;
    }
    return valid;
  }

  function placeOrder() {
    if (!validateForm()) {
      showMessage('Please complete the required fields.', 'error');
      return;
    }

    const cart = loadCart();
    if (Object.keys(cart).length === 0) {
      showMessage('Your cart is empty.', 'error');
      return;
    }

    // simulate processing
    $('#place-order').prop('disabled', true).text('Processing...');
    setTimeout(() => {
      // clear cart and show confirmation
      localStorage.removeItem(STORAGE_KEY);
      renderCart();
      $('#checkout-form')[0].reset();
      $('#place-order').text('Place Order').prop('disabled', false);
      showMessage('Order placed successfully. A confirmation email would be sent (simulation).', 'success');
    }, 900);
  }

  function showMessage(text, type='info') {
    const $m = $('#checkout-message');
    $m.removeClass('error success info').addClass(type).text(text).slideDown(180);
    setTimeout(() => $m.slideUp(400), 6000);
  }

  // events
  $('#place-order').on('click', placeOrder);
  $('#cancel-order').on('click', function () { window.location.href = 'shop.html'; });

  // initial render
  renderCart();
});