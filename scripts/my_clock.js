function format_time(time) {
	let h=Math.floor(time/(3600*1000));
	let left_m=time%(3600*1000);
    let m=Math.floor(left_m/(60*1000));
    let left_s=left_m%(60*1000);
    let s=Math.round(left_s/1000);
    m=m>=10?m:('0'+m);
    s=s>=10?s:('0'+s);
    return [h,m,s];
}


function my_clock(el,el2,el3,start_time,total_time){
    let current_date=new Date();
    let h=current_date.getHours();
    let m=current_date.getMinutes();
    let s=current_date.getSeconds();
    m=m>=10?m:('0'+m);
    s=s>=10?s:('0'+s);
    el.innerHTML = h+":"+m+":"+s;

    let dif_date = current_date.getTime()-parseInt(start_time); 
	let h_d=Math.floor(dif_date/(3600*1000));
	let left_m=dif_date%(3600*1000);
    let m_d=Math.floor(left_m/(60*1000));
    let left_s=left_m%(60*1000);
    let s_d=Math.round(left_s/1000);
    m_d=m_d>=10?m_d:('0'+m_d);
    s_d=s_d>=10?s_d:('0'+s_d);

    el2.innerHTML = (" 工时：" + h_d + ":"+m_d+":"+s_d);

    f_t = format_time(total_time+dif_date);
    el3.innerHTML = (" 累计工时：" + f_t[0] + ":"+f_t[1]+":"+f_t[2]);

    setTimeout(function(){my_clock(el,el2,el3,start_time,total_time)}, 1000);
}

let clock_div = document.getElementById('clock_div');
let working_hours = document.getElementById('working_hours');
let total_working_hours = document.getElementById('total_working_hours');
let total_time = parseInt(localStorage.total_time);

chrome.runtime.sendMessage('get_start_date', function(response){
	my_clock(clock_div,working_hours,total_working_hours,response,total_time);
});

