document.getElementById('viewLogFileButton').onclick = function openLogFile() {
	window.open('../logs.html', 'Log File')
}

document.getElementById('clearLogFileButton').onclick = function clearLogFile() {
	chrome.storage.sync.get("logFile", function(items) {
	    if (!chrome.runtime.error) {
			chrome.storage.sync.set({"logFile": ""});
	    }
	  });
}