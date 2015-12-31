chrome.storage.sync.get("logFile", function(items) {
    if (!chrome.runtime.error) {
			// Get the div tag
			var content = document.getElementsByClassName("log-content")[0];
			
			// Create a h5 tag with log contents
			var p = document.createElement("p");
			p.innerHTML = items.logFile;
			content.appendChild(p);
    }
  });