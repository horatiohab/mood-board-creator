// Email validation
emailForm = document.querySelector("#email-form");

// basic login
emailForm.addEventListener("submit", (e) => {
  e.preventDefault();
  basicLogin();
  $(".add-email").hide();
});

function basicLogin() {
  const emailInput = document.querySelector("#email").value;
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
  // if (localStorage.getItem("lastLogin")) {
  const lastLogin = localStorage.getItem("lastLogin");
  // const index = JSON.parse(localStorage.getItem("users"));
  // const currentUser = index.find(({ email }) => email === lastLogin);

  // localStorage.setItem("currentUser", currentUser);
  // document.querySelector(".sign-in").innerHTML = currentUser.email;
  // console.log(localStorage.getItem("currentUser"));
  // }

  // const checkEmail = localStorage.getItem("lastLogin");
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
    // if (currentUser === -1) {
    //   //
    //   return;
    // }

    index[currentUser].moodBoard.push(imageSource);

    localStorage.setItem("users", JSON.stringify(index));
    console.log(currentUser);
    console.log(index[currentUser].moodBoard);

    const images = index[currentUser].moodBoard;

    $(event.target).hide();
    // $(".image-info span").show();
    $(`[data-added-img="${imageID}"]`).show();

    // let loadBoard = "";

    // localStorage.setItem(
    //   "boardData",
    //   images
    //     .map(
    //       (imgSrc) =>
    //         `<div class="board-item"><img src="${imgSrc}" class="board-image"></div>`
    //     )
    //     .join("\n")
    // );
  }
}

const loginButton = $(".change-email");

loginButton.on("click", function () {
  $(".add-email").show();
});

$(document).ready(isLoggedIn);
