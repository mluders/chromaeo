document.addEventListener('DOMContentLoaded', function() {
    var cb = document.getElementById('enabledCheckbox');
	
	chrome.storage.sync.get("chromaeoIsEnabled", function(items) {
		if (items.chromaeoIsEnabled)
			cb.checked = true;
		else
			cb.checked = false;
	});
	
    cb.addEventListener('click', function() {
        chrome.storage.sync.set( {"chromaeoIsEnabled": cb.checked} );
		
		chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
		    var activeTab = tabs[0];
			chrome.tabs.sendMessage(activeTab.id, {"message": "enabledChanged"});
		});
    });
});

document.getElementById('viewLogFileButton').onclick = function openLogFile() {
	window.open('../logs.html', 'Log File');
}

document.getElementById('clearLogFileButton').onclick = function clearLogFile() {
	
	chrome.storage.sync.get("logFile", function(items) {
		chrome.storage.sync.set( {"logFile": ""} ); 
	});
	
	window.open('../logs.html', 'Log File')
}