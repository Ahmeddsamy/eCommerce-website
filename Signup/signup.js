const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
const form = document.getElementById("signupForm");
const select = document.getElementById("gender");
//Hello world
let fnameField = document.getElementById("fnameField");
let lnameField = document.getElementById("lnameField");
// let usersArr = [
//   {
//     username: "Ammar",
//     password: "Xerox20/30/*_admin",
//   },
//   {
//     username: "Ahmed",
//     password: "Xerox20/40/*",
//   },
//   {
//     username: "Abdelaziz",
//     password: "Xerox20/50/*",
//   },
//   {
//     username: "Ali",
//     password: "Xerox20/60/*",
//   },
// ];

//console.log(usersArr);
let userObj = {};
let current = 1;
// form.addEventListener("submit", function (event) {
//   event.preventDefault();
//   let pass = document.getElementById("password").value;
//   let userName = document.getElementById("username").value;
//   let identicationFlag = 0;
//   if (validatePassword(pass) && validateUsername(userName)) {
//     //event.preventDefault();

//     if (pass.slice(-6) == "_admin") {
//       //event.preventDefault();
//       for (let i = 0; i < usersArr.length; i++) {
//         if (
//           !(usersArr[i].username == userName && usersArr[i].password == pass)
//         ) {
//           //console.log("checking");

//           //  event.preventDefault();
//           identicationFlag = 0;
//         } else {
//           //  event.preventDefault();
//           identicationFlag = 1;
//         }
//       }
//       if (!identicationFlag) {
//         let adminObj = {};

//         adminObj.username = userName;
//         adminObj.password = pass;
//         adminObj.firstname = document.getElementById("fnameField").value;
//         adminObj.lastname = document.getElementById("lnameField").value;
//         adminObj.email = document.getElementById("email").value;
//         adminObj.phonenumber = document.getElementById("phoneNumber").value;
//         adminObj.BDate = document.getElementById("birthdate").value;
//         adminObj.gender = gender.options[gender.selectedIndex].value;

//         console.log(adminObj);
//         usersArr.push(adminObj);

//         // /////////////////////////////////
//         let registerUser = (evt) => {
//           evt.preventDefault();
//           create;
//         };
//         //console.log(usersArr+"after push");

//         bullet[current - 1].classList.add("active");
//         progressCheck[current - 1].classList.add("active");
//         progressText[current - 1].classList.add("active");
//         current += 1;
//         setTimeout(function () {
//           // window.location.assign("../AdminDashboard/adminDashBoard.html");
//         }, 800);
//       } else {
//         //event.preventDefault();
//         alert("type another password or username they are duplicated");
//       }
//     } else {
//       let userFlag = 1;
//       for (let i = 0; i < usersArr.length; i++) {
//         if (
//           !(usersArr[i].username == userName && usersArr[i].password == pass)
//         ) {
//           //  event.preventDefault();

//           userFlag = 0;
//         } else {
//           // console.log("it is okay");
//           //    event.preventDefault();
//           //alert("try another username or password because they are duplicated");
//           userFlag = 1;
//         }
//       }
//       if (!userFlag) {
//         console.log("it is okay user");
//         alert("top");

//         userObj.username = userName;
//         userObj.password = pass;
//         userObj.firstname = document.getElementById("fnameField").value;
//         userObj.lastname = document.getElementById("lnameField").value;
//         userObj.email = document.getElementById("email").value;
//         userObj.phonenumber = document.getElementById("phoneNumber").value;
//         userObj.BDate = document.getElementById("birthdate").value;
//         userObj.gender = gender.options[gender.selectedIndex].value;
//         alert(userObj);
//         usersArr.push(userObj);

//         bullet[current - 1].classList.add("active");
//         progressCheck[current - 1].classList.add("active");
//         progressText[current - 1].classList.add("active");
//         current += 1;
//         setTimeout(function () {
//           //alert(usersArr);

