
//   async function localStorage(tabs) {
//     let tab = tabs.pop();
  
//     const response = await browser.tabs.sendMessage(tab.id, {
//       localStorage: "localStorage",
//     });
  
//     let localStorage = document.getElementById("local-storage");
//     let text = document.createTextNode(
//       response.data.length
//     );
//     documentLocalStorage.appendChild(text);
//   }
// function getActiveTab() {
//     return browser.tabs.query({ currentWindow: true, active: true });
//   }  
//   getActiveTab().then(localStorage);