const express = require("express");
var cors = require("cors");
const fetch = require("node-fetch");

const app = express();

// 這裡先去裝 cors 模組 (npm install cors --save)，這樣前端才能fetch資料  use it before all route definitions)
app.use(cors({ origin: "*" }));

const data = [];
const message = [];
const floder_result = "result/addNewResult";
const floder_message = "message/addNewMessage";

async function getLatestData() {
  //1. 將網址(url)及標題(title)等資料 存入data陣列
  for (let i = 1; i <= 5; i++) {
    let tempArray = await fetchGet({
      location: floder_result,
      iterable: i,
      isTemp: false,
    });
    try {
      let temp = await fetchGet({
        location: floder_result,
        iterable: i - 1,
        isTemp: true,
      });
      tempArray[0].unshift(...temp);
    } catch (err) {}

    data.push(...tempArray);
  }

  //2. 將篇題(message)存入陣列
  for (let i = 1; i <= 5; i++) {
    let tempArray = await fetchGet({
      location: floder_message,
      iterable: i,
      isTemp: false,
    });

    message.push(...tempArray);
  }
}

async function fetchGet({ location, iterable, isTemp }) {
  let addTemp = "";

  if (isTemp) {
    addTemp += "_temp";
  }

  const response = await fetch(
    `https://morning-revival-updater-default-rtdb.firebaseio.com/${location}/${
      location.split("/")[0]
    }${iterable}${addTemp}.json`
  );

  const responseData = await response.json();

  if (!response.ok) {
    const error = new Error(responseData.message || "Failed to send request");
    throw error;
  }

  const covertToArray = [];
  for (const i in responseData) {
    covertToArray.push(responseData[i]);
  }

  return covertToArray;
}

async function startWeb() {
  await getLatestData();

  app.get("/apiData", function (req, res) {
    res.json(data);
  });

  app.get("/apiMessage", function (req, res) {
    res.json(message);
  });

  app.listen(3000);
  console.log('http://localhost:3000/apiData and http://localhost:3000/apiMessage are avalibale');
}

startWeb();
