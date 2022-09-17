//要用 Browser server 去開啟
// import { data } from "./fetch.js";
import { message } from "./fetch_message.js";

message.then((msg) => {
    for (let i = 0; i <= 9; i++) {
    let text = msg[i][0];
    // let a = $('<a/>').text(`M${msg[i][1]}` + text.substring(text.indexOf("\n")))
    //                  .attr('data-ith',i);
    // $(`.all_article .art_${i + 1}`).append(a);
    $(`.all_article .art_${i + 1}`) .text(`M${msg[i][1]}` + text.substring(text.indexOf("\n")))
                                    .attr('data-ith',i);
    }
});

$('.all_article').click(function(evt){
  let evtTarget = evt.target;
  if(evtTarget.nodeName!== 'ARTICLE') return;
    localStorage['ith'] = evt.target.dataset.ith;
    localStorage['txt'] = evt.target.textContent;
    // let transferIndex = evt.target.dataset.ith;
    // let transferText = evt.target.textContent;
    // let url = './selectedMessage.html?idx=' + encodeURIComponent(transferIndex) + '?txt=' + encodeURIComponent(transferText);
    // document.location.href = url;
    document.location.href ='./selectedMessage.html' ;
});