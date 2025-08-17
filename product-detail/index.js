import { db } from "../config.js";
import { doc, getDoc } from "../firestore-db.js";

let productId = new URLSearchParams(window.location.search).get('id');
console.log(productId);
let id = productId

let productData;

async function getProductData() {

  let loader = document.getElementById("loader")
  loader.style.display = "none";
  let spinnerCont = document.getElementById("spinner-cont")
  spinnerCont.style.display = "none"
  let productDetails = document.getElementById("productDetails")
  productDetails.style.display = "block"

  const docRef = doc(db, 'posts', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    productData = docSnap.data()
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }

  let { image, price, description , region , timestamp , title} = productData;
  let slider = document.getElementById("left-side");

  let buttons = "";

  // agar image array hai (multiple pics) to loop lagao
  if (Array.isArray(image)) {
    buttons = image.length > 1
      ? `
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon custom-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon custom-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    ` : "";

    slider.innerHTML = `
    <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner">
        ${image.map((img, i) => `
          <div class="carousel-item ${i === 0 ? 'active' : ''}">
            <img src="${img}" class="d-block slider-img w-100" alt="Product Image">
          </div>
        `).join("")}
      </div>
      ${buttons}
    </div>
  `;
  } else {
    // agar single image string hai
    slider.innerHTML = `
    <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="${image}" class="d-block slider-img w-100" alt="Product Image">
        </div>
      </div>
    </div>

    <div class="price__location_card">
     <div class="headeing-div">
     <div>
      <h1 id="price">Rs. ${price}</h1>
      <h3>${title}</h3>
      </div>
       <div>
        <svg xmlns="http://www.w3.org/2000/svg" onclick="toggleHeart(this)" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /> </svg> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="dad99300"><path fill="currentColor" d="M17.35 3a3.65 3.65 0 1 1 0 7.3 3.62 3.62 0 0 1-2.74-1.25l-4.36 2.31a3.53 3.53 0 0 1 0 1.27l4.36 2.32a3.63 3.63 0 0 1 2.74-1.26 3.65 3.65 0 1 1-3.6 3.02L9.4 14.39a3.63 3.63 0 0 1-2.74 1.26 3.65 3.65 0 1 1 0-7.3c1.1 0 2.07.49 2.74 1.25l4.36-2.31a3.61 3.61 0 0 1-.06-.64A3.65 3.65 0 0 1 17.35 3zm0 12.65a1.7 1.7 0 0 0 0 3.39 1.7 1.7 0 0 0 0-3.39zm-10.7-5.34a1.7 1.7 0 1 0 0 3.39 1.7 1.7 0 0 0 0-3.4zm10.7-5.35a1.7 1.7 0 0 0 0 3.39 1.7 1.7 0 0 0 0-3.39z"></path></svg> </div> </div> <h3 id="productName"></h3> <div class="date">
         <p id="location">${region}</p>
          <p>${timestamp}</p>
           </div>
           </div>
  
  <div class="details-container">
    <h2>Details</h2>
    <div class="details-grid">
      <div class="detail-item">
        <span>Brand</span>
        <strong></strong>
      </div>
      <div class="detail-item">
        <span>Availability</span>
        <strong></strong>
      </div>
      <div class="detail-item">
        <span>Weight</span>
        <strong></strong>
      </div>
      <div class="detail-item">
        <span>Return Policy</span>
        <strong></strong>
      </div>
      <div class="detail-item">
        <span>Order Quantity</span>
        <strong></strong>
      </div>
      <div class="detail-item">
        <span>Rating</span>
      <strong></strong>
      </div>
      <div class="detail-item">
        <span>Stock</span>
        <strong></strong>
      </div>
      <div class="detail-item">
        <span>Width</span>
        <strong></strong>
      </div>
      <div class="detail-item">
        <span>Height</span>
        <strong></strong>
      </div>
      <div class="detail-item">
        <span>Depth</span>
        <strong></strong>
      </div>
    </div>
  </div>

  `;
  }


  let discriptionContanier = document.getElementById("discription-cont");

  discriptionContanier.innerHTML = ` <div class="description">
                  <h1>Description</h1>
                  <p id="description2">${description}</p>
              </div>

              `



}

function toggleHeart(element) {
  element.style.fill = element.style.fill === "red" ? "none" : "red";
}

getProductData();