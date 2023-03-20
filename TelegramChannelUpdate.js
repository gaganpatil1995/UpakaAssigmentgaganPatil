// configuration
var botToken = "5943115643:AAHRBvkDJOBRdWVc6XqvgPGL2IpbvG_vmaY";
var appUrl   = "https://script.google.com/macros/s/AKfycbw28-M2bnBhAlH3Pw-ecmkKE4ErsZ1uHK1dCm_dsynpvB2GeCFVUPTsEkMP5Hpv7I-A/exec";
var apiUrl   = "https://api.telegram.org/bot"+botToken;



// set webhook
function setWebhook(){
  var url = apiUrl + "/setwebhook?url="+appUrl;
  var res = UrlFetchApp.fetch(url).getContentText();
  Logger.log(res);
}

// handle webhook
function doPost(e){
  var webhookData = JSON.parse(e.postData.contents);
  var from = webhookData.message.from.id;
  var text = webhookData.message.text;
  if(typeof commandAndResponse[text] == 'undefined'){
    var sendText = encodeURIComponent("command not found");
  }else{
    var sendText = encodeURIComponent(commandAndResponse[text]);
  }
  var url1  = apiUrl+"/sendmessage?parse_mode=HTML&chat_id="+from+"&text="+sendText;
  var opts = {"muteHttpExceptions": true}
 return UrlFetchApp.fetch(url1, opts).getContentText();
}

function doGet(e){
  return ContentService.createTextOutput("Method GET not allowed");
}


// news token
const token = "e85caa25cb4346bc9d47b1e33b209d77";

// Link to API
const teslaNews = `https://newsapi.org/v2/everything?q=tesla&from=2023-03-18&to=2023-03-18&sortBy=popularity&apiKey=${token}&pageSize=10`;
const appleNews = `https://newsapi.org/v2/everything?q=apple&from=2023-03-18&to=2023-03-18&sortBy=popularity&apiKey=${token}&pageSize=10`;
const businessNews = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${token}&pageSize=10`;
const techNews = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${token}&pageSize=10`;
const wallStreet = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${token}&pageSize=10`;

var commandAndResponse  = {
  "hi": "hello",
  "/news" : sendMessage(businessNews),
  "/wallstreet" : sendMessage(wallStreet),
  "/tech" : sendMessage(techNews),
  "/apple" : sendMessage(appleNews),
  "/tesla" : sendMessage(teslaNews)
}

// send message Using bot 
function sendMessage(URL) {
  const articles = getNewsArticles(URL);
  for (let i = 0; i < 20; i++) {
    try {
      var message = creatingMessageFromArticle(articles[i]);
      var MessageURL = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=@mynewsapi&text=${message}`
      var response = UrlFetchApp.fetch(MessageURL);
    } catch (e) {
      console.log(e.message);
    }
  }
  return response;
}

// get news from API
function getNewsArticles(URL_STRING) {
  let response = UrlFetchApp.fetch(URL_STRING);
  let json = response.getContentText();
  let data = JSON.parse(json);
  let articles = data.articles;
  return articles;
}
// structuring the message
function creatingMessageFromArticle(article) {
  return `Name : ${article.source.name} %0A%0AAuthor : ${article.author}  %0A%0ATitle : ${article.title}   %0A%0ADescription : ${article.description}   %0A%0AURL : ${article.url}`;
}
