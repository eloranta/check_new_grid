// Regex-pattern to check URLs against. 

var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?www.chris\.org/;
var lineRegex = /^\d\d... \d\d:\d.*/;

// A function to use as callback
function doStuffWithDom(domContent) {
	var lines = domContent.split("\n");
	var numLines = lines.length;
	
	for (i = 0; i < numLines; i++) {
		var line = lines[i];
		if (lineRegex.test(line)) {
			console.log('xxx: ' + line);
		}
	}
}

// When the browser-action button is clicked...
chrome.browserAction.onClicked.addListener(function (tab) {
    // ...check the URL of the active tab against our pattern and...
    if (urlRegex.test(tab.url)) {
        // ...if it matches, send a message specifying a callback too
        chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
    }
});