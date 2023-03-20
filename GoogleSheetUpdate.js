   function getNewsApi() {
   var response = UrlFetchApp.fetch("https://newsapi.org/v2/everything?q=apple&from=2023-02-18&sortBy=popular&apiKey=e85caa25cb4346bc9d47b1e33b209d77&pageSize=5");

var json = response.getContentText();
var data = JSON.parse(json);
var sheet = SpreadsheetApp.getActiveSheet();
// Logger.log(data);
Logger.log(data["articles"][0]["source"]["name"]);
// Logger.log(data["articles"][0]["author"]);
// Logger.log(data["articles"][0]["title"]);
// Logger.log(data["articles"][0]["description"]);
// Logger.log(data["articles"][0]["url"]);
// Logger.log(data["articles"][0]["content"]);
 var i = 1 ;
 var article = data["articles"];
//  Logger.log(article);
//  article.forEach(function(el){
//     Logger.log(el);
//  });

  article.forEach(function(elem){
      var name = elem["source"]["name"] ;
      var author = elem["author"];
      var title = elem["title"] ;
      var description =elem["description"] ;
      var url =elem["url"] ;
      var content = elem["content"]; 
       i = i+1 ;
      sheet.getRange(i,1).setValue([name]);
      sheet.getRange(i,2).setValue([author]);
      sheet.getRange(i,3).setValue([title]);
      sheet.getRange(i,4).setValue([description]);
      sheet.getRange(i,5).setValue([url]);
      sheet.getRange(i,6).setValue([content]);
     
  });
 





 
  


}
