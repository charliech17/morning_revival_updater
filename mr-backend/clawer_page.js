let request = require("request");
let cheerio = require("cheerio");
let fs= require('fs');
const path = require('path')



//page 是從網頁的第幾頁開始抓，第一頁是最新資料(預計抓前四頁的資料)
//抓資料是用text.includes('晨興聖言-') '晨興聖言-' 若對方文字有改變，則這部分城市需更改
//後面這兩個程式也可能因對方網頁關係需修改  let week=text.substring(text.indexOf('(W')+2); week = week.substring(0,week.indexOf('-')); 
//若成功抓取 完成的資料(綱目 + 週一到周六) 會存在 result[page].json 而不完整的資料會存在 result[page]_temp.json
//抓取篇題 可能因對方修改程式而須修改: 用 $(messageName[i]).text().length-6 去扣掉 (繼續閱讀)  $(messageName[i]).text().substring(0,$(messageName[i]).text().length-6)

    function clawer(page){
        request({
            url: "https://blog.xuite.net/ymch130/MorningRevival?st=c&w=3424876&p="+page,
            method: "GET"
          }, function(e,r,b) { /* Callback 函式 */
            /* e: 錯誤代碼 */
            /* b: 傳回的資料內容 */
            if(e || !b) { return; }
            let $ = cheerio.load(b);

            const result = [];
            const temp = [];
            let message= [];
            let last;

            let titles = $("div .singleArticle span a");
            let hrefs = $('div .singleArticle span a').get().map(x => $(x).attr('href')) //$("div .singleArticle .titlename a").attr('href');
            let messageName = $("div .singleArticle .blogbody div");

            for(let i=0;i<titles.length;i++) {
                let text = $(titles[i]).text();
                if(text.includes('晨興聖言-')){
                    let week=text.substring(text.indexOf('(W')+2);
                    week = week.substring(0,week.indexOf('-'));
    
                    if(last === week){
                        temp.push([text,'https:'+hrefs[i]]);//temp.push(text,'https:'+hrefs[i]);
                    }else if(last!==week ){
                        if(last){
                            result.push(temp.slice());
                        }
                        temp.length = 0;
                        temp.push([text,'https:'+hrefs[i]]);
                        last =week;
                    }

                    if(text.includes('綱要')){
                        message.push([$(messageName[i]).text().substring(0,$(messageName[i]).text().length-6),week]);  
                    }
                }
            }
    
            fs.writeFileSync( path.join(__dirname,`result\\result${page}.json`), JSON.stringify(result));
            fs.writeFileSync( path.join(__dirname,`result\\result${page}_temp.json`), JSON.stringify(temp));
            fs.writeFileSync( path.join(__dirname,`message\\message${page}.json`), JSON.stringify(message));
    
          });
    }

    clawer(1);
    clawer(2);
    clawer(3);
    clawer(4);
    clawer(5);

    console.log('爬取最新晨興聖言完成');