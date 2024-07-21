const BASE_URL='https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';
let img_url='https://flagsapi.com/IN/flat/64.png';

// Fetching all required html elements;
let amount=document.querySelector('#amount');
let btn=document.querySelector('.btn');
let msg=document.querySelector('.msg');
let dropdowns=document.querySelectorAll('.dropdown select');
let fromCurr=document.querySelector('#select-from');
let toCurr=document.querySelector('#select-to');


const updateFlags=(element)=>{
    // element - whichever select is selected (either from or to) that will be stored here
    let myCurrCode=element.value;
    // The selected select's parentElement (i.e dropdown) on that querySelector will be performed and that img will be fetched
    let img = element.parentElement.querySelector("img");
    img.setAttribute('src',`https://flagsapi.com/${countryList[myCurrCode]}/flat/64.png`);
}

// Populating select with options 
// countryList is stored in country_codes.js file
for(let select of dropdowns){
    for(currencyCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currencyCode;
        newOption.value=currencyCode;
        newOption.setAttribute('class','currency-options');
        
        // Setting default selected option as USD and INR
        if(select.name=="select-from" && currencyCode=="USD"){
            newOption.selected=currencyCode;
        }
        else if(select.name=="select-to" && currencyCode=="INR"){
            newOption.selected=currencyCode;
        }

        select.append(newOption);

        select.addEventListener('change',(event)=>{
            updateFlags(event.target);
        });
    }
}



const convertCurrency=async()=>{
    if (amount.value === "") {
        amount.value = "1";
    }
console.log(amount.value)
    let from=fromCurr.value.toLowerCase();
    let to=toCurr.value.toLowerCase();

  let response= await fetch(`${BASE_URL}/${from}.json`);
  let data=await response.json();
  let currToValue=data[from][to];
  
  let convertedCurrency=amount.value*currToValue;
  msg.innerText=`${amount.value} ${from.toUpperCase()} = ${convertedCurrency} ${to.toUpperCase()}`;
}

btn.addEventListener("click",(event)=>{
    event.preventDefault();
    convertCurrency();
});


// So that the default selected values are converted and displayed in the msg
window.addEventListener("load", () => {
    convertCurrency();
  });



















