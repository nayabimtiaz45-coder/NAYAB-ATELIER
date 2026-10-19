const products = [
  {
    id: 1,
    name: "The Ivory Edit",
    category: "Eastern Wear",
    price: 4500,
    tag: "SIGNATURE",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=650&q=80"
  },
  {
    id: 2,
    name: "The Noir Dress",
    category: "Western Wear",
    price: 5200,
    tag: "NEW ARRIVAL",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=650&q=80"
  },
  {
    id: 3,
    name: "Soft Form Co-ord",
    category: "Essentials",
    price: 3800,
    tag: "",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=650&q=80"
  },
  {
    id: 4,
    name: "The Evening Muse",
    category: "Western Wear",
    price: 6500,
    tag: "ATELIER PICK",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=650&q=80"
  },
  {
    id: 5,
    name: "Classic Grace",
    category: "Eastern Wear",
    price: 4900,
    tag: "",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e1?auto=format&fit=crop&w=650&q=80"
  },
  {
    id: 6,
    name: "The Everyday Set",
    category: "Essentials",
    price: 3200,
    tag: "",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=650&q=80"
  },
  {
    id: 7,
    name: "Midnight Elegance",
    category: "Western Wear",
    price: 5800,
    tag: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=650&q=80"
  },
  {
    id: 8,
    name: "The Heritage Look",
    category: "Eastern Wear",
    price: 5500,
    tag: "",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=650&q=80"
  }
];

const productGrid = document.getElementById("productGrid");
const bagCount = document.getElementById("bagCount");
const toast = document.getElementById("toast");

let bag = [];
let toastTimer;

function formatPrice(price) {
  return "PKR " + price.toLocaleString("en-PK");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function renderProducts(category = "All") {
  const visibleProducts = category === "All"
    ? products
    : products.filter(product => product.category === category);

  productGrid.innerHTML = visibleProducts.map(product => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >
        ${product.tag
          ? `<span class="product-tag">${product.tag}</span>`
          : ""}
      </div>

      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3>${product.name}</h3>
        <p class="product-price">${formatPrice(product.price)}</p>
        <button class="add-button" data-add="${product.id}">
          ADD TO BAG +
        </button>
      </div>
    </article>
  `).join("");
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    renderProducts(button.dataset.filter);
  });
});

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;

  const productId = Number(button.dataset.add);
  const product = products.find(item => item.id === productId);

  if (!product) return;

  bag.push(product);
  bagCount.textContent = bag.length;

  showToast(`${product.name} added to your bag.`);
});

document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.getElementById("nav");
  const isOpen = nav.classList.toggle("open");

  document.getElementById("menuToggle").setAttribute(
    "aria-expanded",
    String(isOpen)
  );
});

document.querySelectorAll("#nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("nav").classList.remove("open");
    document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-category-link]").forEach(link => {
  link.addEventListener("click", () => {
    const category = link.dataset.categoryLink;

    document.querySelectorAll(".filter").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.filter === category
      );
    });

    renderProducts(category);
  });
});

document.getElementById("newsletterForm").addEventListener("submit", event => {
  event.preventDefault();

  const email = document.getElementById("newsletterEmail").value;
  const message = document.getElementById("newsletterMessage");

  message.textContent =
    "Thank you for your interest! Newsletter signup needs a connected service.";

  event.target.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();

// Replace these with the brand's actual public links.
const instagramUsername = "YOUR_INSTAGRAM_USERNAME";
const whatsappNumber = "92XXXXXXXXXX";

document.getElementById("instagramLink").href =
  `https://www.instagram.com/${instagramUsername}/`;

document.getElementById("whatsappLink").href =
  `https://wa.me/${whatsappNumber}`;

renderProducts();