import { db } from "../config.js";
import { doc, getDoc } from "../firestore-db.js";
import { checkLoggedInUser, openLoginModal, resgisterUser, registerBtn, loginUser, sellBtn , } from "../index.js"



sellBtn?.addEventListener("click", () => {
  if (checkLoggedInUser()) {
    window.location.href = "../Post/categoris.html";
  } else {
    openLoginModal();
  }
});


let productId = new URLSearchParams(window.location.search).get('id');
console.log(productId);
let id = productId

let productData;

async function getProductData() {
  const docRef = doc(db, 'posts', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    productData = docSnap.data()
    let loader = document.getElementById("loader")
    loader.style.display = "none";
    let spinnerCont = document.getElementById("spinner-cont")
    spinnerCont.style.display = "none"
    let productDetails = document.getElementById("productDetails")
    productDetails.style.display = "block"
  } else {
    let loader = document.getElementById("loader")
    loader.style.display = "none";
    let spinnerCont = document.getElementById("spinner-cont")
    spinnerCont.style.display = "none"
    let productDetails = document.getElementById("productDetails")
    productDetails.style.display = "block"
    console.log("No such document!");
  }

  let { image, price, description, region, timestamp, title, brand, ownerName } = productData;
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
        <svg xmlns="http://www.w3.org/2000/svg" id="heart" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /> </svg> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="dad99300"><path fill="currentColor" d="M17.35 3a3.65 3.65 0 1 1 0 7.3 3.62 3.62 0 0 1-2.74-1.25l-4.36 2.31a3.53 3.53 0 0 1 0 1.27l4.36 2.32a3.63 3.63 0 0 1 2.74-1.26 3.65 3.65 0 1 1-3.6 3.02L9.4 14.39a3.63 3.63 0 0 1-2.74 1.26 3.65 3.65 0 1 1 0-7.3c1.1 0 2.07.49 2.74 1.25l4.36-2.31a3.61 3.61 0 0 1-.06-.64A3.65 3.65 0 0 1 17.35 3zm0 12.65a1.7 1.7 0 0 0 0 3.39 1.7 1.7 0 0 0 0-3.39zm-10.7-5.34a1.7 1.7 0 1 0 0 3.39 1.7 1.7 0 0 0 0-3.4zm10.7-5.35a1.7 1.7 0 0 0 0 3.39 1.7 1.7 0 0 0 0-3.39z"></path></svg> </div> </div> <h3 id="productName"></h3> <div class="date">
         <p id="location">${region}</p>
          <p>${timestamp}</p>
           </div>
           </div>
  
  <div class="details-container">
    <h2>Details</h2>
    <div class="details-grid">
      <div class="detail-item">
        <span>Brand</span>
        <strong>${brand}</strong>
      </div>
      <div class="detail-item">
        <span>Region</span>
        <strong>${region}</strong>
      </div>
    </div>
  </div>

  `;
  }


  let discriptionContanier = document.getElementById("discription-cont");

  discriptionContanier.innerHTML = `

                 <div class="profile_contact_card">
                    <div class="avaar">
                        <div
                            style="height: 55px; width: 55px; border-radius: 50%; display: flex; justify-content: center; align-items: center; overflow: hidden;">
                            <img src="https://www.olx.com.pk/assets/iconProfilePicture_noinline.6327fd8895807f09fafb0ad1e3d99b83.svg"
                                id="image" alt="" height="60px" width="60px">
                        </div>
                        <div>
                            <div>
                                <p style="margin: 0px; font-size: small; color: gray;">Posted by</p>
                                <h6>${ownerName}</h6>
                            </div>
                        </div>
                    </div>

                    <div style="width: 100%; border: 1px solid rgb(174, 174, 174); margin-top: 10px;"></div>


                    <div style="display: flex; align-items: center; justify-content: space-between;" class="profile-id">
                        <div style="display: flex; justify-content: start; align-items: center;">
                            <div style="display: flex; align-items: center; gap: 5px;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none"
                                    viewBox="0 0 30 30" class="_341464fd">
                                    <path fill="#EBF1FF" fill-opacity=".61"
                                        d="M30 15a15 15 0 1 0-30 0 15 15 0 0 0 30 0z">
                                    </path>
                                    <path fill="#CEDDFF"
                                        d="M12.5 9.38h-1.88a2.5 2.5 0 0 0-2.5 2.5v1.24H10v-1.24a2.5 2.5 0 0 1 2.5-2.5z">
                                    </path>
                                    <path fill="#3A77FF"
                                        d="M19.38 8.75h-.63v-.63a.63.63 0 1 0-1.25 0v.63h-5v-.63a.63.63 0 1 0-1.25 0v.63h-.63a3.13 3.13 0 0 0-3.12 3.13v7.5a3.13 3.13 0 0 0 3.13 3.12h3.02a.63.63 0 0 0 0-1.25h-3.02a1.88 1.88 0 0 1-1.88-1.88v-5.62h13.13c.34 0 .62-.28.62-.63v-1.24a3.13 3.13 0 0 0-3.13-3.13zm1.87 3.75H8.75v-.63c0-1.03.84-1.87 1.88-1.87h.62v.63a.63.63 0 1 0 1.25 0V10h5v.63a.63.63 0 1 0 1.25 0V10h.63c1.03 0 1.87.84 1.87 1.88v.62z">
                                    </path>
                                    <path fill="#3A77FF"
                                        d="M10.63 16.25a.63.63 0 1 0 0-1.25.63.63 0 0 0 0 1.25zm2.5 0a.63.63 0 1 0 0-1.25.63.63 0 0 0 0 1.25zm-2.5 2.5a.63.63 0 1 0 0-1.25.63.63 0 0 0 0 1.25zm2.5 0a.63.63 0 1 0 0-1.25.63.63 0 0 0 0 1.25z">
                                    </path>
                                    <path fill="#17284E"
                                        d="M19.13 14.75a4.38 4.38 0 0 0-4.38 4.38 4.38 4.38 0 0 0 4.38 4.37 4.38 4.38 0 0 0 4.37-4.38 4.38 4.38 0 0 0-4.38-4.37zm0 7.5A3.13 3.13 0 0 1 16 19.12 3.13 3.13 0 0 1 19.13 16a3.13 3.13 0 0 1 3.12 3.13 3.13 3.13 0 0 1-3.13 3.12z">
                                    </path>
                                    <path fill="#17284E"
                                        d="M20.38 18.5h-.63v-.63a.63.63 0 1 0-1.25 0v1.25c0 .35.28.63.63.63h1.25a.63.63 0 1 0 0-1.25z">
                                    </path>
                                </svg>
                                <div>
                                    <p style="margin: 0px; font-size: small; color: gray;">Member Since</p>
                                    <h6 style="font-weight: 700;">2025</h6>

                                </div>
                            </div>

                        </div>
                        <div>
                            <div style="display: flex; align-items: center; gap: 5px;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none"
                                    viewBox="0 0 30 30" class="_341464fd">
                                    <path fill="#EBF1FF" fill-opacity=".61"
                                        d="M15 30a15 15 0 1 0 0-30 15 15 0 0 0 0 30z">
                                    </path>
                                    <path fill="#3A77FF" fill-rule="evenodd"
                                        d="M17.67 20.35H10a1.5 1.5 0 0 1-1.5-1.5V9.5a1.5 1.5 0 0 1 1.5-1.5h7.67a1.5 1.5 0 0 1 1.5 1.5v9.34a1.5 1.5 0 0 1-1.5 1.5zm0-1a.5.5 0 0 0 .5-.5V9.5a.5.5 0 0 0-.5-.5H10a.5.5 0 0 0-.5.5v9.34a.5.5 0 0 0 .5.5h7.67z"
                                        clip-rule="evenodd"></path>
                                    <path fill="#3A77FF" fill-rule="evenodd"
                                        d="M11.5 13.18a.5.5 0 0 1-1 0v-1.67a1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.5v1.67a.5.5 0 0 1-1 0v-1.67a.5.5 0 0 0-.5-.5.5.5 0 0 0-.5.5v1.67zm2.66 0v-2.67a.5.5 0 0 1 .5-.5h1a1.5 1.5 0 0 1 1.5 1.5v.67a1.5 1.5 0 0 1-1.5 1.5h-1a.5.5 0 0 1-.5-.5zm1-.5h.5a.5.5 0 0 0 .5-.5v-.67a.5.5 0 0 0-.5-.5h-.5v1.67z"
                                        clip-rule="evenodd"></path>
                                    <path fill="#3A77FF" fill-rule="evenodd"
                                        d="M13 11.68a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1h2zm-2 4.33a.5.5 0 0 1 0-1h2.67a.5.5 0 0 1 0 1H11zm0 1.67a.5.5 0 0 1 0-1h4.67a.5.5 0 0 1 0 1H11z"
                                        clip-rule="evenodd"></path>
                                    <path fill="#17284E" fill-rule="evenodd"
                                        d="M20 22.35h-7.66a1.5 1.5 0 0 1-1.5-1.5v-1a.5.5 0 0 1 .5-.5H18a.17.17 0 0 0 .17-.17v-8.67a.5.5 0 0 1 .5-.5H20a1.5 1.5 0 0 1 1.5 1.5v9.34a1.5 1.5 0 0 1-1.5 1.5zm0-1a.5.5 0 0 0 .5-.5V11.5a.5.5 0 0 0-.5-.5h-.83v8.17c0 .65-.52 1.17-1.17 1.17h-6.16v.5a.5.5 0 0 0 .5.5H20z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <div>
                                    <p style="margin: 0px; font-size: small; color: gray;">Active Ads</p>
                                    <h6 style="font-weight: 700;">1</h6>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="phone-btn" id="show-phone">
                    <svg width="26" height="26" viewBox="0 0 1024 1024" class="ce29fa27">
                        <path
                            d="M784.55 852.4c-331.43-14.64-598.31-281.52-612.94-612.95l149.97-60 91.69 183.43-71 35.5v26.45c0 141.66 115.25 256.9 256.9 256.9h26.45l11.86-23.64 23.68-47.36 183.38 91.74-59.99 149.93zM918.1 643.45L661.16 514.99l-57.47 19.2-30.04 60.03c-74.07-11.1-132.73-69.8-143.87-143.87l60.08-30.04L509 362.88 380.6 105.94l-54.2-20.6-214.18 85.63-26.88 39.8c0 401.37 326.57 727.9 727.94 727.9l39.76-26.88 85.64-214.19-20.61-54.19z">
                        </path>
                    </svg>
                    <p>Show phone number</p>
                </div>
                <div class="phone-btn-2" style="margin-top: 10px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024"
                        class="_3d8cad58">
                        <path
                            d="M469.33 171.12c-164.69 0-298.66 134.68-298.66 300.25V830.9l108.9-54.75 19.1-4.53h256c164.69 0 298.66-134.68 298.66-300.25S719.36 171.12 554.67 171.12h-85.34zM147.1 938.67L85.33 900.3V471.37c0-212.86 172.27-386.04 384-386.04h85.34c211.73 0 384 173.18 384 386.04s-172.27 386.04-384 386.04H308.74l-161.65 81.26z">
                        </path>
                    </svg>
                    <p>Chat</p>
                </div>
  <div class="description">
                  <h1>Description</h1>
                  <p id="description2">${description}</p>
              </div>

              `



}
getProductData();

function toggleHeart(element) {
  let current = element.getAttribute("fill");
  element.setAttribute("fill", current === "red" ? "none" : "red");
}

let heart = document.getElementById("heart")
if (heart) {
  heart.addEventListener("click", () => {
    toggleHeart(this);
  })
}


checkLoggedInUser();
