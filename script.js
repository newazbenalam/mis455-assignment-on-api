var url = "https://restcountries.com/v3.1/name/";
var api_key = "1810d5f4b037b1f6ea4692c6b589d8ba";
// var locat = 'Dhaka';

async function connectSearch(name) {
  return await fetch(url + name)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

function displayCountries(data) {
  var result_arr = [];
  data.forEach((item) => {
    var cname = item.name.common;
    var capital = item.capital;
    var subregion = item.subregion;
    var currencies = item.currencies;
    var language = item.languages;
    var currencies_arr = [];
    var language_arr = [];
    for (var x in currencies) {
      currencies_arr.push(x);
    }
    for (var x in language) {
      language_arr.push(x);
    }

    result_arr.push(cname);
    result_arr.push(capital);
    result_arr.push(subregion);
    result_arr.push(currencies_arr[0]);
    result_arr.push(currencies[currencies_arr[0]].symbol);
    result_arr.push(language[language_arr[0]]);

    console.log(
      cname +
        " " +
        capital +
        " " +
        subregion +
        " " +
        currencies_arr[0] +
        " " +
        currencies[currencies_arr[0]].symbol +
        " " +
        language[language_arr[0]] +
        "\n"
    );
  });
  return result_arr;
}

async function onSearch() {
  var heroRow = document.getElementsByTagName("hero-row")[0];
  heroRow.className = "hidden-helper";

  var searchRow = document.getElementsByTagName("search-row")[0];
  searchRow.className = searchRow.className.replace("hidden-helper", "");

  var cname = document.getElementById("searchid").value;
  document.getElementById("result-view").innerHTML = "";
  document.getElementById("middle-title").textContent = "Search Result(s)";
  var oldContent = document.getElementById("result-view");
  var data = await connectSearch(cname);
  console.log(data);

  data.forEach((item) => {
    var newContent = document.createElement("div");
    newContent.className = "item-popular";

    var cname = item.name.common;
    var capital = item.capital;
    var subregion = item.subregion;
    var currencies = item.currencies;
    var language = item.languages;
    var currencies_arr = [];
    var language_arr = [];
    for (var x in currencies) {
      currencies_arr.push(x);
    }
    for (var x in language) {
      language_arr.push(x);
    }

    newContent.innerHTML = `
            <p>${subregion}</p>
            <p id="air" class="value"><img width="40px" style="text-align: center;" src="${
              item.flags.png
            }" alt=""> ${cname}</p>
            <p >Capital: ${capital}</p>
            <p >Language: ${language[language_arr[0]]}</p>
            <p >Currencies: ${currencies_arr[0]}/${
      currencies[currencies_arr[0]].symbol
    }</p>
            <p >${item.timezones[0]}</p>
            <button onclick='moredetails(this)' value="${cname}" style="font-weight: 600;
            background: none; border: none; color: #3f3f3f; text-decoration: none; cursor: pointer;">More details</button>

      `;

    oldContent.appendChild(newContent);
  });
}

function moredetails(data) {
  var heroRow = document.getElementsByTagName("hero-row")[0];
  heroRow.className = heroRow.className.replace("hidden-helper", "");

  var searchRow = document.getElementsByTagName("search-row")[0];
  searchRow.className = "hidden-helper";

  foo(`${data.value}`);
  cast(`${data.value}`);
}

function darkMode() {
  if (document.body.style.backgroundColor == "black") {
    document.body.style.backgroundColor = "white";
    // document.body.style.color = "black";
    document.getElementById("hero").style.background =
      "linear-gradient(0deg, var(--primary-color) 0%, var(--bg-color) 60%)";
    document.body.style.color = "black";
    document.body.style.dev.color = "black";
  } else {
    document.body.style.backgroundColor = "black";
    document.getElementById("hero").style.background =
      "linear-gradient(0deg, #261b2e 0%, #868bb9 60%)";
    document.body.style.color = "white";
    document.body.style.dev.color = "white";
  }
  console.log(document.body.style.backgroundColor); // ctrl + j and you can see which mode you're in
}

async function foo(location) {
  let obj;
  const res = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      capitalizeFirstLetter(location) +
      "&appid=" +
      api_key +
      "&units=metric"
  );
  obj = await res.json();
  let dt = new Date((obj.dt + obj.timezone) * 1000);
  console.log(dt);
  document.getElementById("temp").textContent = parseInt(obj.main.temp) + "°C";
  document.getElementById("min_temp").textContent =
    parseInt(obj.main.temp_min) + "°C";
  document.getElementById("max_temp").textContent =
    parseInt(obj.main.feels_like + 2) + "°C";
  document.getElementById("feels_temp").textContent =
    parseInt(obj.main.feels_like) + "°C";
  document.getElementById("locat").textContent = obj.name;
  document.getElementById("pressure").textContent = parseInt(obj.main.pressure);
  document.getElementById("air").textContent = parseInt(
    obj.visibility / obj.main.humidity
  );
  document.getElementById("uv_index").textContent =
    parseInt(obj.clouds.all + 2) % 10;
  document.getElementById("wind").textContent = obj.wind.speed;
  document.getElementById("humidity").textContent =
    parseInt(obj.main.humidity) + "%";
  document.getElementById("condition").textContent = obj.weather[0].main;
  document.getElementById("visibility").textContent = obj.visibility;
  document.getElementById("clouds").textContent = parseInt(obj.clouds.all);
  document.getElementById("weekday").textContent =
    dt.toLocaleString("default", { weekday: "long", timeZone: "UTC" }) + ", ";
  document.getElementById("stime").textContent = dt.toLocaleString("default", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
  document.getElementById("highlight").textContent = "Today's Highlight";
}
// foo(locat);

let castObj;
async function fetchCast(location) {
  const res = await fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      capitalizeFirstLetter(location) +
      "&appid=" +
      api_key +
      "&units=metric"
  );
  castObj = await res.json();
  // cast();
}