//           window.location.assign("../main.html");
//         }, 800);
//       } else if (userFlag) {
//         //  event.preventDefault();
//       }
//     }
//   }
// });
//usersArr.push({username:"AmmarAhmed",password:'00201144031576'});
// console.log(usersArr);
nextBtnFirst.addEventListener("click", function (event) {
  let fname = fnameField.value;
  let lname = lnameField.value;

  if (validateName(fname) && validateName(lname)) {
    event.preventDefault();

    slidePage.style.marginLeft = "-25%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
  } else {
    event.preventDefault();
    alert("pleae enter valid name");
    let spMessage = document.getElementById("spMessage");
    let validImage = document.getElementById("validImage");
    spMessage.style.display = "inline-block";

    validImage.setAttribute("src", "/images/notvalid.png");
  }
});
nextBtnSec.addEventListener("click", function (event) {
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phoneNumber").value;
  if (validateEmail(email) && validateEgyptianPhoneNumber(phone)) {
    event.preventDefault();
    slidePage.style.marginLeft = "-50%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
  } else {
    event.preventDefault();
    alert("please enter a valid email and Egyption Phone Number");
  }
});
nextBtnThird.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-75%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});

prevBtnSec.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "0%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnThird.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-25%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnFourth.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-50%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});

function validateName(name) {
  // Define the regex pattern for a basic name validation
  var nameRegex = /^[a-zA-Z]{3,}$/;

  // Test the input against the regex pattern
  return nameRegex.test(name);
}

fnameField.addEventListener("blur", function () {
  let fnameValue = fnameField.value;
  let isFnameValid = validateName(fnameValue);
  let spMessage = document.getElementById("spMessage");
  let validImage = document.getElementById("validImage");
  if (isFnameValid) {
    spMessage.style.display = "none";

    // validImage.setAttribute('src','/images/valid.png');
    fnameField.style.border = "1px green solid";
  } else {
    spMessage.style.display = "block";
    spMessage.innerHTML = "*please enter a valid name";
    // validImage.setAttribute('src','/images/notvalid.png');
    fnameField.style.border = "1px red solid";
  }
});
lnameField.addEventListener("blur", function () {
  let lnameValue = lnameField.value;
  let isLnameValid = validateName(lnameValue);
  let spMessage2 = document.getElementById("spMessage2");
  // let validImage2=document.getElementById("validImage2");

  if (isLnameValid) {
    spMessage2.style.display = "none";
    // validImage2.setAttribute('src','/images/valid.png');
    lnameField.style.border = "1px green solid";
  } else {
    spMessage2.style.display = "block";
    //validImage2.setAttribute('src','/images/notvalid.png');
    spMessage2.innerHTML = "*please enter a valid name";
    lnameField.style.border = "1px red solid";
  }
});
function validateEmail(email) {
  // Regular expression for a simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regex
  return emailRegex.test(email);
}

function validateEgyptianPhoneNumber(phoneNumber) {
  // Regular expression for an Egyptian phone number
  const egyptPhoneRegex = /^((\+|00)20)\d{10}$/;

  // Test the phone number against the regex
  return egyptPhoneRegex.test(phoneNumber);
}

function validatePassword(password) {
  // At least 8 characters
  const lengthRegex = /.{8,}/;

  // At least one lowercase letter
  const lowercaseRegex = /[a-z]/;

  // At least one uppercase letter
  const uppercaseRegex = /[A-Z]/;

  // At least one digit
  const digitRegex = /\d/;

  // At least one special character (you can customize this set)
  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

  // Combine all criteria using logical AND
  const isLengthValid = lengthRegex.test(password);
  const hasLowercase = lowercaseRegex.test(password);
  const hasUppercase = uppercaseRegex.test(password);
  const hasDigit = digitRegex.test(password);
  const hasSpecialChar = specialCharRegex.test(password);

  // Check if all criteria are met
  return (
    isLengthValid && hasLowercase && hasUppercase && hasDigit && hasSpecialChar
  );
}
function validateUsername(username) {
  // Regular expression for username validation
  const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  return usernameRegex.test(username);
}

function redirectToLogin() {
  window.location.href = "login.html";
}
