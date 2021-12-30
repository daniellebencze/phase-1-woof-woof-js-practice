document.addEventListener("DOMContentLoaded", init);
function init(e) {
  const filterDogsButton = document.querySelector("#good-dog-filter");
  filterDogsButton.addEventListener("click", toggleFilterDogs);
  getDogs().then(addAllDogsToDogBar);
}
function toggleFilterDogs(e) {
  const filterDogsButton = document.querySelector("#good-dog-filter");
  if (filterDogsButton.innerText.includes("OFF")) {
    filterDogsButton.innerText = "Filter good dogs: ON";
    updateDogBar();
  } else {
    filterDogsButton.innerText = "Filter good dogs: OFF";
    updateDogBar();
  }
}
function addAllDogsToDogBar(dogArray, filter = false) {
  const dogBar = document.querySelector("#dog-bar");
  dogBar.innerHTML = "";
  if (filter) {
    dogArray.filter((dog) => dog.isGoodDog).forEach(addDogSpantoDogBar);
  } else {
    dogArray.forEach(addDogSpantoDogBar);
  }
}
function addDogSpantoDogBar(dog) {
  const dogBar = document.querySelector("#dog-bar");
  const dogSpan = document.createElement("span");
  dogSpan.innerText = dog.name;
  dogSpan.dataset.id = dog.id;
  dogSpan.addEventListener("click", onDogSpanClick);
  dogBar.append(dogSpan);
}
function onDogSpanClick(e) {
  getSingleDog(e.target.dataset.id).then(addDogInfoToPage);
}
function addDogInfoToPage(dog) {
  const dogInfo = document.querySelector("#dog-info");
  dogInfo.innerHTML = "";
  const dogImg = document.createElement("img");
  dogImg.src = dog.image;
  const dogTitle = document.createElement("h2");
  dogTitle.innerText = dog.name;
  const dogButton = document.createElement("button");
  dogButton.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";
  dogButton.dataset.id = dog.id;
  dogButton.addEventListener("click", onGoodDogButtonClick);
  dogInfo.append(dogImg, dogTitle, dogButton);
}
function onGoodDogButtonClick(e) {
  let newValue;
  if (e.target.innerText.includes("Good")) {
    e.target.innerText = "Bad Dog";
    newValue = false;
  } else {
    e.target.innerText = "Good Dog";
    newValue = true;
  }
  toggleGoodDog(e.target.dataset.id, newValue).then(updateDogBar);
}
function updateDogBar() {
  const filterDogsButton = document.querySelector("#good-dog-filter");
  if (filterDogsButton.innerText.includes("OFF")) {
    getDogs().then((dogArray) => addAllDogsToDogBar(dogArray));
  } else {
    getDogs().then((dogArray) => addAllDogsToDogBar(dogArray, true));
  }
}
// fetches:
const baseURL = "http://localhost:3000/pups";
function getDogs() {
  return fetch(baseURL).then((r) => r.json());
}
function getSingleDog(id) {
  return fetch(baseURL + `/${id}`).then((r) => r.json());
}
function toggleGoodDog(id, newValue) {
  const options = {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      isGoodDog: newValue,
    }),
  };
  return fetch(baseURL + `/${id}`, options).then((r) => r.json());
}

// ------------------------------------------------
// const baseUrl = "http://localhost:3000";

// //Dom Selectors
// const dogBar = document.querySelector("#dog-bar");
// const detail = document.querySelector("#pup-detail");
// const dogBar = document.querySelector("#dog-bar");
// //Event Listenters

// //Fetch Functions
// function displayPupNames() {
//   fetch(baseUrl + "/pups")
//     .then((res) => res.json())
//     .then(renderAllpups);
// }

// //Render Functions
// function renderAllPups(pupsArr) {
//   pupsArr.forEach(renderOnePup);
// }

// function renderOnePup(pups) {
//   console.log(pups);
//   // creating all the elements we need
//   const newSpan = document.createElement("newSpan");
//   const img = document.createElement("img");

//   // assigning attributes to the elements
//   img.src = pups.image;

//   // adding event listeners
//   dogSpan.addEventListener("click", () => renderDetail(pups));

//   // appending into the DOM
//   dogBar.appendChild(newSpan);
// }

// function renderDetail(pupsObj) {
//   detail.innerHTML = `
//         <img class="detail-image" src="${pupsObj.image}" alt="${pupsObj.name}" />
//         <h2 class="name">${pupsObj.name}</h2>
//         <h3 class="good-or-bad">isGoodDog === "true" ? "Good Dog!" : "Bad Dog!"</h3>
//     `;
// }

// // Event handlers

// //Initializers
// getAllPups();
