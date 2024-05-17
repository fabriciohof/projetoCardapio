document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.getElementById('cart-button');
    const modal = document.getElementById('modal');
    const closeModalButton = document.getElementById('close-modal');
    const checkoutModalButton = document.getElementById('checkout-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    const addressInput = document.getElementById('address');
    const addressEmptyMessage = document.getElementById('address-empty');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    const totalItemsElement = document.createElement('p'); // Novo elemento para exibir o total de itens

    let cart = [];



    cartButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
        updateCart();
    });

    closeModalButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    checkoutModalButton.addEventListener('click', () => {
        const address = addressInput.value.trim();
        if (address === "") {
            addressEmptyMessage.classList.remove('hidden');
        } else {
            addressEmptyMessage.classList.add('hidden');
            alert('Pedido finalizado com sucesso!');
            cart = [];
            addressInput.value = '';
            updateCart();
            modal.classList.add('hidden');
        }
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));

            const existingProductIndex = cart.findIndex(item => item.name === productName);

            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity++;
            } else {
                const product = {
                    name: productName,
                    price: productPrice,
                    quantity: 1
                };
                cart.push(product);
            }

            updateCart();
        });
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';

        let total = 0;
        let itemCount = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('flex', 'justify-between', 'mb-2');

            const itemName = document.createElement('p');
            itemName.textContent = `${item.quantity} x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });

            itemElement.appendChild(itemName);
            itemElement.appendChild(removeButton);

            cartItemsContainer.appendChild(itemElement);

            total += item.price * item.quantity;
            itemCount += item.quantity;
        });

        cartTotalElement.textContent = total.toFixed(2);
        cartCountElement.textContent = itemCount;

        totalItemsElement.textContent = `Preço Total: R$ ${total.toFixed(2)}`; // Atualizando o conteúdo do elemento de preço total
        cartItemsContainer.appendChild(totalItemsElement); // Adicionando o elemento de preço total ao contêiner do carrinho

        const addressLabel = document.createElement('p');
        addressLabel.classList.add('font-bold', 'mt-4');
        addressLabel.textContent = 'Endereço de entrega:';
        cartItemsContainer.appendChild(addressLabel);

        const addressField = document.createElement('input');
        addressField.type = 'text';
        addressField.placeholder = 'Digite seu endereço...';
        addressField.classList.add('w-full', 'border-2', 'p-1', 'rounded', 'my-1');
        addressField.id = 'address';
        cartItemsContainer.appendChild(addressField);

        const addressMessage = document.createElement('p');
        addressMessage.classList.add('text-red-500', 'hidden');
        addressMessage.id = 'address-empty';
        addressMessage.textContent = 'Digite seu endereço...';
        cartItemsContainer.appendChild(addressMessage);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('flex', 'items-center', 'justify-between', 'mt-4', 'w-full');
        cartItemsContainer.appendChild(buttonsContainer);

        const closeButton = document.createElement('button');
        closeButton.classList.add('font-semibold');
        closeButton.id = 'close-modal';
        closeButton.textContent = 'Fechar';
        buttonsContainer.appendChild(closeButton);

        const checkoutButton = document.createElement('button');
        checkoutButton.classList.add('bg-green-500', 'text-white', 'px-4', 'py-1', 'rounded');
        checkoutButton.id = 'checkout-modal';
        checkoutButton.textContent = 'Finalizar pedido';
        buttonsContainer.appendChild(checkoutButton);

        // Re-add event listeners for the new elements
        closeButton.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        checkoutButton.addEventListener('click', () => {
            const isOpen = checkPastelariaOpen();
            if(!isOpen){
                Toastify({
                    text: "O restaurante está fechado",
                    duration: 3000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "#ef4444",
                    }
                }).showToast()
                return;
            }

            const address = addressField.value.trim();
            if (address === "") {
                addressMessage.classList.remove('hidden');
            } else {
                addressMessage.classList.add('hidden');
                alert('Pedido finalizado com sucesso!');
                cart = [];
                addressField.value = '';
                updateCart();
                modal.classList.add('hidden');
            }

            // Construir a mensagem incluindo detalhes de cada item no carrinho
            const message = cart.map(item => {
            return `oi`;
            }).join('\n');

            const encodedMessage = encodeURIComponent(message);
            const phone = "numero do celular";

            window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");

        });
    }

    function checkPastelariaOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 11 && hora < 19; // true --- pastelaria aberta
        
    }

    const spanItem = document.getElementById("date-actual");
    const isOpen = checkPastelariaOpen();

    if (isOpen) {
        spanItem.classList.remove("bg-red-500");
        spanItem.classList.add("bg-green-600");
    } else {
        spanItem.classList.remove("bg-green-600");
        spanItem.classList.add("bg-red-500");
        
    }

});


