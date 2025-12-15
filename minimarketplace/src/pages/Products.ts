import type { Product } from "../types/index.ts";

function products() {
  const productsCont = document.getElementById("products-container");

  async function fetchProducts() {
    try {
      if (!productsCont) return;
      productsCont.innerHTML = '<p class="loading">Loading products...</p>';
      const response = await fetch("https://fakestoreapi.com/products");
      const products = await response.json();
      renderProducts(products);
    } catch (error) {
      if (!productsCont) return;
      productsCont.innerHTML = '<p class="error">Failed to load products.</p>';
      console.error(`Can't fetch products`, error);
    }
  }

  function renderProducts(products: Product[]) {
    if (!productsCont) return;
    productsCont.innerHTML = products
      .map(
        (product) => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.title}" class="product-image" />
          <h3>${product.title}</h3>
          <p class="description">${product.description}</p>
          <div class="product-footer">
            <p class="price">$${product.price}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      `
      )
      .join("");

    attachCartListeners(products);
  }

  function attachCartListeners(products: Product[]) {
    const buttons = document.querySelectorAll('.add-to-cart-btn');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.target as HTMLButtonElement;
        const productId = parseInt(target.dataset.id || '0');
        const product = products.find(p => p.id === productId);

        if (product) {
          window.dispatchEvent(new CustomEvent('addToCart', { detail: product }));

          target.textContent = 'Added!';
          target.classList.add('added');
          setTimeout(() => {
            target.textContent = 'Add to Cart';
            target.classList.remove('added');
          }, 1000);
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchProducts);
  } else {
    fetchProducts();
  }
}

products();
