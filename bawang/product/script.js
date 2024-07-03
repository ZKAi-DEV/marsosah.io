document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartElement = document.getElementById('cart');
    const cartCountElement = document.getElementById('cart-count'); // Tambahkan ini
    const cartListElement = document.getElementById('cart-list');
    const cartItemsSection = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const checkoutButton = document.createElement('button');
    checkoutButton.textContent = 'Checkout';
    checkoutButton.addEventListener('click', () => {
        alert(`Total pembayaran: ${totalPriceElement.textContent}\nLakukan pembayaran sekarang.`);

        const ownerPhoneNumber = '6285712354914'; // Ganti dengan nomor WhatsApp owner
        const productDetails = cart.map(item => `${item.name} (x${item.quantity})`).join(', ');
        const message = `Halo, saya ingin menyelesaikan pembayaran dengan total ${totalPriceElement.textContent}. Produk yang dipilih: ${productDetails}.`;
        const whatsappUrl = `https://wa.me/${ownerPhoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
        // Tambahkan logika pembayaran di sini

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product');
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.getAttribute('data-name');
            let productPrice = parseFloat(productElement.getAttribute('data-price'));

            // Ubah harga produk sesuai dengan ID
            switch (productId) {
                case '1':
                    productPrice = 50000;
                    break;
                case '2':
                    productPrice = 100000;
                    break;
                case '3':
                    productPrice = 150000;
                    break;
                case '4':
                    productPrice = 200000;
                    break;
                case '5':
                    productPrice = 250000;
                    break;
                case '6':
                    productPrice = 300000;
                    break;
                case '7':
                    productPrice = 50000;
                    break;
                case '8':
                    productPrice = 100000;
                    break;
                case '9':
                    productPrice = 150000;
                    break;
                case '10':
                    productPrice = 200000;
                    break;
                case '11':
                    productPrice = 250000;
                    break;
                case '12':
                    productPrice = 300000;
                    break;
            }

            const existingProduct = cart.find(item => item.id === productId);
            if (existingProduct) {
                existingProduct.quantity += 1; // Tambahkan kuantitas produk
                existingProduct.price += productPrice; // Tambahkan harga produk
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }
            updateCart();
        });
    });

    cartElement.addEventListener('click', () => {
        cartListElement.innerHTML = '';
        let totalPrice = 0;
        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('cart-item'); // Tambahkan kelas CSS
            listItem.textContent = `${item.name} - ${item.price.toLocaleString('id-ID')} (x${item.quantity})`;

            const addButton = document.createElement('button');
            addButton.textContent = '+';
            addButton.classList.add('cart-button'); // Tambahkan kelas CSS
            addButton.addEventListener('click', () => {
                item.quantity += 1;
                item.price += item.price / (item.quantity - 1); // Tambahkan harga produk
                updateCart();
            });

            const removeButton = document.createElement('button');
            removeButton.textContent = '-';
            removeButton.classList.add('cart-button'); // Tambahkan kelas CSS
            removeButton.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    item.price -= item.price / (item.quantity + 1); // Kurangi harga produk
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Remove';
            deleteButton.classList.add('cart-button'); // Tambahkan kelas CSS
            deleteButton.addEventListener('click', () => {
                cart.splice(index, 1);
                updateCart();
            });

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container'); // Tambahkan kelas CSS
            buttonContainer.appendChild(addButton);
            buttonContainer.appendChild(removeButton);
            buttonContainer.appendChild(deleteButton);

            listItem.appendChild(buttonContainer);
            cartListElement.appendChild(listItem);
            totalPrice += item.price;
        });
        totalPriceElement.textContent = `Total: ${totalPrice.toLocaleString('id-ID')}`;
        cartItemsSection.classList.toggle('hidden');
        totalPriceElement.scrollIntoView({ behavior: 'smooth' }); // Scroll ke total harga

        // Tambahkan tombol checkout jika belum ada
        if (!cartItemsSection.contains(checkoutButton)) {
            cartItemsSection.appendChild(checkoutButton);
        }
    });

    function updateCart() {
        cartCountElement.textContent = `(${cart.reduce((sum, item) => sum + item.quantity, 0)})`; // Ubah ini
        cartListElement.innerHTML = '';
        let totalPrice = 0;
        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('cart-item'); // Tambahkan kelas CSS
            listItem.textContent = `${item.name} - ${item.price.toLocaleString('id-ID')} (x${item.quantity})`;

            const addButton = document.createElement('button');
            addButton.textContent = '+';
            addButton.classList.add('cart-button'); // Tambahkan kelas CSS
            addButton.addEventListener('click', () => {
                item.quantity += 1;
                item.price += item.price / (item.quantity - 1); // Tambahkan harga produk
                updateCart();
            });

            const removeButton = document.createElement('button');
            removeButton.textContent = '-';
            removeButton.classList.add('cart-button'); // Tambahkan kelas CSS
            removeButton.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    item.price -= item.price / (item.quantity + 1); // Kurangi harga produk
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Remove';
            deleteButton.classList.add('cart-button'); // Tambahkan kelas CSS
            deleteButton.addEventListener('click', () => {
                cart.splice(index, 1);
                updateCart();
            });

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container'); // Tambahkan kelas CSS
            buttonContainer.appendChild(addButton);
            buttonContainer.appendChild(removeButton);
            buttonContainer.appendChild(deleteButton);

            listItem.appendChild(buttonContainer);
            cartListElement.appendChild(listItem);
            totalPrice += item.price;
        });
        totalPriceElement.textContent = `Total: ${totalPrice.toLocaleString('id-ID')}`;
    }
});

function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

