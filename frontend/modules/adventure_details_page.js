import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  console.log(search);
  const urlParams = new URLSearchParams(search);
  const myParam = urlParams.get('adventure');
  console.log(myParam);



  // Place holder for functionality to work in the Stubs
  return myParam;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  let url = `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`;
  try {
    let response = await fetch(url);
    return response.json();
  } catch (error) {
    return null;
  }


  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure);

  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  for (let imag of adventure.images) {
    let divImg = document.createElement("div");
    divImg.setAttribute("class", "w-100");
    let imgTag = document.createElement("img");
    imgTag.setAttribute("class", "activity-card-image");

    imgTag.setAttribute("src", imag);
    divImg.appendChild(imgTag);
    document.getElementById("photo-gallery").appendChild(divImg);
  }

  document.getElementById("adventure-content").innerHTML = adventure.content;


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  let container = document.createElement("div");
  container.setAttribute("id", "carouselExampleIndicators");
  container.setAttribute("class", "carousel slide");
  container.setAttribute("data-ride", "carousel");

  let carIndi = document.createElement("ol");
  carIndi.setAttribute("class", "carousel-indicators");
  for (let i in images) {
    let alm = document.createElement("li");
    alm.setAttribute("data-target", "#carouselExampleIndicators");
    alm.setAttribute("data-slide-to", i);

    if (i == 0) {
      alm.setAttribute("class", "active");
    }
    carIndi.appendChild(alm);
  }

  container.appendChild(carIndi);

  let imgContent = document.createElement("div");
  imgContent.setAttribute("class", "carousel-inner");
  for (let i = 0; i < images.length; i++) {
    let item = document.createElement("div");
    if (i == 0) {
      item.setAttribute("class", "carousel-item active");
    } else {
      item.setAttribute("class", "carousel-item");
    }

    let imag = document.createElement("img");
    imag.setAttribute("class", "d-block w-100 activity-card-image");
    imag.setAttribute("src", images[i]);

    item.appendChild(imag);
    imgContent.appendChild(item);
  }

  container.appendChild(imgContent);

  let butn1 = document.createElement("a");
  butn1.setAttribute("class", "carousel-control-prev");
  butn1.setAttribute("href", "#carouselExampleIndicators");
  butn1.setAttribute("role", "button");
  butn1.setAttribute("data-slide", "prev");

  let sp1 = document.createElement("span");
  sp1.setAttribute("class", "carousel-control-prev-icon");
  sp1.setAttribute("aria-hidden", "true");
  let sp2 = document.createElement("span");
  sp2.setAttribute("class", "sr-only");
  sp2.innerHTML = "Previous";

  butn1.appendChild(sp1);
  butn1.appendChild(sp2);
  container.appendChild(butn1);

  let butn2 = document.createElement("a");
  butn2.setAttribute("class", "carousel-control-next");
  butn2.setAttribute("href", "#carouselExampleIndicators");
  butn2.setAttribute("role", "button");
  butn2.setAttribute("data-slide", "next");

  let sp3 = document.createElement("span");
  sp3.setAttribute("class", "carousel-control-next-icon");
  sp3.setAttribute("aria-hidden", "true");
  let sp4 = document.createElement("span");
  sp4.setAttribute("class", "sr-only");
  sp4.innerHTML = "Next";

  butn2.appendChild(sp3);
  butn2.appendChild(sp4);
  container.appendChild(butn2);

  document.getElementById("photo-gallery").innerHTML = "";
  document.getElementById("photo-gallery").appendChild(container);


}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure);

  if (adventure.available === true) {
    document.getElementById("reservation-panel-available").style.display =
      "block";
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-person-cost").innerHTML = String(
      adventure.costPerHead
    );
  } else {
    document.getElementById("reservation-panel-available").style.display =
      "none";
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
  }



}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML =
    adventure.costPerHead * parseInt(persons);


}

//Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  console.log(adventure);
  $("#myForm").on("submit", function (e) {
    //prevent Default functionality
    e.preventDefault();


    var urlf = `${config.backendEndpoint}/reservations/new`;

    //do your own request an handle the results
    $.ajax({
      url: urlf,
      type: "post",
      dataType: "application/json",
      data: `${$(this).serialize()}&adventure=${adventure.id}`,
      success: function (data, status, xhr) {
        window.alert("Success!");
        window.location.reload();
      },
      error: function (jqXhr, textStatus, errorMessage) {
        window.alert("Failed!");
      }
    });



  });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log(adventure);
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
