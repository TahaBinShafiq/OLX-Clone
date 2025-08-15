import { doc, setDoc } from "../firestore-db.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { db } from "../config.js";

const categoris = document.querySelectorAll(".category-btn")

categoris.forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-category")
        window.location.href = `post.html?category=${category}`
    })
})


const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");



// form container
const container = document.getElementById("post-container");
const normalizedCategory = category

// console.log(normalizedCategory)
// create form dynamically
container.innerHTML = `
<form id="postForm">
  <div class="category-box">
    <div><h5 style="margin-top:0px;">Categories</h5></div>
    <div style="display:flex; justify-content:center; align-items:center; gap:5px; margin-right:140px;">
      <img src="${normalizedCategory === "mobiles"
        ? "https://www.olx.com.pk/assets/mobiles.73f961c6ad58605c032eb7c2cf12aeaa.png"
        : normalizedCategory === "vehicles"
            ? "https://www.olx.com.pk/assets/vehicles.354a5ebfb7f21e87991a277dd4b40f4b.png"
            : normalizedCategory === "property for sale"
                ? "https://www.olx.com.pk/assets/property-for-sale.69b01e8dafc182fa3bd469d0ed4fc801.png"
                : normalizedCategory === "property for rent"
                    ? "https://www.olx.com.pk/assets/property-for-rent.49f99cc528b9b88da4f33fbe1f0b3346.png"
                    : "https://www.olx.com.pk/assets/default.png"
    }" alt="${normalizedCategory}" style="width:50px; height:50px; border-radius:5px;">
      <div>
        <h3 style="font-size:15px;">${category ? category.charAt(0).toUpperCase() + category.slice(1) : "No Category"
    }</h3>
        <p style="font-size:12px;">
          ${category === "mobiles"
        ? "Mobile Phones"
        : category === "vehicles"
            ? "Vehicles"
            : category === "property-sale"
                ? "Property for Sale"
                : category === "property-rent"
                    ? "Property for Rent"
                    : ""}
        </p>
      </div>
    </div>
    <a href="./categoris.html" class="cate-change">Change</a>
  </div>

  <div class="upload-section">
    <h5 style="margin-top:0px;">Upload Image</h5>
    <div class="upload-box">
      <input type="file" id="imageUpload" accept="image/*" required>
      <span>
        <svg width="20" fill="blue" height="20" viewBox="0 0 20 20">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.67 9.2h-5.84V3.33L10 2.5l-.83.83V9.2H3.33l-.83.83.83.84h5.84v5.8l.83.83.83-.83v-5.8h5.84l.83-.84-.83-.83z"></path>
        </svg>
      </span>
      <span class="error-msg">Fill this Field</span>
    </div>
  </div>

  <div class="line"></div>

  <div class="brand-section">
    <h5 style="margin-top:0px;">${normalizedCategory === "mobiles"
        ? "Brand*"
        : normalizedCategory === "vehicles"
            ? "Make*"
            : normalizedCategory === "property for sale"
                ? "Type*"
                : normalizedCategory === "property for rent"
                    ? "Area*"
                    : "Brand*"
    }</h5>
    <div class="input-container">
      <div class="input-brand">
        <input 
          type="text" 
          placeholder="${normalizedCategory === "mobiles"
        ? "Enter brand"
        : normalizedCategory === "vehicles"
            ? "Enter make"
            : normalizedCategory === "property-sale"
                ? "Enter type"
                : normalizedCategory === "property-rent"
                    ? "Enter area"
                    : "Enter brand"
    }" 
          id="brandInput" 
          required>
      </div>
      <span class="error-msg">Fill this Field</span>
    </div>
  </div>
  <br>

  <div class="line"></div>
  <div class="brand-section">
    <h5 style="margin-top:0px;">Add title*</h5>
    <div class="input-container">
      <div class="input-brand">
        <input type="text" placeholder="Enter title" id="titleField" required>
        </div>
        <span class="error-msg">Fill this Field</span>
    </div>
  </div>

  <div class="brand-section">
    <h5 style="margin-top:0px;">Description*</h5>
    <div class="input-container">
      <textarea id="descriptionField" placeholder="Enter description" required></textarea>
      <span class="error-msg">Fill this Field</span>
    </div>
  </div>

  <div class="brand-section">
    <h5 style="margin-top:0px;">Location*</h5>
    <div class="input-container">
      <div class="input-brand">
        <select id="regionField" name="region" required>
          <option value="" disabled selected>Choose region</option>
          <option value="azad-kashmir">Azad Kashmir, Pakistan</option>
          <option value="balochistan">Balochistan, Pakistan</option>
          <option value="islamabad">Islamabad Capital Territory, Pakistan</option>
          <option value="khyber-pakhtunkhwa">Khyber Pakhtunkhwa, Pakistan</option>
          <option value="northern-areas">Northern Areas, Pakistan</option>
          <option value="punjab">Punjab, Pakistan</option>
          <option value="sindh">Sindh, Pakistan</option>
        </select>
      </div>
      <span class="error-msg">Fill this Field</span>
    </div>
  </div>

  <div class="location-box">
    <div class="brand-section">
      <h5 style="margin-top:0px;">Price*</h5>
      <div class="input-container">
        <div class="input-brand">
          <span class="rs">Rs</span>
          <input type="number" placeholder="Enter Price" id="priceField" required>
        </div>
        <span class="error-msg">Fill this Field</span>
      </div>
    </div>
  </div>

  <div class="location-box">
    <div class="brand-section">
      <h5 style="margin-top:0px;">Name*</h5>
      <div class="input-container">
        <div class="input-brand">
          <input type="hidden" name="category" id="categoryInput">
          <input type="text" placeholder="Enter Name" id="ownerNameField" required>
        </div>
        <span class="error-msg">Fill this Field</span>
      </div>
    </div>

    <div class="brand-section">
      <h5 style="margin-top:0px;">Mobile Phone Number*</h5>
      <div class="input-container">
        <div class="input-brand">
          <span class="rs">+92</span>
          <input type="number" placeholder="Enter phone number" id="ownerPhoneField" pattern="[0-9]{10}" required>
        </div>
        <span class="error-msg">Fill this Field</span>
      </div>
    </div>

    <br><div class="line"></div><br>
    <div style="display:flex; justify-content:end;">
      <input type="submit" id="postBtn" value="Post Now" class="post-btn">
    </div>
  </div>
</form>
`;
const categoryInput = document.getElementById("categoryInput");
const imageUpload = document.getElementById("imageUpload");
const brandField = document.getElementById("brandInput");
const titleField = document.getElementById("titleField");
const descriptionField = document.getElementById("descriptionField");
const regionField = document.getElementById("regionField");
const priceField = document.getElementById("priceField");
const ownerNameField = document.getElementById("ownerNameField");
const ownerPhoneField = document.getElementById("ownerPhoneField");

