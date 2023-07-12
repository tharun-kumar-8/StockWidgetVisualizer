var dark=0;
function toggle()
{
    if(dark==0)
    { 
      document.documentElement.setAttribute('data-theme', 'dark');
      document.getElementById('image').src = "pictures/light.svg";
      dark = 1;
    }
    else if (dark==1)
    {
      document.documentElement.setAttribute('data-theme', 'light');
      document.getElementById('image').src = "pictures/dark.svg";
      dark = 0;
    }
}

function openCalc(evt, calcName) 
{
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(calcName).style.display = "block";
  evt.currentTarget.className += " active";
}

function calculate()
{
  var buy = parseInt($("#buy").val());
  var sell = parseInt($("#sell").val());
  var quantity = parseInt($("#quantity").val());
  if(buy=="" || sell=="" || quantity=="" || buy<=0 || sell<=0 || quantity<=0)
  {
    alert("Enter valid details");
  }
  else 
  {
    var result = Math.abs((buy*quantity)-(sell*quantity));
    if(sell>buy)
    {
      $("#result").css("color","#00A300");
      document.getElementById("result").innerHTML = "Total profit is "+result+"$";
    }
    else if(buy>sell)
    {
      $("#result").css("color","#D10000");
      document.getElementById("result").innerHTML = "Total loss is "+result+"$";
    }
    else if(buy==sell)
    {
      document.getElementById("result").innerHTML = "No profit or loss"+"$";
    }
  }
}

function calculate_interest()
{
  var amo = parseInt($("#amount").val());
  var interest = parseInt($("#inte").val());
  var dur = parseInt($("#duration").val());
  if(dur=="" || dur<=0 || amo=="" || amo<=0 || interest=="" || interest<=0)
  {
    alert("Enter valid details");
  }
  else
  {
    var result = 0;
    for(var i=0;i<dur;i++)
    {
      result += amo*(interest/100);
      amo += result;
      result = amo;
    }
    $("#result1").css("color","#00A300");
    document.getElementById("result1").innerHTML = "Your principal amount <br>at the end of "+dur+" year(s) is "+Math.trunc(result);
  }
}

function convert()
{
  var from = ($("#from").val());
  var to = ($("#to").val());
  var amoun = ($("#amoun").val());
  var url = "https://currency-converter13.p.rapidapi.com/convert?from="+from+"&to="+to+"&amount="+amoun;
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": url,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "currency-converter13.p.rapidapi.com",
      "x-rapidapi-key": "852305e598msh1de79a9f9de5a20p1e2cacjsned4a66bc146c"
    }
  };

  $.ajax(settings).done(function (response) {
    var res = response["amount"];
    document.getElementById("result2").innerHTML = amoun+" "+from+" = "+res.toFixed(2)+" "+to;
  });
}