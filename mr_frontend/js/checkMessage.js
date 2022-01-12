import getLatestMessage from "./fetch_firebaseMessage.js";

export default async function checkIsLatestMessage(
  {oldMessage,
  hasLocalMessage,}
) {
  if (!hasLocalMessage) return;

  let latestMessage = await getLatestMessage();
  let shouldNotUpdate =
    JSON.parse(oldMessage).join("") === latestMessage.join("");
  if (!shouldNotUpdate) {
    localStorage.clear();
    location.reload();
  }
}
