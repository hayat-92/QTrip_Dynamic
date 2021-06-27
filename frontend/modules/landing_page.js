import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

  try {
    let url = `${config.backendEndpoint}/cities`;
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    return null;
  }


}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let colm=document.createElement("div");
  colm.setAttribute("class", "col-6 col-md-3 mb-4");
  let tile=document.createElement("div");
  tile.setAttribute("class", "tile");
  let imge=document.createElement("img");
  imge.setAttribute("class", "img-fluid");
  imge.setAttribute("src", image);
  tile.appendChild(imge);
  let txt=document.createElement("div");
  txt.setAttribute("class", "tile-text");
  let hed=document.createElement("h5");
  hed.innerHTML=city;
  let para=document.createElement("p");
  para.innerHTML=description;
  txt.appendChild(hed);
  txt.appendChild(para);
  tile.appendChild(txt);
  let lnk=document.createElement("a");
  let url=`pages/adventures/?city=${id.toLowerCase()}`;
  lnk.setAttribute("href", url);
  lnk.setAttribute("id", id);
  lnk.appendChild(tile);
  colm.appendChild(lnk);
  document.getElementById("data").appendChild(colm);

}

export { init, fetchCities, addCityToDOM };
