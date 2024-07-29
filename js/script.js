const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");


for (let i = 0; i < dropList.length; i++) {
    for(currency_code in country_code){

        // Here we have only taken currency we needed
        // console.log(currency_code) 
        // To check if we got the currency from all the world

        // Selcting USD and BRL as default currency
        let selected;
        if(i == 0){
            selected = currency_code == "USD" ? "selected" : "";
        }else if(i == 1){
            selected = currency_code == "BRL" ? "selected" : "";

        }
        
        // Creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;

        // INserting Optiontag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target); //calling loadFlag with passing target element as an arguement
    });
}

function loadFlag(element){
    for(code in country_code){
        if(code == element.value){ //If currency code option value sanga barabar vayo vane
            let imgTag = element.parentElement.querySelector("img"); //selecting img tag of particular drop list
            //country code of a selected currenecy code in a img url
            imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`
        }
    }
}

window.addEventListener("load", () =>{
    getExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault(); //preventing form from submitting
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () =>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});

function getExchangeRate(){
    const amount = document.querySelector(".amount input"),
    exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    // if user don't enter any value or enter 0 then we will put 1 value by default in the input field
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = `Getting Exchange Rate...`;
    let url = `https://v6.exchangerate-api.com/v6/812c4e0d817829e3c5549724/latest/${fromCurrency.value}`;
    //Fetching api response and returning it with parsing into js obj and in another then method receiving that obj
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(() =>{
        exchangeRateTxt.innerText = "Opps!! Something Went Wrong";
    })
}