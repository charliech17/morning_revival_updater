const data = [];
const floder_result = "result/addNewResult";

export default async function getLatestData() {
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

  return data;
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