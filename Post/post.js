const categoris = document.querySelectorAll(".category-btn")

categoris.forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-category")
        window.location.href = `post.html?category=${category}`
    })
})


const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");


const container = document.getElementById("post-container");
const normalizedCategory = "mobiles".trim().toLowerCase(); // Example category

container.innerHTML = `
  <div class="category-box">
    <h5>Categoris</h5>
    <div style="display:flex; align-items:center; gap:5px;">
      <img src="https://www.olx.com.pk/assets/mobiles.73f961c6ad58605c032eb7c2cf12aeaa.png" 
           alt="${normalizedCategory}" 
           style="width:50px; height:50px; border-radius:5px;">
      <div>
        <h3 style="font-size:15px;">Mobiles</h3>
        <p style="font-size:12px;">Mobile Phones</p>
      </div>
    </div>
    <a href="./categoris.html" class="cate-change">Change</a>
  </div>

  <div class="upload-section">
    <h5>Upload Image*</h5>
    <div class="upload-box">
      <input type="file" id="imageUpload" accept="image/*" required>
      <span><svg width="20" fill="blue" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.67 9.2h-5.84V3.33L10 2.5l-.83.83V9.2H3.33l-.83.83.83.84h5.84v5.8l.83.83.83-.83v-5.8h5.84l.83-.84-.83-.83z"></path></svg></span>
    </div>
  </div>

  <div class="line"></div>

  <div class="brand-section">
    <h5>Brand*</h5>
    <div class="input-brand">
      <input type="text" placeholder="Enter brand" name="brand" required>
    </div>
  </div>

  <br>
  <div class="line"></div>

  <div class="brand-section">
    <h5>Add title*</h5>
    <div class="input-brand">
      <input type="text" placeholder="Enter title" name="title" required>
    </div>
  </div>

  <div class="brand-section">
    <h5>Description*</h5>
    <textarea placeholder="Enter description" name="description" required></textarea>
  </div>

  <div class="brand-section">
    <h5>Location*</h5>
    <div class="input-brand">
      <select name="region" required>
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
  </div>
`;

document.getElementById("price-container").innerHTML = `
  <div class="location-box">
    <div class="brand-section">
      <h5>Price*</h5>
      <div class="input-brand">
        <span class="rs">Rs</span>
        <input type="number" placeholder="Enter Price" name="price" required>
      </div>
    </div>
  </div>
`;

let ownerBox = document.getElementById("owner-box");
ownerBox.innerHTML = `
  <div class="location-box">
    <div class="brand-section">
      <h5>Name*</h5>
      <div class="input-brand">
        <input type="text" placeholder="Enter Name" name="ownerName" required>
      </div>
    </div>

    <div class="brand-section">
      <h5>Mobile Phone Number*</h5>
      <div class="input-brand">
        <span class="rs">+92</span>
        <input type="tel" placeholder="Enter phone number" name="ownerPhone" pattern="[0-9]{10}" required>
      </div>
    </div>
    <br>
    <div class="line"></div>
    <br>

    <div style="display:flex; justify-content:end;">
      <input type="submit" value="Post Now" class="post-btn">
    </div>
  </div>
`;

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