async function cast(location) {
  var cname = location;
  document.getElementById("details-box").innerHTML = '';
  var oldContent = document.getElementById("details-box");
  var data = await connectSearch(cname);

  data.forEach((item) => {
    console.log(item.name.common +' ' +  location);
    if (item.name.common == location) {
      var newContent = document.createElement("div");
      newContent.className = "w-card height-unset";

      var cname = item.name.common;
      var capital = item.capital;
      var subregion = item.subregion;
      var currencies = item.currencies;
      var language = item.languages;
      var currencies_arr = [];
      var language_arr = [];
      for (var x in currencies) {
        currencies_arr.push(x);
      }
      for (var x in language) {
        language_arr.push(x);
      }

      newContent.innerHTML = `
            <br>
            <p>${subregion}</p>
            <p id="air" class="value"><img width="40px" style="text-align: center;" src="${
              item.flags.png
            }" alt=""> ${cname}</p>
            <p >Capital: ${capital}</p>
            <p >Language: ${language[language_arr[0]]}</p>
            <p >Currencies: ${currencies_arr[0]}/${
        currencies[currencies_arr[0]].symbol
      }</p>
    <p >${item.timezones[0]}</p>
    <br>
    `;

      oldContent.appendChild(newContent);
    }
  });
}

// function cast() {
//   let i = -8,
//     inctement = 8;
//   document.querySelectorAll("[id=f-temp]").forEach((element) => {
//     element.textContent = new Date(
//       castObj.list[(i += inctement)].dt * 1000
//     ).toLocaleString("default", { weekday: "long", timeZone: "UTC" });
//   });
//   i = -8;
//   document.querySelectorAll("[id=f-max-temp]").forEach((element) => {
//     element.textContent = parseInt(
//       castObj.list[(i += inctement)].main.temp_max + 1
//     );
//   });
//   i = -8;
//   document.querySelectorAll("[id=f-min-temp]").forEach((element) => {
//     element.textContent = parseInt(
//       castObj.list[(i += inctement)].main.temp_min
//     );
//   });
//   i = -8;
//   document.querySelectorAll("[id=f-condition]").forEach((element) => {
//     element.textContent = castObj.list[(i += inctement)].weather[0].main;
//   });
// }

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let eeel;
document.querySelectorAll("[id=h-card]").forEach((a) =>
  a.addEventListener("click", (e) => {
    window.scrollTo(0, 0);
    eeel = e;
    document.getElementById("highlight").textContent =
      (e.target.textContent || e.target.parentElement.textContent) +
      "'s Highlight";
  })
);

function onclickcard(e) {
  console.log("click!");
  eeel = e;
  document.getElementById("highlight").textContent = e.path[0].outerText;
}

var searchbar = document.getElementById("searchbar");
searchbar.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    locat = e.target.value;
    foo(e.target.value);
    fetchCast(locat);
  }
});

function clearKey() {
  localStorage.removeItem("apikey");
}

function getKey() {
  api_key = localStorage.getItem("apikey");
  // console.log(api_key);
  if (api_key == null) {
    api_key = prompt("Please enter api key:");
    if (!api_key == "") {
      localStorage.setItem("apikey", api_key);
    }
  }
  foo(locat);
  fetchCast(locat);
}
setTimeout(() => {
  getKey();
}, 1000);
