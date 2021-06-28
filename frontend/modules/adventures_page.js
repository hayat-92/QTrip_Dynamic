
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params = new URLSearchParams(search);
  console.log(params.get('city'));
  return params.get('city');

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

  let url = config.backendEndpoint + "/adventures?city=" + city;
  try {
    let response = await fetch(url);
    let rawdata = await response.json();
    return rawdata;
  } catch (err) {
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  for (let activcad of adventures) {
    let colm = document.createElement("div");
    colm.setAttribute("class", "col-6 col-lg-3 mb-2");
    let cad = document.createElement("div");
    cad.setAttribute("class", "activity-card");
    let imng = document.createElement("img");
    imng.setAttribute("src", activcad.image);
    imng.setAttribute("class", "img-fluid");
    cad.appendChild(imng);
    let baner = document.createElement("div");
    baner.setAttribute("class", "category-banner");
    let txtbanr = document.createElement("p");
    txtbanr.innerHTML = activcad.category;
    baner.appendChild(txtbanr);
    cad.appendChild(baner);

    let rw1 = document.createElement("div");
    rw1.setAttribute("class", "row align-self-stretch mx-1 my-2");
    let col1 = document.createElement("div");
    col1.setAttribute("class", "col text-left");
    col1.innerHTML = activcad.name;
    let col2 = document.createElement("div");
    col2.setAttribute("class", "col text-right");
    col2.innerHTML = activcad.costPerHead;
    rw1.appendChild(col1);
    rw1.appendChild(col2);
    cad.appendChild(rw1);


    let rw2 = document.createElement("div");
    rw2.setAttribute("class", "row align-self-stretch mx-2");
    let col3 = document.createElement("div");
    col3.setAttribute("class", "col text-left");
    col3.innerHTML = "Duration";
    let col4 = document.createElement("div");
    col4.setAttribute("class", "col text-right");
    col4.innerHTML = activcad.duration + " Hours";
    rw2.appendChild(col3);
    rw2.appendChild(col4);
    cad.appendChild(rw2);

    let lnk = document.createElement("a");
    lnk.setAttribute("href", `detail/?adventure=${activcad.id}`);
    lnk.setAttribute("id", activcad.id);
    lnk.appendChild(cad);

    colm.appendChild(lnk);

    document.getElementById("data").appendChild(colm);
  }

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredDurnList=list.filter(elem=>{
    if(elem.duration>parseInt(low) && elem.duration<=parseInt(high)){
      return true;
    }
  });
  let sortedFilter=filteredDurnList.sort((a, b)=>{
    return a.duration-b.duration;
  })
  return sortedFilter;



}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  let filteredCategory=list.filter(elem=>{
    for(let catelm of categoryList){
      if(catelm==elem.category){
        return true;
      }
    }
  });
  return filteredCategory;


}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if((filters.duration).length==0 && (filters.category).length!==0){
    return filterByCategory(list, filters.category);
  }else if((filters.duration).length!==0 && (filters.category).length==0){
    let dur=(filters.duration).split("-");
    return filterByDuration(list, dur[0], dur[1]);
  
   }else if((filters.duration).length!==0 && (filters.category).length!==0){
     let filteredCat=filterByCategory(list, filters.category);
     let dur=(filters.duration).split("-")
     let filteredDur=filterByDuration(filteredCat, dur[0], dur[1]);
     return filteredDur;
   }
  else{
    return list;
   }



    // Place holder for functionality to work in the Stubs
  

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  window.localStorage.setItem("filters", JSON.stringify(filters));
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  let filter=JSON.parse(window.localStorage.getItem("filters"));


  // Place holder for functionality to work in the Stubs
  return filter;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  let dom=document.getElementById("category-list");
  for(let i of filters.category){
    let elem=document.createElement("div");
    elem.setAttribute("class", "category-filter");
    elem.innerText=i;
    dom.appendChild(elem);
  }
  
  console.log(dom);

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
