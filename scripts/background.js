function count_time(start_date) {
	let current_date = new Date();
	let dif_time = Math.floor((current_date.getTime()-start_date.getTime()));

    let total_seconds =parseInt(localStorage.total_time);
    
    total_seconds += dif_time;
    localStorage.total_time = total_seconds;
    setTimeout(function(){count_time(current_date);}, 1000*60);
}

let date = new Date();

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message == 'get_start_date'){
        sendResponse(date.getTime());
    }
});

count_time(date);
