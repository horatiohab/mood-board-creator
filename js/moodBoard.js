const moodBoardEl = document.querySelector(".moodboard");

function createBoardGrid() {
  const boardGrid = new eg.InfiniteGrid(".moodboard");

  var boardLayout = new eg.InfiniteGrid.GridLayout({
    margin: 10,
    align: "center",
    isConstantSize: true,
  });

  boardGrid.setLayout(boardLayout);

  return boardGrid;
}

function loadImages() {
  const lastLogin = localStorage.getItem("lastLogin");

  if (!lastLogin) {
    moodBoardEl.innerHTML = "<p>Not logged in!</p>";
    return;
  }

  let users = localStorage.getItem("users");
  if (!users) {
    moodBoardEl.innerHTML = "<p>No users!</p>";
    return;
  }
  users = JSON.parse(users);

  const user = users.find(({ email }) => email === lastLogin);
  if (!user) {
    moodBoardEl.innerHTML = "<p>User not found!</p>";
    return;
  }

  if (user.moodBoard.length === 0) {
    moodBoardEl.innerHTML = "<p>Nothing to show!</p>";
    return;
  }

  // <div class="board-item"><img src="${imgSrc}" class="board-image"></div>

  const boardEls = user.moodBoard.map((imageSrc) => {
    const boardItemDiv = document.createElement("div");
    boardItemDiv.setAttribute("class", "board-item");

    const imageEl = document.createElement("img");
    imageEl.setAttribute("src", imageSrc);
    imageEl.setAttribute("class", "board-image");

    boardItemDiv.appendChild(imageEl);
    return boardItemDiv;
  });

  const boardGrid = createBoardGrid();

  boardGrid.append(boardEls);
}

$(document).ready(loadImages);
