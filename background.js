browser.runtime.onInstalled.addListener((request, sender, sendResponse) => {
    console.log(request.storage);
    console.log("EAAAAAAAAAAAAAAE");
    if (request.storage == "localStorage") {
      sendResponse({ 
        data: Object.entries(localStorage) 
      });
    }
  });

(function() { 
    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log("Running background task");
        if (request.storage == "localStorage") {
          sendResponse({ 
            data: Object.entries(localStorage) 
          });
        }
      });
 })();