importScripts('firebase-app.js');
importScripts('firebase-database.js');

var firebaseConfig = {
    apiKey: "AIzaSyBqaPR0wVUXYnD1KUhaeTXT2RlfUWvK_n8",
    authDomain: "chrome-store-1f206.firebaseapp.com",
    databaseURL: "https://chrome-store-1f206-default-rtdb.firebaseio.com",
    projectId: "chrome-store-1f206",
    storageBucket: "chrome-store-1f206.appspot.com",
    assmessagingSenderId: "66744701444",
    appId: "1:66744701444:web:570a5ed9a2105663859b51"
  };

  //initialize firebase
 firebase.initializeApp(firebaseConfig);
 var database = firebase.database();

 var tabData = {};

 chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.emailid) {
      const emailid = message.emailid;

       // Save email to Firebase
    saveEmailToFirebase(emailid);
      }
});
 
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
  if(changeInfo.status === 'complete'){
    var url = tab.url;
    if(url && url.startsWith('http')){
      if(tabData.hasOwnProperty(tabId)) {
        tabData[tabId].endtime = Date.now();
        tabData[tabId].duration += calculateDuration(tabData[tabId].starttime,tabData[tabId].endtime);
        
        //save tab information to firebase when the tab update is complete
        saveTabToFirebase(tabData[tabId],formatDuration(duration));

      }else{
        tabData[tabId]  = {
          url:url,
          starttime: Date.now(),
          endtime: null,
          duration: 0
        };
      }

      console.log('Tab updated:' , tabData[tabId]);

     
    }
  }
});

function saveEmailToFirebase(emailid){
  database.ref('contactForm').push({
    emailid:emailid,
  })
  .then(function(){
    console.log("Email saved successfully!");
  })
  .catch(function(error){
        console.error('error savingemail:',error);
  });
}
function saveTabToFirebase(tabInfo) {
  database.ref('tab_info').push(tabInfo)({
  
})
  .then(function () {
    console.log("Tab info saved successfully!");
  })
  .catch(function (error) {
    console.error("Error saving tab info:", error);
  });
}


function calculateDuration(starttime, endtime){
  return endtime - starttime;
}

