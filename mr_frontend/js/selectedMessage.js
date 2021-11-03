import { data } from "./fetch_data.js";

let storedIndex = localStorage['ith'];
let storedTitle = localStorage['txt'];
const day = ['綱目','週一','週二','週三','週四','週五','週六'];


data.then(da =>{

    $('.all_article .h3').text(storedTitle);

    for(let i=1;i<=7;i++){
        let link = da[storedIndex][6-(i-1)][1];
        let a = $('<a/>').text(day[i-1]).attr("href",link);
        $(`.all_article .art_${i}`).append(a);
    }
});