//要用 Browser server 去開啟
// import { data } from "./fetch.js";
import { message } from "./fetch_message.js";

message.then((msg) => {
  for (let i = 0; i <= 9; i++) {
    let text = msg[i][0];
    let a = $('<a/>').text(`W${msg[i][1]}` + text.substring(text.indexOf("\n")))
                   .attr('href','selectedMessage.html').attr('data-ith',i);
    $(`.all_article .art_${i + 1}`).append(a);
  }
});

$('.all_article').click(function(evt){
    localStorage['ith'] = evt.target.dataset.ith;
    localStorage['txt'] = evt.target.text;
});