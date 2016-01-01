chrome.storage.sync.get("logFile", function(items) {
    if (!chrome.runtime.error) {
		
		// Get the div tag
		var tag = document.getElementsByClassName("log-content")[0];
		
		// Create an h5 tag
		var p = document.createElement("p");
		
		// Get the logfile contents
		var content = items.logFile;
		if (content)
			p.innerHTML = items.logFile;
		else
			p.innerHTML = "The logfile is empty!";
		
		tag.appendChild(p);
			
    }
  });