"use strict";

// changing active profile slide//
function showContent(contentType) {
  document.querySelectorAll(".cell").forEach(function (cell) {
    cell.classList.remove("active");
  });

  document.querySelectorAll(".adminContent > div").forEach(function (content) {
    content.classList.remove("active-content");
  });

  document
    .querySelector("." + contentType + "-content")
    .classList.add("active-content");
  document.querySelector("." + contentType).classList.add("active");
}
// redirect to home page //////////////////////////
// Get a reference to the div element
var myDiv = document.getElementById("home");

// Add a click event listener to the div
myDiv.addEventListener("click", function () {
  // Redirect to the desired page
  window.location.href = "../main2.html"; // Replace with your desired URL
});
// ///////////////////////////////////////////////// Display Wishlist ///////////////////////////////////////////////////////////
// const productsContainer = document.getElementById("main-container");
// const productDescContainer = document.querySelector(".product-description");
// const mainPageIcon = document.querySelector(".main-page");
// const wishlistBtn = document.querySelector(".wishlist-btn");
// // Hide zoomed products in wishlist
// wishlistBtn.addEventListener("click", () => {
//   productDescContainer.style.display = "none";
//   productsContainer.style.display = "grid";
// });
// // get data from api
// const getProducts = async function () {
//   const productsArr = [];
//   const response = await fetch("https://fakestoreapi.com/products?limit=10");
//   const data = await response.json();
//   productsArr.push(data);
//   return productsArr;
// };
// render wishlist
// const displayOnPage = async () => {
//   const products = await getProducts();
//   for (const product of products[0]) {
//     productsContainer.innerHTML += `
//               <div class="single-product" data-id="${product.id}">
//                   <div class="icons-container">
//                       <img src="../images/icons8-add-50.png" alt="add icon" id="add-btn">
//                       <img src="../images/eye (1).png" alt="eye icon" id="eye-btn">
//                   </div>
//                   <div class="product-img-container">
//                       <img src="${product.image}" alt="${product.title}">
//                   </div>
//                   <p class="product-category">${product.category}</p>
//                   <p class="product-title">${product.title}</p>
//                   <p class="product-price">${product.price}</p>
//               </div>
//           `;
//   }
// // adding product to cart when click on "+" icon
// const addBtns = document.querySelectorAll("#add-btn");
// for (let i = 0; i < addBtns.length; i++) {
//   addBtns[i].addEventListener("click", addToCart);
//   function addToCart(e) {
//     for (const product of products[0]) {
//       const currentelement = e.target.parentElement.parentElement;
//       if (parseInt(currentelement.getAttribute("data-id")) === product.id) {
//         // let counter = 1;
//         if (!cartItems.includes(product)) {
//           cartItems.push(product);
//           updateCartDisplay(counter);
//         } else {
//           counter++;
//           updateCartDisplay(counter);
//         }
//       }
//     }
//   }
// }

// // Open product description in separate page when click on "eye" icon
// const eyeBtns = document.querySelectorAll("#eye-btn");
// eyeBtns.forEach((btn) => {
//   btn.addEventListener("click", showingTheCart);
// });
// function showingTheCart(e) {
//   productDescContainer.innerHTML = "";
//   productDescContainer.style.display = "flex";
//   productsContainer.style.display = "none";
//   const currentelement = e.target.parentElement.parentElement;
//   const targetProduct = products[0].find(
//     (product) =>
//       product.id === parseInt(currentelement.getAttribute("data-id"))
//   );
//   console.log(targetProduct);
//   productDescContainer.innerHTML = `
//               <div class="desc-image-container">
//                   <img src="${targetProduct.image}" alt="product image">
//               </div>
//               <div class="info-container">
//                   <h1 class="desc-product-title">${targetProduct.title}</h1>
//                   <p class="desc-product-price">$ ${targetProduct.price}</p>
//                   <p class="desc-product-description">${targetProduct.description}</p>
//                   <button class="desc-product-AddButton">Add to cart</button>
//               </div>
//       `;
// }
// };
// displayOnPage();
// *******************************************
///////////////////////////////////////// User Profile /////////////////////////////////////////////////////
const user = {
  id: 1,
  username: "admin",
  password: "admin123",
  email: "admin@example.com",
  phone: "+201100000000",
  fname: "Ahmed",
  lname: "Samy",
  dob: "23-08-1997",
  sex: "Male",
  address: "New Cairo, Cairo",
};

// Populate the form with user information
document.getElementById("username").value = user.username;
document.getElementById("email").value = user.email;
document.getElementById("phone").value = user.phone;
document.getElementById("fname").value = user.fname;
document.getElementById("lname").value = user.lname;
document.getElementById("dob").value = user.dob;
document.getElementById("sex").value = user.sex;
document.getElementById("address").value = user.address;

////////////////////////////////////////// Update Info Button Transition ////////////////////////////////////////
let button = document.querySelector(".button");
let buttonText = document.querySelector(".tick");

const tickMark =
  '<svg width="58" height="45" viewBox="0 0 58 45" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" fill-rule="nonzero" d="M19.11 44.64L.27 25.81l5.66-5.66 13.18 13.18L52.07.38l5.65 5.65"/></svg>';

buttonText.innerHTML = "Update Info";

button.addEventListener("click", function () {
  if (buttonText.innerHTML !== "Update Info") {
    buttonText.innerHTML = "Update Info";
  } else if (buttonText.innerHTML === "Update Info") {
    buttonText.innerHTML = tickMark;
  }
  this.classList.toggle("button__circle");
});
// /////////////////////////////////////////////
let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));
// /////////////////////////
// Get each input element by its id
let usernameInput = document.getElementById("username");
let emailInput = document.getElementById("email");
let fnameInput = document.getElementById("fname");
let lnameInput = document.getElementById("lname");
let dobInput = document.getElementById("dob");
let sexInput = document.getElementById("sex");
let phoneInput = document.getElementById("phone");
let addressInput = document.getElementById("address");

usernameInput.value = `${UserInfo.username}`;
emailInput.value = `${UserCreds.email}`;
fnameInput.value = `${UserInfo.firstname}`;
lnameInput.value = `${UserInfo.lastname}`;
dobInput.value = `${UserInfo.birthdate}`;
sexInput.value = `${UserInfo.gender}`;
phoneInput.value = `${UserInfo.phonenumber}`;
addressInput.value = `${UserInfo.address}`;
//////////////////////////////////////////////////////////////
// Function to update user phone number
