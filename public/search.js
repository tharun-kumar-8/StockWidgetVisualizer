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

function show()
{
    $('.tradingview-widget-container').remove();
    var symbol = document.getElementById("sym").value;
    
    $('#ss').append('<div style="margin-left:-400px;" class="tradingview-widget-container">'+
      '<div class="tradingview-widget-container__widget"></div>'+
      '<div class="tradingview-widget-copyright"><a href="https://in.tradingview.com/symbols/NASDAQ-'+symbol+
      '/financials-overview/" rel="noopener" target="_blank"><span class="blue-text"></span>'+
      '</a> </div>'+
      '<script type="text/javascript" src="https://s3.tradingview.com/external-embedding/'+
      'embed-widget-financials.js" async>'+
      '{"symbol": "NASDAQ:'+symbol+'",'+
      '"colorTheme": "dark",'+
      '"isTransparent": false,'+
      '"largeChartUrl": "",'+
      '"displayMode": "regular",'+
      '"width": 480,'+
      '"height": 830,'+
      '"locale": "in"'+
    '}'+
      '</script>'+
    '</div>'+
    '<div style="margin-left:300px; margin-top:-825px"class="tradingview-widget-container">'+
      '<div class="tradingview-widget-container__widget"></div>'+
      '<div class="tradingview-widget-copyright"><a href="https://in.tradingview.com/symbols/NASDAQ-'+symbol+
      '/" rel="noopener" target="_blank"></a></div>'+
      '<script type="text/javascript" src="https://s3.tradingview.com/external-embedding/'+
      'embed-widget-symbol-profile.js" async>'+
      '{'+
      '"symbol": "NASDAQ:'+symbol+'",'+
      '"width": 480,'+
      '"height": 650,'+
      '"colorTheme": "dark",'+
      '"isTransparent": false,'+
      '"locale": "in"'+
    '}'+
      '</script></div>');
    $('#sym').val('');

}

