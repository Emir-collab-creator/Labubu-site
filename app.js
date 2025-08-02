// Theme toggle logic
document.addEventListener('DOMContentLoaded', function() {

    // Allow only digits, spaces and plus in all phone inputs
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^\d+ ]/g, '');
        });
    });
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;
    // Apply saved theme
    if (localStorage.getItem('labubu_theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeBtn.textContent = '☀️';
    }
    themeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeBtn.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('labubu_theme', isDark ? 'dark' : 'light');
    });
});
// Add to cart logic for catalog
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const toy = btn.getAttribute('data-toy');
            let cart = JSON.parse(localStorage.getItem('labubu_cart') || '[]');
            cart.push({ toy, date: new Date().toISOString() });
            localStorage.setItem('labubu_cart', JSON.stringify(cart));
            showCartMessage('Added to cart!');
        });
    });
    function showCartMessage(msg) {
        let el = document.createElement('div');
        el.textContent = msg;
        el.style.position = 'fixed';
        el.style.top = '30px';
        el.style.right = '30px';
        el.style.background = document.body.classList.contains('dark-theme') ? '#23243a' : '#7c3aed';
        el.style.color = '#fff';
        el.style.padding = '16px 28px';
        el.style.borderRadius = '16px';
        el.style.fontSize = '1.1rem';
        el.style.boxShadow = document.body.classList.contains('dark-theme') ? '0 2px 12px #0008' : '0 2px 12px #7c3aed55';
        el.style.zIndex = 9999;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 2000);
    }
});
document.addEventListener('DOMContentLoaded', function() {

    // Handle all product order forms
    document.querySelectorAll('.product-order-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = form.querySelector('input[type="text"]').value.trim();
            const phone = form.querySelector('input[type="tel"]').value.trim();
            // Try to get toy name from context or fallback
            let toy = '';
            const toyHeader = form.closest('.order').previousElementSibling?.querySelector('h2');
            if (toyHeader) {
                toy = toyHeader.textContent.trim();
            } else {
                toy = 'Labubu';
            }
            if (!name || !phone) return;
            let cart = JSON.parse(localStorage.getItem('labubu_cart') || '[]');
            cart.push({ name, phone, toy, date: new Date().toISOString() });
            localStorage.setItem('labubu_cart', JSON.stringify(cart));
            showCartMessage('Added to cart!');
            form.reset();
        });
    });

    // Main page order form (with select)
    const mainForm = document.querySelector('.order form:not(.product-order-form)');
    if (mainForm) {
        mainForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = mainForm.querySelector('input[type="text"]').value.trim();
            const phone = mainForm.querySelector('input[type="tel"]').value.trim();
            const toy = mainForm.querySelector('select').value;
            if (!name || !phone || !toy) return;
            let cart = JSON.parse(localStorage.getItem('labubu_cart') || '[]');
            cart.push({ name, phone, toy, date: new Date().toISOString() });
            localStorage.setItem('labubu_cart', JSON.stringify(cart));
            showCartMessage('Added to cart!');
            mainForm.reset();
        });
    }

    function showCartMessage(msg) {
        let el = document.createElement('div');
        el.textContent = msg;
        el.style.position = 'fixed';
        el.style.top = '30px';
        el.style.right = '30px';
        el.style.background = '#7c3aed';
        el.style.color = '#fff';
        el.style.padding = '16px 28px';
        el.style.borderRadius = '16px';
        el.style.fontSize = '1.1rem';
        el.style.boxShadow = '0 2px 12px #7c3aed55';
        el.style.zIndex = 9999;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 2000);
    }
});
