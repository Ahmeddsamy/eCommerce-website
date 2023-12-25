// main nav functionality
let cartItems = [];
const cartLogoBtn = document.getElementById("cart-logo");
const mainPageIcon = document.querySelector(".main-page");
const backArrow = document.querySelector(".backArrow");
const cartContainer = document.querySelector(".cart");
const productsContainer = document.getElementById("main-container");
const productDescContainer = document.querySelector(".product-description");
cartLogoBtn.addEventListener("click", () => {
  cartContainer.style.visibility = "visible";
});
backArrow.addEventListener("click", () => {
  cartContainer.style.visibility = "hidden";
});
mainPageIcon.addEventListener("click", () => {
  productDescContainer.style.display = "none";
  productsContainer.style.display = "grid";
});

window.onscroll = function () {
  const nav = document.querySelector("nav");
  if (window.scrollY >= 20) {
    nav.style.backgroundColor = "#fff";
  } else {
    nav.style.backgroundColor = "";
  }
};

// Getting products from API
const getProducts = async function () {
  const productsArr = [];
  const response = await fetch("https://fakestoreapi.com/products?limit=10");
  const data = await response.json();
  productsArr.push(data);
  return productsArr;
};

// render products from API
const displayOnPage = async () => {
  const products = await getProducts();
  for (const product of products[0]) {
    productsContainer.innerHTML += `
                <div class="single-product" data-id="${product.id}">
                    <div class="icons-container">
                        <img src="images/icons8-add-50.png" alt="add icon" id="add-btn">
                        <img src="images/eye (1).png" alt="eye icon" id="eye-btn">
                    </div>
                    <div class="product-img-container">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <p class="product-category">${product.category}</p>
                    <p class="product-title">${product.title}</p>
                    <p class="product-price">$ ${product.price}</p>
                </div>
            `;
  }

  // adding product to cart when click on "+" icon
  const addBtns = document.querySelectorAll("#add-btn");
  for (let i = 0; i < addBtns.length; i++) {
    addBtns[i].addEventListener("click", addToCart);
    function addToCart(e) {
      for (const product of products[0]) {
        const currentelement = e.target.parentElement.parentElement;
        if (parseInt(currentelement.getAttribute("data-id")) === product.id) {
          // let counter = 1;
          if (!cartItems.includes(product)) {
            cartItems.push(product);
            updateCartDisplay(counter);
          } else {
            counter++;
            updateCartDisplay(counter);
          }
        }
      }
    }
  }

  // open product description in separate page when click on "eye" icon
  const eyeBtns = document.querySelectorAll("#eye-btn");
  eyeBtns.forEach((btn) => {
    btn.addEventListener("click", showingTheCart);
  });
  function showingTheCart(e) {
    productDescContainer.innerHTML = "";
    productDescContainer.style.display = "flex";
    productsContainer.style.display = "none";
    const currentelement = e.target.parentElement.parentElement;
    const targetProduct = products[0].find(
      (product) =>
        product.id === parseInt(currentelement.getAttribute("data-id"))
    );
    console.log(targetProduct);
    productDescContainer.innerHTML = `
                <div class="desc-image-container">
                    <img src="${targetProduct.image}" alt="product image">
                </div>
                <div class="info-container">
                    <h1 class="desc-product-title">${targetProduct.title}</h1>
                    <p class="desc-product-price">$ ${targetProduct.price}</p>
                    <p class="desc-product-description">${targetProduct.description}</p>
                    <button class="desc-product-AddButton">Add to cart</button>
                </div>
        `;
  }
};

// aside cart handler function
function updateCartDisplay(numberOfOrder) {
  const cartItemsContainer = document.querySelector(".cart-items-container");
  cartItemsContainer.innerHTML = "";
  cartItems.forEach((item) => {
    cartItemsContainer.innerHTML += `
                    <div class="cart-item">
                        <div class="img-container">
                            <img src="${item.image}" alt="item photo">
                        </div>
                        <div class="item-info">
                            <p class="item-title">${item.title}</p>
                            <div class="item-number-price">
                                <div class="item-count">
                                    <img src="images/minus-sign.png" alt="minus" class="minus_btn btn ">
                                    <p id="numberOfItems">${numberOfOrder}</p>
                                    <img src="images/add.png" alt="add button" class="add_btn btn">
                                </div>
                                <p class="item-price">$${item.price}</p>
                            </div>
                        </div>
                        <div class="lst-col">
                            <img src="images/close.png" alt="close cart" class="close-btn">
                            <p class="totalOfItem">$109.95</p>
                        </div>
                </div>
            `;
  });
}

// main function get executed first
displayOnPage();

// function redirectToProfile() {
//   window.location.href = "/Userprofile/customerProfile.html";
// }
