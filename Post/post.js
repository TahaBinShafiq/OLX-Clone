const categoris = document.querySelectorAll(".category-btn")

categoris.forEach(btn =>{
    btn.addEventListener("click" , () => {
        const category = btn.getAttribute("data-category")
        window.location.href = `post.html?category=${category}`
    })
})




const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

// form container
const container = document.getElementById("post-container");

// create form dynamically
container.innerHTML = `
  <div class="category-box">
    <div>
      <h3>${category ? category.charAt(0).toUpperCase() + category.slice(1) : "No Category"}</h3>
      <p>${category === "mobiles" ? "Mobile Phones" : ""}</p>
    </div>
    <a href="categories.html">Change</a>
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