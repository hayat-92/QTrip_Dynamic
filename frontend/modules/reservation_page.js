import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them


  // Place holder for functionality to work in the Stubs

  try {
    let url = `${config.backendEndpoint}/reservations/`;
    let response = await fetch(url);
    let data = await response.json();
    // Place holder for functionality to work in the Stubs
    return data;
  } catch (error) {
    return null;
  }

  // return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  if (reservations.length == 0) {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  } else {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  }


  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format DD/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

  console.log(reservations);
  for (let resv of reservations) {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let tm = new Date(resv.time);

    let dte = resv.date.split("-");
    // console.log(dte[2][1]);

    let dyte = `${parseInt(dte[2])}/${parseInt(dte[1])}/${parseInt(dte[0])}`;
    let tym = `${tm.getDate()} ${months[tm.getMonth()]
      } ${tm.getFullYear()}, ${tm.toLocaleTimeString().toLowerCase()}`;

    let arry = [
      resv.id,
      resv.name,
      resv.adventureName,
      resv.person,
      dyte,
      resv.price,
      tym,
      resv.adventure,
    ];

    let roow = document.createElement("tr");

    for (let I = 0; I < arry.length; I++) {
      let colm = document.createElement("td");
      if (I == arry.length - 1) {
        colm.setAttribute("id", resv.id);
        let lnk = document.createElement("a");
        lnk.setAttribute("href", `/QTrip_Dynamic/frontend/pages/adventures/detail/?adventure=${arry[I]}`);

        let btn = document.createElement("button");
        btn.setAttribute("class", "reservation-visit-button");
        btn.innerHTML = "Visit Adventure";

        lnk.appendChild(btn);
        colm.appendChild(lnk);
      } else {

        colm.innerHTML = arry[I];
      }

      roow.appendChild(colm);
    }

    document.getElementById("reservation-table").appendChild(roow);
  }


}

export { fetchReservations, addReservationToTable };
