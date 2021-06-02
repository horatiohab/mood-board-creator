// login button
const loginButton = $(".change-email");

loginButton.on("click", function () {
  $(".add-email").show();
});

// Email validation
emailForm = document.querySelector("#email-form");

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// basic login
emailForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // submitEmail();
  var email = document.querySelector("#email").value;
  console.log(email);
  if (validateEmail(email)) {
    basicLogin();
    $(".add-email").hide();
  } else {
    alert("Please enter a valid email");
  }

});

function basicLogin() {
  emailInput = document.querySelector("#email").value.toLowerCase();
  localStorage.setItem("lastLogin", emailInput);

  // Check if there are any users at all and if not create an array
  let storedUsers = JSON.parse(localStorage.getItem("users"));
  if (Array.isArray(storedUsers) != true) {
    storedUsers = [];
  }

  // if email already exists, don't add to array
  const existingUser = storedUsers.some((user) => user.email === emailInput);

  if (existingUser) {
    console.log("EXISTING");
    return;
  }

  const user = { email: emailInput, moodBoard: [] };
  localStorage.setItem("users", JSON.stringify([...storedUsers, user]));

  isLoggedIn();
}

function isLoggedIn() {
  const lastLogin = localStorage.getItem("lastLogin");

  if (lastLogin) {
    console.log("I'm logged in!");
    document.querySelector(".sign-in").innerHTML = lastLogin;
    return true;
  }
  if (!lastLogin) {
    console.log("I'm NOT logged in!");
    return false;
  }
}

function getImageData(event) {
  const validLogin = isLoggedIn();

  if (!validLogin) {
    $(".add-email").show();
  }
  if (validLogin) {
    let imageID = $(event.target).attr("data-image-id"); // gets the image ID
    let imageSource = document.getElementById(imageID).src; // gets the image source

    const lastLogin = localStorage.getItem("lastLogin");
    const index = JSON.parse(localStorage.getItem("users"));
    const currentUser = index.findIndex(({ email }) => email === lastLogin);

    index[currentUser].moodBoard.push(imageSource);

    localStorage.setItem("users", JSON.stringify(index));
    console.log(currentUser);
    console.log(index[currentUser].moodBoard);

    const images = index[currentUser].moodBoard;

    $(event.target).hide();

    $(`[data-added-img="${imageID}"]`).show();
  }
}

$(document).ready(isLoggedIn);
