function getThirdPartyDomains() {
  var dom = Array.prototype.map.call(
    document.querySelectorAll(
      "link, img, video, audio, script, iframe, source, embed"
    ),
    (HTMLtag) => {
      return HTMLtag.href || HTMLtag.src;
    }
  );

  return { thirdPtDomains: dom.length };
}

function onError(error) {
  console.error(`${error}`);
}

async function showCookiesForTab(tabs) {
  let tab = tabs.pop();

  // const responseLocalStorage = await browser.tabs.sendMessage(tab.id, { 
  //   type: "localStorageData"
  // }).catch(onError);

  // const responseThirdPt = await browser.tabs.sendMessage(tab.id, {
  //   type: "thirdPtDomains",
  // });

  // console.log(responseThirdPt.data);
  // console.log(responseLocalStorage.data);

  let gettingAllCookies = browser.cookies.getAll({url: tab.url});
  gettingAllCookies.then((cookies) => {

    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    } 

    //set the header of the panel
    let activeTabUrl = document.getElementById('header-title');
    let scoreNum = document.getElementById('score-num');
    let text = document.createTextNode("Cookies at: " + tab.title);
    let cookieList = document.getElementById('cookie-list');
    let stats = document.getElementById('stats');
    activeTabUrl.appendChild(text);

    let items;
    let sessionCookiesNum = 0;
    let thirdPartyCookiesNum = 0;
    let localStorageCookieNum = 0;

    let localStorageNum = 0;

    let cookieDomain;

    if (cookies.length > 0) {


      for (let cookie of cookies) {
        let li = document.createElement("li");
        let keys = document.createTextNode(Object.keys(cookie));
        let cookieNameValue = document.createTextNode(cookie.name + ': ' + cookie.value);
        let content1 = document.createTextNode(cookie.session);
        let content2 = document.createTextNode(cookie.sameSite);
        

        if (cookie.domain[0] == '.') {
          cookieDomain = cookie.domain.slice(1);
        } 
        else { 
          cookieDomain = cookie.domain;
        }

        if (tab.url.includes(cookieDomain)) thirdPartyCookiesNum++;

        if (cookie.session) sessionCookiesNum++;
        
        li.appendChild(cookieNameValue);
        cookieList.appendChild(li);
      }

      let length_score;

      // Using an average of 20 cookies
      // Optimization coming soon (one-line math formula)
      length_score = cookies.length/10;

      // Score is the percentage of session cookies and percentage of thirdParty cookies
      let score = Math.round(10 - (0.5 * (sessionCookiesNum/cookies.length) + 0.5 * (thirdPartyCookiesNum/cookies.length)) - length_score);
      

      let number = document.createElement("h4");
      let session = document.createElement("p");
      let first = document.createElement("p");
      let local = document.createElement("p");
      let localAll = document.createElement("p");

      let numCookies = document.createTextNode("Total number of cookies: " + cookies.length)
      let content = document.createTextNode("Session: " + sessionCookiesNum + " -> " + "Navigation: " + (cookies.length - sessionCookiesNum));
      let thirdParty = document.createTextNode("First-Party: " + (thirdPartyCookiesNum) + " -> " + "Third-Party: " + (cookies.length - thirdPartyCookiesNum));
      let localStorage = document.createTextNode("Items in Local Storage: " + localStorageNum);

      let scoreNode = document.createTextNode(score);
      
      let parent = stats;

      number.appendChild(numCookies);
      session.appendChild(content);
      first.appendChild(thirdParty);
      localAll.appendChild(localStorage);


      parent.appendChild(number);
      parent.appendChild(session);
      parent.appendChild(first);
      parent.appendChild(localAll);
      parent.appendChild(local);

      scoreNum.appendChild(scoreNode);

    } else {
      let p = document.createElement("p");
      let content = document.createTextNode("No cookies in this tab.");
      let parent = cookieList.parentNode;

      let scoreNode = document.createTextNode(10);

      p.appendChild(content);
      scoreNum.appendChild(scoreNode);
      parent.appendChild(p);
    }

  });
}

function getActiveTab() {
  
  return browser.tabs.query({currentWindow: true, active: true});
}

getActiveTab().then(showCookiesForTab);