var url = "https://restcountries.com/v3.1/name/"
function search(name) {
    fetch(url + name)
        .then((res) => res.json())
        .then((data) => displayCountries(data))
}

function displayCountries(data) {
    data.forEach(item => {
        var cname = item.name.common;
        var capital = item.capital;
        var subregion = item.subregion;
        var currencies = item.currencies;
        var language = item.languages;
        var currencies_arr = []
        var language_arr = []
        for(var x in currencies){
            currencies_arr.push(x);
        }
        for(var x in language){
            language_arr.push(x);
        }

        console.log(cname + ' ' + capital + ' ' + subregion + ' ' + currencies_arr[0] + ' ' + currencies[currencies_arr[0]].symbol + ' ' + language[language_arr[0]] +'\n');
    });
}


async function onSearch(){
    var cname = document.getElementById("searchid").value;
    var viewDiv = document.getElementById("result-view");

    var res = await search(cname);

    // viewDiv.appendChild('div');

    // var newContent = do
    newContent

}