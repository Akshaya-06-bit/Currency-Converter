// const BASE_URL = "https://api.exchangerate.host/convert?from="USD&to=INR&amount=500

const dropdowns = document.querySelectorAll(".drop select");


for(let select of dropdowns)
{
    for(code in countryList)
    {
        let newoption = document.createElement("option");
        newoption.innerText=code;
        newoption.value=code; 
        if(select.name==="from" && code==="USD"){
            newoption.selected="selected";
        }
        else if(select.name==="to" && code==="INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
}
const updateflag = (to)=>{
    let newcode = to.value;
    let finalcode = countryList[newcode];
    let newsrc = `https://flagsapi.com/${finalcode}/flat/64.png`;
    let img = to.parentElement.querySelector("img");
    img.src=newsrc;
}
const btn = document.querySelector("form button");
 btn.addEventListener("click",async (evt)=>{
   evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let val = amount.value;
    if(val===""|| val < 1)
    {
        val.value = "100";
        val = 1;
    }
    const fromcurr = document.querySelector(".from select").value;
    const tocurr = document.querySelector(".to select").value;
    const url =`https://api.frankfurter.dev/v1/latest?base=${fromcurr.toLowerCase()}&symbols=${tocurr.toLowerCase()}`;
    let response = await fetch(url);
    let data = await response.json();
    const rate = data.rates[tocurr];
    let convertedvalue = rate * val;
    changemsg(convertedvalue,val,fromcurr,tocurr);
 });
 const changemsg = (convertedvalue,val,from,to)=>{
    const msg = document.querySelector(".msg");
    msg.innerText = `${val}${from}=${convertedvalue}${to}`;
 }


