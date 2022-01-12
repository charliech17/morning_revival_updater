import getLatestMessage from "./fetch_firebaseMessage.js";
import checkIsLatestMessage from "./checkMessage.js";

let message = localStorage["message"] || getLatestMessage();
let hasLocalMessage = localStorage["message"] ? true : false;

function loopAllTitles(msg) {
  let messageLength = msg.length === 10 ? 10 : msg.length; 
  for (let i = 0; i < messageLength; i++) {
    let text = msg[i][0];

    $(`.all_article .art_${i + 1}`)
      .text(`M${msg[i][1]}` + text.substring(text.indexOf("\n")))
      .attr("data-ith", i);
  }
}

function renderAllTitles() {
  try {
    loopAllTitles(JSON.parse(localStorage["message"]));
  } catch (err) {
    message.then((msg) => {
      localStorage["message"] = JSON.stringify(msg);
      loopAllTitles(msg);
    });
  }
}

$(".all_article").click(function (evt) {
  let evtTarget = evt.target;
  if (evtTarget.nodeName !== "ARTICLE") return;
  let transferIndex = evt.target.dataset.ith;
  let transferText = evt.target.textContent;
  let url =
    "./selectedMessage.html?idx=" +
    encodeURIComponent(transferIndex) +
    "?txt=" +
    encodeURIComponent(transferText);
  document.location.href = url;
});

renderAllTitles();
checkIsLatestMessage({ oldMessage: message, hasLocalMessage });
