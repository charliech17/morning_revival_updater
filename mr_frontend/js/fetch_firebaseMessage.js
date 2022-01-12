const message = [];
const floder_message = "message/addNewMessage";

export default async function getLatestMessage() {
  //2. 將篇題(message)存入陣列
  for (let i = 1; i <= 5; i++) {
    let tempArray = await fetchGet({
      location: floder_message,
      iterable: i,
      isTemp: false,
    });

    message.push(...tempArray);
  }

  return message;
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