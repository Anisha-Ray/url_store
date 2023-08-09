

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



  //referance your database
  function sendEmailToBackground(email) {
    chrome.runtime.sendMessage({ emailid: email });
  }

  document.getElementById('btn').addEventListener('click',function(submitForm){
      submitForm.preventDefault();

                            
    const emailid = document.getElementById('emailid').value;//function return value
     sendEmailToBackground(emailid);   //call the fun
    //enable alert
    document.querySelector(".alert").style.display = "block";
    

    //remove the alert
   setTimeout(()=>{
    document.querySelector(".alert").style.display = "none";
   },3000);

   //reset the form
   document.getElementById('contactForm').reset();         

  });
  
  


  