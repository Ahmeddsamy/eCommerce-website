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
// ///////////////////////////////////////////////////////////////////
// var files = [];
// var fileReaders = [];
// var imageLinksArray = [];

// const imgdiv = document.getElementById("imagesDiv");
// const selbtn = document.getElementById("selimgbtn");
// const addbtn = document.getElementById("addprodbtn");
// const proglab = document.getElementById("loadlab");

// const name = document.getElementById("productName");
// const description = document.getElementById("description");
// const price = document.getElementById("price");
// const quantity = document.getElementById("quantity");
// const category = document.getElementById("catinp");

// function openFileDialog() {
//   let inp = document.createElement("input");
//   inp.type = "file";
//   inp.multiple = "multiple";

//   inp.onchange = (e) => {
//     assignImgsToFilesArray(e.target.files);
//     CreateImgTags();
//   };
// }

// function assignImgsToFilesArray(thefiles) {
//   let num = files.length + thefiles;
// }
