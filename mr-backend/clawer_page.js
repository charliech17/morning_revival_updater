let request = require("request");
let cheerio = require("cheerio");
const fetch = require("node-fetch");
const schedule = require('node-schedule');
const momentUse = require('moment')


//page 是從網頁的第幾頁開始抓，第一頁是最新資料(預計抓前四頁的資料)
//抓資料是用text.includes('晨興聖言-') '晨興聖言-' 若對方文字有改變，則這部分城市需更改
//後面這兩個程式也可能因對方網頁關係需修改  let week=text.substring(text.indexOf('(W')+2); week = week.substring(0,week.indexOf('-'));
//若成功抓取 完成的資料(綱目 + 週一到周六) 會存在 result[page].json 而不完整的資料會存在 result[page]_temp.json
//抓取篇題 可能因對方修改程式而須修改: 用 $(messageName[i]).text().length-6 去扣掉 (繼續閱讀)  $(messageName[i]).text().substring(0,$(messageName[i]).text().length-6)

async function clawer(page) {
  await request(
    {
      url:
        `${process.env.getDateURL}` +
        page,
      method: "GET",
    },
    function (e, r, b) {
      /* Callback 函式 */
      /* e: 錯誤代碼 */
      /* b: 傳回的資料內容 */
      if (e || !b) {
        return;
      }
      let $ = cheerio.load(b);

      const result = [];
      const temp = [];
      let message = [];
      let last;

      let titles = $("div .singleArticle span a");
      let hrefs = $("div .singleArticle span a")
        .get()
        .map((x) => $(x).attr("href")); //$("div .singleArticle .titlename a").attr('href');
      let messageName = $("div .singleArticle .blogbody div");

      for (let i = 0; i < titles.length; i++) {
        let text = $(titles[i]).text();
        if (text.includes("晨興聖言-")) {
          let week = text.substring(text.indexOf("(W") + 2);
          week = week.substring(0, week.indexOf("-"));

          if (last === week) {
            temp.push([text, "https:" + hrefs[i]]); //temp.push(text,'https:'+hrefs[i]);
          } else if (last !== week) {
            if (last) {
              result.push(temp.slice());
            }
            temp.length = 0;
            temp.push([text, "https:" + hrefs[i]]);
            last = week;
          }

          if (text.includes("綱要")) {
            message.push([
              $(messageName[i])
                .text()
                .substring(0, $(messageName[i]).text().length - 6),
              week,
            ]);
          }
        }
      }

      if (temp.length === 7) {
        result.push(temp.slice());
      } else {
        fetchPost({ page, type: "result", istemp: true, saveData: temp });
      }

      fetchPost({ page, type: "result", istemp: false, saveData: result });
      fetchPost({ page, type: "message", istemp: false, saveData: message });
    }
  );
}

async function fetchPost({ type = "result", page, istemp = false, saveData }) {
  let urlSegment = `${type}${page}`;

  if (istemp) {
    urlSegment += "_temp";
  }

  const response = await fetch(
    `${process.env.DateBaseURL}/${type}/addNew${capitalizeFirstLetter(
      type
    )}/${urlSegment}.json`,
    {
      method: "PUT",
      body: JSON.stringify(saveData),
    }
  );

  const responseData = await response.json();

  if (!response.ok) {
    const error = new Error(responseData.message || "Failed to send request");
    throw error;
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function startApp() {
    console.log("爬取最新晨興聖言中...",momentUse(new Date()).format('YYYY/MM/DD HH:mm:ss'));
    clawer(1);
    clawer(2);
    clawer(3);
    clawer(4);
    clawer(5);
}

startApp()
