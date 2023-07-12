function disnews()
{
	const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://cnbc.p.rapidapi.com/news/v2/list-trending?tag=Articles&count=30",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "cnbc.p.rapidapi.com",
		"x-rapidapi-key": "852305e598msh1de79a9f9de5a20p1e2cacjsned4a66bc146c"
		}
	};

	$.ajax(settings).done(function (response) {
		console.log(response);

		var res = response["data"]["mostPopularEntries"]["assets"];
		console.log(res[0]["shorterHeadline"]);
		for(var i=0;i<Object.keys(res).length;i++)
		{
			console.log("HIiii");
			$("#newss").append('<div class="news" style="border: 1px solid black";>'+
				'<div class="image"><img src="'+res[i]["promoImage"]["url"]+'"></div><p class="headline">'+res[i]["shorterHeadline"]+
				'</p><br>'+'<a href="'+res[i]["url"]+'" class="desc">'+res[i]["description"]+'</a>'+'</div>');
			//$("#newss").css("max-height","10%");
		}
	});
}