document.getElementById("categoryInput").value = category || "";

// image preview
const uploadBox = document.querySelector(".upload-box");
const fileInput = document.getElementById("imageUpload");

uploadBox.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        uploadBox.innerHTML = "";
        uploadBox.appendChild(img);
    }
});

const postBtn = document.getElementById("postBtn");
const postForm = document.getElementById("postForm")


postBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    const inputs = [imageUpload, brandField, titleField, descriptionField, regionField, priceField, ownerNameField, ownerPhoneField
    ];

    let isValid = true;

    inputs.forEach(input => {
        const container = input.closest(".input-container");
        const errorSpan = container ? container.querySelector(".error-msg") : null;

        let filled = true;

        if (input.type === "file") {
            filled = input.files.length > 0;
        } else if (input.tagName.toLowerCase() === "select") {
            filled = input.value !== "";
        } else {
            filled = input.value.trim() !== "";
        }

        if (!filled) {
            isValid = false;
            if (errorSpan) errorSpan.style.display = "block";
        } else {
            if (errorSpan) errorSpan.style.display = "none";
        }
    });

    if (isValid) {
        const auth = getAuth();
        const user = auth.currentUser;
        try {
            const newDocRef = doc(db, "posts",  user.uid)
            await setDoc(newDocRef, {
                postOwnerId: user.uid,
                category: categoryInput.value,
                brand: brandField.value,
                title: titleField.value,
                description: descriptionField.value,
                region: regionField.value,
                price: priceField.value,
                ownerName: ownerNameField.value,
                ownerPhone: ownerPhoneField.value,
                timestamp: Date.now(),
                image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXrmbEEUOzvUm5sSXoEL0gjmTUutwQSDqKpg&s"
            });

            alert("Post saved successfully!");
            if(postForm){
                imageUpload.value = ""
            }
        } catch (error) {
            console.error("Error saving post:", error);
            alert("Failed to save post. Try again!");
        }

    } else {
        console.log("Form has empty fields, fix them first.");
    }
});



postBtn.addEventListener("click", (e) => {
    e.preventDefault(); // stop form submit for now
    console.log("Category:", categoryInput.value);
    console.log("Brand:", brandField.value);
    console.log("Title:", titleField.value);
    console.log("Description:", descriptionField.value);
    console.log("Region:", regionField.value);
    console.log("Price:", priceField.value);
    console.log("Owner Name:", ownerNameField.value);
    console.log("Owner Phone:", ownerPhoneField.value);
    console.log("Image File:", imageUpload.files[0]);
});