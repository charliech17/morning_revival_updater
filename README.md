# vallina js、node.js書籍更新系統
## 1. 說明
結合前後端，後端部分用node.js的cherrio套件，去"晨興聖言"網站獲取最新的內容，並存到firebase的realtime資料庫中。然後前端部分用vallina js去寫，將資料庫內容fetch下來，顯示在UI上。由於抓取資料庫需較久時間，因此將抓取後的資料存在local storage中，以供日後快速載入網站。並且每次進入網站後都會檢查資料庫有無更新，若有更新再去更新網站及localStorage的內容並重新整理。

## 2. 使用的軟體
-  node.js
-  html , css , vallina js
-  jQuery

## 3. 分析(Design Pattern 和 Time Complexity)
- Design Pattern: builder pattern/ factory pattern/ facade pattern
- Time Complexity: ~O(n)
