// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYSCp9ciAbTeM_DYOpOlwRqH33hEfV5pI",
  authDomain: "ecommerce-iti-5e820.firebaseapp.com",
  databaseURL:
    "https://ecommerce-iti-5e820-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ecommerce-iti-5e820",
  storageBucket: "ecommerce-iti-5e820.appspot.com",
  messagingSenderId: "646973727955",
  appId: "1:646973727955:web:871efec421dc8355bf6026",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  update,
  remove,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
const db = getDatabase();
// main nav functionality
let cartItems = [];
let wishList = [];
const cartLogoBtn = document.getElementById("cart-logo");
const mainPageIcon = document.querySelector(".main-page");
const backArrow = document.querySelector(".backArrow");
const cartContainer = document.querySelector(".cart");
const productsContainer = document.getElementById("main-container");
const productDescContainer = document.querySelector(".product-description");
const btnsContainer = document.querySelector(".btns-container");
cartLogoBtn.addEventListener("click", () => {
  cartContainer.style.visibility = "visible";
});
backArrow.addEventListener("click", () => {
  cartContainer.style.visibility = "hidden";
});
mainPageIcon.addEventListener("click", () => {
  productDescContainer.style.display = "none";
  productsContainer.style.display = "grid";
  btnsContainer.style.display = "flex";
});

window.onscroll = function () {
  const nav = document.querySelector("nav");
  if (window.scrollY >= 20) {
    nav.style.backgroundColor = "#fff";
  } else {
    nav.style.backgroundColor = "";
  }
};
// Function to handle adding a product to the user's cart
const addToCart = async (productId) => {
  // Get the current user ID from sessionStorage
  let userCreds = JSON.parse(sessionStorage.getItem("user-creds"));
  let userId = userCreds.uid;

  // Check if the user has a cart entry for the current product
  const cartRef = ref(db, `cart/${userId}/${productId}`);
  const cartSnapshot = await get(cartRef);

  if (cartSnapshot.exists()) {
    // If the product is already in the cart, update the quantity
    const currentQuantity = cartSnapshot.val().quantity || 0;
    update(cartRef, { quantity: currentQuantity + 1 });
  } else {
    // If the product is not in the cart, add it with quantity 1
    set(cartRef, { userId, productId, quantity: 1 });
  }
  // Optionally, you can provide user feedback (e.g., alert or toast) here
  console.log("Product added to cart!");
};

// Function to render products
function renderProducts(arr, categories) {
  productsContainer.innerHTML = "";
  for (const productId in arr) {
    const product = arr[productId];
    // Find the category name based on categoryId
    const category = categories.find((c) => c.categoryId === product.category);

    productsContainer.innerHTML += `
    <div class="single-product" data-id="${product.id}">
    <!-- Add your HTML structure for each product -->
    <div class="icons-container">
    <img src="images/icons8-add-50.png" alt="add icon" id="add-btn-${productId}" data-id="${productId}">
      <img src="images/eye (1).png" alt="eye icon" class="eye-btn" data-id="${productId}">
    </div>
        <img src="images/heart-solid.svg" alt="like the product" class="like-btn" data-id="${productId}">
        <div class="product-img-container">
          <img src="${product.imageUrl}" alt="${product.productName}">
        </div>
        <p class="product-category">${
          category ? category.category : "Uncategorized"
        }</p>
        <p class="product-title">${product.productName}</p>
        <p class="product-price">$ ${product.price}</p>
      </div>
    `;
  }
  // Add event listeners after products are rendered
  for (const productId in arr) {
    document
      .getElementById(`add-btn-${productId}`)
      .addEventListener("click", () => addToCart(productId));
  }
  // Add event listener for the like icon
  const likeIcons = document.querySelectorAll(".like-btn");
  likeIcons.forEach((likeIcon) => {
    likeIcon.addEventListener("click", () => {
      const productId = likeIcon.getAttribute("data-id");
      addToWishlist(userId, productId);
    });
  });
  // Add event listener for the eye icon
  const eyeIcons = document.querySelectorAll(".eye-btn");
  eyeIcons.forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", () => {
      const productId = eyeIcon.getAttribute("data-id");
      showProductDescription(arr[productId]);
    });
  });
}

