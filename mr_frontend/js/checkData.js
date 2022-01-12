import getLatestData from "./fetch_firebaseData.js";
import getLatestMessage from "./fetch_firebaseMessage.js";

export default async function checkIsLatestData({
  oldData,
  hasLocalData,
}) {
  if (!hasLocalData) return;
  let latestData = await getLatestData();
  let shouldNotUpdate = JSON.parse(oldData).join("") === latestData.join("");
  if (!shouldNotUpdate) {
    localStorage['data'] = JSON.stringify(latestData);
    localStorage.removeItem("message");
    location.href = 'index.html';
  }
}
