//要用 Browser server 去開啟
// import { data } from "./fetch.js";
import { message } from "./fetch_message.js";

message.then((msg) => {
  for (let i = 0; i <= 9; i++) {
    let art = document.querySelector(`.all_article .art_${i + 1}`);
    let a = document.createElement("a");
    let text = msg[i][0];

    a.setAttribute('href','selectedMessage.html');
    a.setAttribute('data-ith',i);
    // a.setAttribute('target','_blank');

    a.textContent = `W${msg[i][1]}` + text.substring(text.indexOf("\n"));
    art.appendChild(a);
  }

});

$('.all_article').click(function(evt){
    localStorage['ith'] = evt.target.dataset.ith;
    localStorage['txt'] = evt.target.text;
});