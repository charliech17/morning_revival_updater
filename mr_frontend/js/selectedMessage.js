import getLatestData from "./fetch_firebaseData.js";
import checkIsLatestData from './checkData.js'

let data = localStorage["data"] || getLatestData();
let hasLocalData = localStorage["data"] ? true : false;

let transfer = document.location.href;
transfer = transfer.substring(transfer.indexOf("?idx=") + 5);
let storedIndex = transfer.substring(0, 1);
let storedTitle = decodeURIComponent(
  transfer.substring(transfer.indexOf("txt=") + 4)
);

const day = ["週六", "週五", "週四", "週三", "週二", "週一", "綱目"];

function showAllArticles(datum) {
  for (let i = 1; i <= 7; i++) {
    try {
      let link = datum[storedIndex].pop()[1];
      let a = $("<a/>").text(day.pop()).attr("href", link);
      $(`.all_article .art_${i}`).append(a);
    } catch (err) {
      break;
    }
  }
}

$(".all_article .h3").text(storedTitle);

if (localStorage["data"]) {
  showAllArticles(JSON.parse(data));
} else {
  data.then((datum) => {
    localStorage["data"] = JSON.stringify(datum);
    showAllArticles(datum);
  });
}

checkIsLatestData({oldData:data,hasLocalData});