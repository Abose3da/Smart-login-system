let signinEmail = document.getElementById("signinEmail");
let signinPassword = document.getElementById("signinPassword");
let signupName = document.getElementById("signupName");
let signupEmail = document.getElementById("signupEmail");
let signupPassword = document.getElementById("signupPassword");

let list = [];

// validate and submit data
function addUser() {
  if (
    validateSignupInputs() &&
    validateSignupEmail() &&
    validateDuplicateEmail()
  ) {
    var user = {
      fName: signupName.value,
      email: signupEmail.value,
      pass: signupPassword.value,
    };

    list = JSON.parse(localStorage.getItem("list")) || [];
    list.push(user);
    localStorage.setItem("list", JSON.stringify(list));

    signupName.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
    showSuccessMessage();
    return true;
  }
  return false;
}

// make sure that no field is eampty

function validateSignupInputs() {
  if (
    signupName.value == "" ||
    signupEmail.value == "" ||
    signupPassword.value == ""
  ) {
    document.getElementById("errorInputs").classList.remove("d-none");
    return false;
  } else {
    document.getElementById("errorInputs").classList.add("d-none");
    return true;
  }
}

// make sure that the email is writen in the right form
function validateSignupEmail() {
  test = signupEmail.value;
  emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;

  if (emailRegex.test(test)) {
    signupEmail.classList.add("is-valid");
    signupEmail.classList.remove("is-invalid");
    document.getElementById("validEmail").classList.add("d-none");
    return true;
  } else {
    signupEmail.classList.add("is-invalid");
    signupEmail.classList.remove("is-valid");
    document.getElementById("validEmail").classList.remove("d-none");
    return false;
  }
}

// make sure the email is not used before
function validateDuplicateEmail() {
  let storedList = JSON.parse(localStorage.getItem("list")) || [];
  let emailToCheck = signupEmail.value;

  let emailExists = storedList.some((user) => user.email === emailToCheck);

  if (emailExists) {
    signupEmail.classList.add("is-invalid");
    signupEmail.classList.remove("is-valid");
    document.getElementById("duplicateEmail").classList.remove("d-none");
    return false;
  } else {
    signupEmail.classList.add("is-valid");
    signupEmail.classList.remove("is-invalid");
    document.getElementById("duplicateEmail").classList.add("d-none");
    return true;
  }
}

// print sucess message
function showSuccessMessage() {
  const successMessage = document.getElementById("successMessage");
  successMessage.classList.remove("d-none");

  // Hide the message after 3 seconds
  setTimeout(() => {
    successMessage.classList.add("d-none");
  }, 5000);
}

//
//
//

// sign in //

function login() {
  // 1. Validate inputs
  if (signinEmail.value === "" || signinPassword.value === "") {
    document.getElementById("inInputsError").classList.remove("d-none");
    document.getElementById("wrongInput").classList.add("d-none");
    return false;
  }

  // 2. Hide general error, show loading state
  document.getElementById("inInputsError").classList.add("d-none");

  // 3. Get users from localStorage
  const users = JSON.parse(localStorage.getItem("list")) || [];
  const email = signinEmail.value;
  const password = signinPassword.value;

  // 4. Find user by email
  const user = users.find((user) => user.email === email);

  // 5. Handle cases
  if (!user) {
    // Email not found
    document.getElementById("wrongInput").classList.remove("d-none");
    signinEmail.classList.add("is-invalid");
    return false;
  }

  if (user.pass !== password) {
    // Wrong password
    document.getElementById("wrongInput").classList.remove("d-none");
    signinPassword.classList.add("is-invalid");
    return false;
  }

  // 6. Login successful
  document.getElementById("loginSuccess").classList.remove("d-none");

  // Store current user session
  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      name: user.fName,
      email: user.email,
    })
  );


  setTimeout(() => {
    window.location.href = "home.html"; 
  }, 1500);

  return true;
}

// welcome
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
let userName = (document.getElementById("welcome").innerHTML = `
<span class="px-5">Welcome ${currentUser.name}</span>
`);
