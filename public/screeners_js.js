var dark=0;
function toggle()
{
    if(dark==0)
    {	
    	document.documentElement.setAttribute('data-theme', 'dark');
    	document.getElementById('image').src = 'pictures/light.svg';
    	dark = 1;
    }
    else if (dark==1)
    {
    	document.documentElement.setAttribute('data-theme', 'light');
    	document.getElementById('image').src = 'pictures/dark.svg';
    	dark = 0;
    }
}


function dis()
{

	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://nse-data1.p.rapidapi.com/top_gainers",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "nse-data1.p.rapidapi.com",
			"x-rapidapi-key": "852305e598msh1de79a9f9de5a20p1e2cacjsned4a66bc146c"
		}
	};

	$.ajax(settings).done(function (response) {
		console.log(response["body"]["NIFTY"]["data"]);
		var res = response["body"]["NIFTY"]["data"];
		console.log(Object.keys(res).length);
		for(var i=0;i<Object.keys(res).length;i++)
		{
			$("#gainers").append('<tr><td>'+res[i]["symbol"]+'</td><td>'+res[i]["open_price"]+'</td><td>'+
				res[i]["high_price"]+'</td><td>'+res[i]["low_price"]+'</td><td>'+
				res[i]["perChange"]+'</td></tr>');
		}
	});

	const settings1 = {
	"async": true,
	"crossDomain": true,
	"url": "https://nse-data1.p.rapidapi.com/top_loosers",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "nse-data1.p.rapidapi.com",
		"x-rapidapi-key": "852305e598msh1de79a9f9de5a20p1e2cacjsned4a66bc146c"
	}
	};

	$.ajax(settings1).done(function (response) {
		console.log(response);
		var res1 = response["body"]["NIFTY"]["data"];
		for(var i=0;i<Object.keys(res1).length;i++)
		{
			$("#losers").append('<tr><td>'+res1[i]["symbol"]+'</td><td>'+res1[i]["open_price"]+'</td><td>'+
				res1[i]["high_price"]+'</td><td>'+res1[i]["low_price"]+'</td><td>'+
				res1[i]["perChange"]+'</td></tr>');
		}
	});

}



