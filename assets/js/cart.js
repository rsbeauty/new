// RS BEAUTY PARLOUR - PERSISTENT CART & FULL WHATSAPP BOOKING SYSTEM
const CART_KEY = 'rs_beauty_cart_v1';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}

function addToCart(id, name, price, category) {
  const cart = getCart();
  const existing = cart.find(item => String(item.id) === String(id));
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: String(id),
      name: name,
      price: Number(price),
      category: category || 'Salon',
      qty: 1
    });
  }
  saveCart(cart);
  showToast('"' + name + '" added to cart!');
}

function updateQty(id, delta) {
  let cart = getCart();
  const idx = cart.findIndex(item => String(item.id) === String(id));
  if (idx !== -1) {
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) {
      cart.splice(idx, 1);
    }
    saveCart(cart);
  }
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartUI();
}

function showToast(msg) {
  let toast = document.getElementById('rs-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'rs-toast';
    toast.className = 'fixed top-16 right-4 bg-pink-700 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg z-50 transition-opacity duration-300';
    document.body.appendChild(toast);
  }
  toast.innerText = msg;
  toast.style.opacity = '1';
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => { toast.style.opacity = '0'; }, 2000);
}

function injectCartDrawer() {
  if (document.getElementById('rs-cart-drawer')) return;
  const drawerHTML = `
  <div id="floating-cart-bar" onclick="openCartDrawer()" class="hidden fixed bottom-16 md:bottom-5 inset-x-3 md:inset-x-auto md:right-6 md:w-96 bg-pink-700 hover:bg-pink-800 text-white px-4 py-3 rounded-2xl shadow-2xl z-40 cursor-pointer flex justify-between items-center transition">
    <div class="flex items-center gap-2.5">
      <span class="bg-white text-pink-700 font-bold text-xs px-2.5 py-1 rounded-full" id="float-count">0 Items</span>
      <span class="font-bold text-sm" id="float-total">₹0</span>
    </div>
    <span class="text-xs font-bold uppercase tracking-wider">View Cart & Book →</span>
  </div>

  <div id="rs-cart-drawer" class="fixed inset-0 bg-black/60 hidden justify-end z-50">
    <div class="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl overflow-hidden">
      <div class="p-4 bg-pink-600 text-white flex justify-between items-center">
        <div>
          <h2 class="font-bold text-lg leading-none">Your Salon Cart</h2>
          <p class="text-[11px] text-pink-100 mt-1">Select multiple services & book together on WhatsApp</p>
        </div>
        <button onclick="closeCartDrawer()" class="text-2xl font-bold leading-none px-2">×</button>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <div id="cart-items-container" class="space-y-2.5"></div>

        <div id="cart-checkout-form" class="bg-pink-50 p-4 rounded-xl border border-pink-100 space-y-2.5">
          <h3 class="font-bold text-sm text-pink-800">Customer & Home Visit Details</h3>
          <input type="text" id="c-name" placeholder="Full Name *" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs bg-white">
          <input type="tel" id="c-phone" placeholder="WhatsApp / Mobile Number *" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs bg-white">
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-[10px] text-gray-600 font-semibold">Preferred Date *</label>
              <input type="date" id="c-date" class="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs bg-white">
            </div>
            <div>
              <label class="text-[10px] text-gray-600 font-semibold">Preferred Time *</label>
              <input type="time" id="c-time" class="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs bg-white">
            </div>
          </div>
          <textarea id="c-address" rows="2" placeholder="Complete Home Address (House No, Street, Landmark, Area) *" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs bg-white"></textarea>
          <input type="text" id="c-note" placeholder="Special Note / Skin Type (Optional)" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs bg-white">
        </div>
      </div>

      <div class="p-4 border-t border-pink-100 bg-white space-y-2.5">
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-600 font-medium">Total Estimated Amount:</span>
          <span class="text-xl font-bold text-pink-700" id="cart-grand-total">₹0</span>
        </div>
        <button onclick="sendCartToWhatsApp()" class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold text-sm shadow-lg">
          Send Full Order on WhatsApp
        </button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', drawerHTML);

  const dateInput = document.getElementById('c-date');
  if (dateInput) dateInput.valueAsDate = new Date();
}

async function openCartDrawer() {
  injectCartDrawer();
  updateCartUI();
  document.getElementById('rs-cart-drawer').classList.replace('hidden', 'flex');

  if (typeof sb !== 'undefined' && sb) {
    const { data: { session } } = await sb.auth.getSession();
    if (session) {
      const nameEl = document.getElementById('c-name');
      const phoneEl = document.getElementById('c-phone');
      if (nameEl && !nameEl.value) nameEl.value = session.user.user_metadata?.full_name || '';
      if (phoneEl && !phoneEl.value) phoneEl.value = session.user.user_metadata?.phone || '';
    }
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('rs-cart-drawer');
  if (drawer) drawer.classList.replace('flex', 'hidden');
}

function updateCartUI() {
  injectCartDrawer();
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  document.querySelectorAll('.cart-badge').forEach(b => {
    b.innerText = totalQty;
    if (totalQty > 0) b.classList.remove('hidden');
    else b.classList.add('hidden');
  });

  const floatBar = document.getElementById('floating-cart-bar');
  if (floatBar) {
    if (totalQty > 0) {
      floatBar.classList.remove('hidden');
      document.getElementById('float-count').innerText = totalQty + ' Service' + (totalQty > 1 ? 's' : '');
      document.getElementById('float-total').innerText = '₹' + totalAmount;
    } else {
      floatBar.classList.add('hidden');
    }
  }

  const container = document.getElementById('cart-items-container');
  const checkoutForm = document.getElementById('cart-checkout-form');
  if (container) {
    if (cart.length === 0) {
      container.innerHTML = '<div class="text-center py-8 text-gray-400 text-xs">Aapka cart abhi khaali hai.<br>Menu se services add karein!</div>';
      if (checkoutForm) checkoutForm.classList.add('hidden');
    } else {
      if (checkoutForm) checkoutForm.classList.remove('hidden');
      container.innerHTML = cart.map((item, i) => `
        <div class="flex justify-between items-center bg-white border border-pink-100 p-3 rounded-xl shadow-sm">
          <div class="pr-2">
            <span class="text-[10px] bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-semibold">${item.category}</span>
            <h4 class="font-bold text-xs text-gray-800 mt-1">${i + 1}. ${item.name}</h4>
            <p class="text-xs text-pink-600 font-semibold">₹${item.price} × ${item.qty} = ₹${item.price * item.qty}</p>
          </div>
          <div class="flex items-center gap-1.5">
            <button onclick="updateQty('${item.id}', -1)" class="w-7 h-7 rounded-lg bg-pink-100 text-pink-800 font-bold text-sm">-</button>
            <span class="text-xs font-bold w-5 text-center">${item.qty}</span>
            <button onclick="updateQty('${item.id}', 1)" class="w-7 h-7 rounded-lg bg-pink-600 text-white font-bold text-sm">+</button>
          </div>
        </div>
      `).join('');
    }
  }

  const grandTotalEl = document.getElementById('cart-grand-total');
  if (grandTotalEl) grandTotalEl.innerText = '₹' + totalAmount;
}

async function sendCartToWhatsApp() {
  const cart = getCart();
  if (cart.length === 0) return alert('Pehle cart mein kam se kam 1 service add karein!');

  const name = document.getElementById('c-name').value.trim();
  const phone = document.getElementById('c-phone').value.trim();
  const date = document.getElementById('c-date').value;
  const time = document.getElementById('c-time').value;
  const address = document.getElementById('c-address').value.trim();
  const note = document.getElementById('c-note').value.trim();

  if (!name || !phone || !date || !time || !address) {
    return alert('Kripya Name, Mobile Number, Date, Time aur Home Address sabhi details bharein!');
  }

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const serviceSummary = cart.map(item => item.name + ' (x' + item.qty + ')').join(', ');
  const bookingDateTime = date + ' ' + time;

  if (typeof sb !== 'undefined' && sb) {
    let userId = null;
    const { data: { session } } = await sb.auth.getSession();
    if (session) userId = session.user.id;

    await sb.from('bookings').insert([{
      user_id: userId,
      customer_name: name,
      phone: phone,
      address: note ? address + ' [Note: ' + note + ']' : address,
      service_name: serviceSummary + ' | Total: ₹' + totalAmount,
      booking_date: bookingDateTime,
      status: 'Pending'
    }]);
  }

  const itemsLines = cart.map((item, idx) =>
    (idx + 1) + '. *' + item.name + '* (' + item.category + ')\n   Qty: ' + item.qty + ' × ₹' + item.price + ' = *₹' + (item.price * item.qty) + '*'
  ).join('\n');

  const fullMessage =
    '🌸 *RS BEAUTY PARLOUR — NEW HOME SERVICE BOOKING* 🌸\n' +
    '_(Strictly for Girls & Women)_\n\n' +
    '👤 *Customer Details:*\n' +
    '• *Name:* ' + name + '\n' +
    '• *Mobile:* ' + phone + '\n' +
    '• *Date & Time:* ' + date + ' at ' + time + '\n' +
    '• *Home Address:* ' + address + '\n' +
    (note ? '• *Note:* ' + note + '\n' : '') +
    '\n📋 *Selected Services List:*\n' +
    itemsLines + '\n\n' +
    '💰 *Grand Total: ₹' + totalAmount + '*\n' +
    '_(Home Service Doorstep Visit)_\n\n' +
    'Please confirm my appointment!';

  const waUrl = 'https://wa.me/919625447178?text=' + encodeURIComponent(fullMessage);
  clearCart();
  closeCartDrawer();
  window.open(waUrl, '_blank');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateCartUI);
} else {
  updateCartUI();
}