// Function to get products from Firebase Realtime Database
const getProductsFromFirebase = async () => {
  const productsArr = [];
  const productsRef = ref(db, "products");
  const snapshot = await get(productsRef);

  if (snapshot.exists()) {
    const productsData = snapshot.val();
    for (const productId in productsData) {
      productsArr.push({ id: productId, ...productsData[productId] });
    }
  }

  return productsArr;
};
// Function to get categories from Firebase Realtime Database
const getCategoriesFromFirebase = async () => {
  const categoriesArr = [];
  const categoriesRef = ref(db, "categories");
  const snapshot = await get(categoriesRef);

  if (snapshot.exists()) {
    const categoriesData = snapshot.val();
    for (const categoryId in categoriesData) {
      categoriesArr.push(categoriesData[categoryId]);
    }
  }

  return categoriesArr;
};
// Declare products array at a higher scope
let products = [];

// Function to display products on the page
const displayOnPage = async () => {
  const products = await getProductsFromFirebase();
  const categories = await getCategoriesFromFirebase();
  renderProducts(products, categories);
  // Add any additional event handling if needed
};
// ///////////////////////////////////////////////////////////////////
// Function to add a product to the wishlist
const addToWishlist = async (userId, productId) => {
  // Get a reference to the "wishlist" node in the database
  const wishlistRef = ref(db, `wishlist/${userId}`);

  // Check if the product is already in the wishlist
  const snapshot = await get(wishlistRef);
  if (snapshot.exists() && snapshot.val()[productId]) {
    alert("Product already in the wishlist!");
    return;
  }

  // If the product is not in the wishlist, add it
  const newWishlistItemRef = push(wishlistRef);
  set(newWishlistItemRef, { userId, productId });

  alert("Product added to the wishlist!");
};
// //////////////////////////////////////////////////////////////////
document
  .querySelector(".all-categories")
  .addEventListener("click", () => filterProduct("all"));
document
  .querySelector(".men-clothing")
  .addEventListener("click", () => filterProduct("1"));
document
  .querySelector(".women-clothing")
  .addEventListener("click", () => filterProduct("4"));
document
  .querySelector(".jewelry")
  .addEventListener("click", () => filterProduct("2"));
document
  .querySelector(".electronics")
  .addEventListener("click", () => filterProduct("3"));

async function filterProduct(category) {
  const products = await getProductsFromFirebase();
  const categories = await getCategoriesFromFirebase();

  // Filter products based on the selected category
  const filteredProducts =
    category !== "all"
      ? products.filter((product) => product.category === category)
      : products;

  // Render the filtered products
  renderProducts(filteredProducts, categories);
}

// Call the function to display products on page load
displayOnPage();

// //////////////////////////////////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////////
// Function to show product description
function showProductDescription(targetProduct) {
  const productsContainer = document.getElementById("main-container");
  const productDescContainer = document.querySelector(".product-description");
  productDescContainer.innerHTML = "";
  productDescContainer.style.display = "flex";
  productsContainer.style.display = "none";
  productDescContainer.innerHTML = `
    <div class="desc-image-container">
      <img src="${targetProduct.imageUrl}" alt="product image">
    </div>
    <div class="info-container">
      <h1 class="desc-product-title">${targetProduct.productName}</h1>
      <p class="desc-product-price">$ ${targetProduct.price}</p>
      <p class="desc-product-description">${targetProduct.description}</p>
      <button class="desc-product-AddButton">Add to cart</button>
    </div>
  `;
}
// /////////////////////////////////////////////////////////////////////////
// Assuming you have the user ID stored in UserCreds.uid
let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
const userId = UserCreds.uid;
const cartItemsContainer = document.querySelector(".cart-items-container");
const countHolder = document.getElementById("count");
const totalAmountElement = document.getElementById("total_count");
const rubbishIcon = document.querySelector(".rubbish-icon");
const checkoutButton = document.querySelector(".check-out");

// Function to update the total amount
function updateTotalAmount(products) {
  const totalAmount = products.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  totalAmountElement.textContent = totalAmount.toFixed(2);
}

