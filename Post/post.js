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
const normalizedCategory = category.trim().toLowerCase();
console.log(normalizedCategory)
// create form dynamically
container.innerHTML = `
  <div class="category-box">
  <div><h4>Categoris</h4></div>
<div style="display:flex; justify-content:center; align-items:center; gap:5px;">

<img src="${
  normalizedCategory === "mobiles"
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

  <h3 style="font-size:15px;">${category ? category.charAt(0).toUpperCase() + category.slice(1) : "No Category"}</h3>

  <p style="font-size:12px;">
    ${
      category === "mobiles"
        ? "Mobile Phones"
        : category === "vehicles"
        ? "Vehicles"
        : category === "property-sale"
        ? "Property for Sale"
        : category === "property-rent"
        ? "Property for Rent"
        : ""
    }
  </p>

  </div>
</div>
    <a href="./categoris.html" class="cate-change">Change</a>
  </div>

  <div class="upload-section">
    <label>Upload Image</label>
    <div class="upload-box">
      <input type="file" id="imageUpload" accept="image/*">
      <span>+</span>
    </div>
    <p style="font-size:12px;color:gray;">Only 1 image allowed</p>
  </div>

  <div class="brand-section">
    <label>Brand*</label>
    <input type="text" placeholder="Enter brand" id="brandInput">
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