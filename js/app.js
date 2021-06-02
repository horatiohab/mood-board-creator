const apiRoot = "https://api.unsplash.com/";
const accessKey = "IE2eoiaRtsUXQcZw91WSrxrd8C-YUdsAcXAFvLh6Wmo";
let pageNumber = 1;

// Hamburger 
const $hamburger = $(".user-menu");
const burgerClose = $(".greyed-out");

$hamburger.on("click", function(e) {
    $hamburger.toggleClass("is-active");
    // Do something else, like open/close menu
    // $(".pop-out-nav").css("right", "0");
    $(".pop-out-nav").fadeIn();
    // $(".inactive-wrapper").toggleClass("active");
    $(".greyed-out").toggleClass("active");
});


burgerClose.on("click", function() { 
  $hamburger.toggleClass("is-active");
  $(".greyed-out").toggleClass("active");
  // $(".inactive-wrapper").toggleClass("active");
  // $(".pop-out-nav").css("right", "-240px");
  $(".pop-out-nav").fadeOut();
});


// search bar navigation
let searchQuery = "fruit";
const searchForm = document.querySelector("#search-form");
const searchBtn = document.querySelector("#search-images");
const searchBar = document.querySelector("#image-search");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  ig.clear();
  pageNumber = 1;
  searchQuery = searchBar.value;

  imageLoader();
});

// eg.InfiniteGrid
const ig = new eg.InfiniteGrid(".masonry-grid");

var layout = new eg.InfiniteGrid.GridLayout({
  margin: 10,
  align: "center",
  isConstantSize: true,
});
ig.setLayout(layout);

// Gets the data from unsplash and appends to html
async function imageLoader() {
  let html = "";

  const response = await axios.get(
    `${apiRoot}search/photos?query=${searchQuery}&page=${pageNumber}&per_page=30&client_id=${accessKey}`
  );
  const imageList = await response.data.results;

  for (let i = 0; i < imageList.length; i++) {
    html += `<div class="masonry-item">
              <img src="${imageList[i].urls.regular}" id="${imageList[i].id}" class="masonry-image" data-width="${imageList[i].width}" data-height="${imageList[i].height}" onclick="enlarge(event)">
              <div class="image-info">
                <a target="_blank" href="${imageList[i].links.html}"><i class="bi bi-person-circle"></i>${imageList[i].user.name}</a><br>
                <button data-image-id="${imageList[i].id}" onclick="getImageData(event)"><i class="bi bi-plus"></i>Add to board</button><span data-added-img="${imageList[i].id}"><i class="bi bi-check2"></i>Added to board</span>
              </div>
            </div>`;
  }
  console.log(response);
  ig.append(html); // append to masonry grid
  console.log(pageNumber);

  pageNumber++;

  bottom = false;
  console.log("ready!");
}

$(document).ready(imageLoader);

// Infinite scroller

var bottom = false; // waits for imageLoader function to finish

$(window).scroll(function () {
  if (
    $(window).scrollTop() + $(window).height() > $(document).height() - 500 &&
    !bottom
  ) {
    console.log("bottom!");
    bottom = true;

    $(document).ready(imageLoader);
  }
});

// Enlarge image on click
const modalContainer = document.querySelector(".modal-container");
const modal = document.querySelector(".modal-container");

function enlarge(event) {
  if (event.target.nodeName !== "BUTTON" || event.target.nodeName !== "A" ) {
    
    let largeItem = event.target;
    // modalImg.src = largeItem.src;

    const modalImg = document.createElement("img");
    modalImg.setAttribute("src", largeItem.src);
    modalImg.setAttribute("class", "modal-image");

    modalContainer.appendChild(modalImg);

    $(".modal").show();

  }
}

modal.onclick = function () {
  $(".modal").hide();
  modalContainer.innerHTML = "";
};

