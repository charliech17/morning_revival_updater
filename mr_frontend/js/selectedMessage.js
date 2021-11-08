import { data } from "./fetch_data.js";

let storedIndex = localStorage['ith'];
let storedTitle = localStorage['txt'];
// let transfer = document.location.href;
// transfer = transfer.substring(transfer.indexOf('?idx=')+5);

// let storedIndex = transfer.substring(0,1);
// let storedTitle = decodeURIComponent(transfer.substring(transfer.indexOf('txt=')+4));



const day = ['週六','週五','週四','週三','週二','週一','綱目'];

data.then(da =>{

    $('.all_article .h3').text(storedTitle);

    for(let i=1;i<=7;i++){
        try{
        let link =da[storedIndex].pop()[1];
            let a = $('<a/>').text(day.pop()).attr("href",link);
            $(`.all_article .art_${i}`).append(a);
        }catch(err){
            break;
        }
    }
});