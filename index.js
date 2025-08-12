import { auth } from "./config.js"
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from "./auth.js"



let cardElement = document.getElementById("cards");
let loader = document.getElementById("main-div");


function openLoginModal() {
  document.getElementById("loginModal").style.display = "block";
  let loginbtn = document.getElementById("login-btn")
  loginbtn.onclick = function () {
    loginUser();
    let email = document.getElementById("loginEmail");
    let password = document.getElementById("loginPassword");
    email.value = "";
    password.value = "";
  }
}

document.getElementById("login-word").addEventListener("click", openLoginModal)

function closeLoginModal() {
  document.getElementById("loginModal").style.display = "none";
}
document.getElementById("closeLogin").addEventListener("click", closeLoginModal)

function openRegisterModal() {
  closeLoginModal();
  document.getElementById("registerModal").style.display = "block";
  document.getElementById("loginModal").style.display = "none";

  let fullName = document.getElementById("fullName");
  let email = document.getElementById("email");
  let password = document.getElementById("NewPasswordInput");
  let hideEye = document.getElementById("toggle-eye");
  let rigisterHeading = document.getElementById("register-h2");
  let registerBtn = document.getElementById("register-btn");
  let para = document.getElementById("para");

  fullName.style.margin = "0px"
  email.style.margin = "0px"
  password.style.margin = "0px"
  fullName.style.display = "block";
  email.style.display = "block";
  password.style.display = "block";
  hideEye.style.display = "block";
  rigisterHeading.innerHTML = "Create an account";
  registerBtn.innerHTML = "Register";
  registerBtn.style.marginTop = "10px"
  para.innerHTML = "";
}

document.getElementById("creat-account").addEventListener("click", openRegisterModal)
function closeRegisterModal() {
  document.getElementById("registerModal").style.display = "none";
}
document.getElementById("closeRegister").addEventListener("click", closeRegisterModal)



let passInput = document.getElementById("loginPassword");
let passEye = document.getElementById("eye-img");
let NewPasswordEyeImg = document.getElementById("new-eye-img")
let NewPasswordInp = document.getElementById("NewPasswordInput")

function passwrodTypeChnge() {
  if (passInput.type === "password" || NewPasswordInp.type === "password") {
    passInput.type = "text";
    NewPasswordInp.type = "text"
    passEye.src = "https://cdn-icons-png.flaticon.com/512/159/159604.png";
    NewPasswordEyeImg.src = "https://cdn-icons-png.flaticon.com/512/159/159604.png";
  } else {
    passInput.type = "password";
    passEye.src = "https://cdn-icons-png.flaticon.com/512/709/709612.png";
    NewPasswordInp.type = "password"
    NewPasswordEyeImg.src = "https://cdn-icons-png.flaticon.com/512/709/709612.png";
  }
};

passEye.addEventListener("click", passwrodTypeChnge)
NewPasswordEyeImg.addEventListener("click", passwrodTypeChnge)



function resgisterUser(event) {
  event.preventDefault();
  let form = document.getElementById("registerForm");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  let fullName = document.getElementById("fullName");
  let email = document.getElementById("email");
  let password = document.getElementById("NewPasswordInput");
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user , "ye woh user he jo register howa he")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    fullName.value = ""
    email.value = ""
    password.value = ""
}

let registerBtn = document.getElementById("register-btn")
registerBtn.addEventListener("click", resgisterUser)



function loginUser() {
  let email = document.getElementById("loginEmail");
  let password = document.getElementById("loginPassword");

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user , "ye woh user he jo login he")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

}

let loginbtn = document.getElementById("login-btn")
loginbtn.addEventListener("click" , loginUser)



// function logoutUser() {
//   localStorage.removeItem("loggedinUser")
//   console.log("logout Clicked")
//   let dropDown = document.getElementById("profile-dropdown");
//   dropDown.style.display = "none"
//   let loginbtn = document.getElementById("login-word");
//   loginbtn.style.display = "block";
//   loginbtn.style.height = "50px"
//   loginbtn.style.width = "70px"
//   loginbtn.style.display = "flex"
//   loginbtn.style.justifyContent = "center"
//   loginbtn.style.alignItems = "center"



//   let loginText = document.getElementById("login-text");
//   loginText.style.marginBottom = "20px"
//   loginText.innerHTML = "Login";
//   loginText.style.textAlign = "left";

//   let eyeIcon = document.getElementById("eye-img");
//   eyeIcon.style.display = "block";

//   let lastPara = document.getElementById("last-para-login");
//   lastPara.style.display = "block";

//   let email = document.getElementById("loginEmail");
//   let password = document.getElementById("loginPassword");
//   email.style.margin = "0px"
//   password.style.margin = "0px"
//   email.style.display = "block";
//   password.style.display = "block";
//   email.value = "";
//   password.value = "";

//   let backBtn = document.getElementById("login-btn");
//   backBtn.innerHTML = "Login";
//   backBtn.onclick = loginUser;

//   let invailedPara = document.getElementById("invailed-para");
//   invailedPara.style.display = "none";

//   loginbtn.onclick = function () {
//     document.getElementById("loginModal").style.display = "block";
//   }
//   location.reload();
// }

// function checkLoggedInUser() {
//   console.log("Checking logged in user...");
//   const loggedUser = JSON.parse(localStorage.getItem("loggedinUser"));
//   const userDetails = document.getElementById("profile-dropdown");
//   let loginbtn = document.getElementById("login-word");
//   if (loggedUser) {
//     document.getElementById("profile-icon").style.display = "none";
//     loginbtn.style.display = "none"
//     userDetails.style.display = "block"
//     let userName = document.getElementById("userName");
//     let userEmail = document.getElementById("userEmail");
//     userName.innerHTML = loggedUser.fullName
//     userEmail.innerHTML = loggedUser.email
//   } else {
//     userDetails.style.display = "none"
//     loginbtn.style.display = "block"
//     loginbtn.style.display = "block";
//     loginbtn.style.height = "50px"
//     loginbtn.style.width = "70px"
//     loginbtn.style.display = "flex"
//     loginbtn.style.justifyContent = "center"
//     loginbtn.style.alignItems = "center"

//   }
// }

// checkLoggedInUser();