// Fetch the user's cart items from Firebase
const userCartRef = ref(db, `cart/${userId}`);
onValue(userCartRef, async (snapshot) => {
  const cartItems = snapshot.val();

  // Update the count of items in the cart
  const itemCount = cartItems ? Object.keys(cartItems).length : 0;
  countHolder.textContent = itemCount;

  // Clear the existing HTML content
  cartItemsContainer.innerHTML = "";

  // Check if there are items in the cart
  if (cartItems) {
    // Fetch product details for each item in the cart
    const productPromises = Object.keys(cartItems).map(async (productId) => {
      const cartItem = cartItems[productId];

      // Fetch the product details from the "products" node
      const productSnapshot = await get(
        child(ref(db), `products/${productId}`)
      );
      const productData = productSnapshot.val();

      // Combine the cart item and product data, including the correct quantity
      return { ...productData, ...cartItem, quantity: cartItem.quantity };
    });

    // Wait for all product details to be fetched
    const products = await Promise.all(productPromises);

    // Generate HTML for each cart item
    let totalAmount = 0; // Initialize totalAmount outside the loop

    products.forEach((item) => {
      const itemTotal = (item.price * item.quantity).toFixed(2);
      totalAmount += parseFloat(itemTotal); // Update the totalAmount

      cartItemsContainer.innerHTML += `
        <div class="cart-item">
          <div class="img-container">
            <img src="${item.imageUrl}" alt="item photo">
          </div>
          <div class="item-info">
            <p class="item-title">${item.productName}</p>
            <div class="item-number-price">
              <div class="item-count">
                <img src="images/minus-sign.png" alt="minus" data-id="${item.productId}" class="minus_btn btn">
                <p id="numberOfItems">${item.quantity}</p>
                <img src="images/add.png" alt="add button"  data-id="${item.productId}" class="add_btn btn">
              </div>
              <p class="item-price">$${item.price}</p>
            </div>
          </div>
          <div class="lst-col">
            <img src="images/close.png" alt="close cart" data-id="${item.productId}" class="close-btn">
            <p class="totalOfItem">$ <span id="itemTotal">${itemTotal}</span> </p>
          </div>
        </div>
      `;
    });

    // Update the total amount
    updateTotalAmount(products);

    // Event listener for the minus button
    document.querySelectorAll(".minus_btn").forEach((minusBtn) => {
      minusBtn.addEventListener("click", async (event) => {
        const productId = event.target.dataset.id;
        const updatedQuantity = Math.max(
          0,
          products.find((item) => item.productId === productId).quantity - 1
        );
        await update(child(ref(db), `cart/${userId}/${productId}`), {
          quantity: updatedQuantity,
        });
      });
    });

    // Event listener for the add button
    document.querySelectorAll(".add_btn").forEach((addBtn) => {
      addBtn.addEventListener("click", async (event) => {
        const productId = event.target.dataset.id;
        const updatedQuantity =
          products.find((item) => item.productId === productId).quantity + 1;
        await update(child(ref(db), `cart/${userId}/${productId}`), {
          quantity: updatedQuantity,
        });
      });
    });

    // Event listener for the close button
    document.querySelectorAll(".close-btn").forEach((closeBtn) => {
      closeBtn.addEventListener("click", async (event) => {
        const productId = event.target.dataset.id;
        await remove(child(ref(db), `cart/${userId}/${productId}`));
      });
    });

    // Event listener for the rubbish icon
    rubbishIcon.addEventListener("click", async () => {
      // Remove all items from the cart
      await remove(ref(db, `cart/${userId}`));
    });
  }
});

// Event listener for the checkout button
checkoutButton.addEventListener("click", async () => {
  try {
    // Fetch the user's cart items from Firebase
    const userCartRef = ref(db, `cart/${userId}`);
    const cartSnapshot = await get(userCartRef);
    const cartItems = cartSnapshot.val();

    if (!cartItems) {
      alert("Cart is empty. Add items to the cart before checking out.");
      return;
    }

    // Fetch product details for each item in the cart
    const productPromises = Object.keys(cartItems).map(async (productId) => {
      const cartItem = cartItems[productId];

      // Fetch the product details from the "products" node
      const productSnapshot = await get(
        child(ref(db), `products/${productId}`)
      );
      const productData = productSnapshot.val();

      // Combine the cart item and product data, including the correct quantity
      return { ...productData, ...cartItem, quantity: cartItem.quantity };
    });

    // Wait for all product details to be fetched
    const products = await Promise.all(productPromises);

    // Generate order data
    const orderData = {
      date: new Date().toISOString().split("T")[0], // Today's date
      orderItems: products.map((item) => ({
        productKey: item.productId,
        quantity: item.quantity,
      })),
      status: "pending",
      totalPrice: totalAmountElement.textContent,
      uid: userId,
    };

    // Add order to the "orders" node
    const orderRef = push(ref(db, "orders"));
    await set(orderRef, orderData);

    // Empty the cart
    await remove(ref(db, `cart/${userId}`));

    // Update the UI or navigate to a confirmation page
    alert("Order placed successfully!");
  } catch (error) {
    console.error("Error during checkout:", error);
    alert("An error occurred during checkout. Please try again.");
  }
});

// ///////////////////////////////////////////////////////////////////////////

function redirectToProfile() {
  window.location.href = "Userprofile/customerProfile.html";
}

function redirectToSignUp() {
  window.location.href = "Signup/signup.html";
}

function redirectToSignIn() {
  window.location.href = "Signup/login.html";
}
