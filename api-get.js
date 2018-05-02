$(document).ready(function(){

$( "#zipButton" ).click(function() {

	$("#target-banner-error").empty();
	$("#zipResults").empty();
	
	//GATHER INFO
	var zipInput = $("#zipInput").val();
	var URL = "https://shipt-zip-code-test-api.herokuapp.com/api/zip_codes/"+zipInput;
	

	//ERROR HANDLING
	$.ajax({
		url: URL,
		type: 'GET',
		success: function(data){
			
			var location="";
			
			location += '<div id="zipResults" class="row text-center"><b>DELIVERING FROM:</b><br><br>';
			
			function zipAvailable(i){alert(i);}
			
			if(data.stores.length == 1 ){var s = 0;}
			
			else{var s = 1;}
			
			var i = 0;
			
				//CURRENT DATE
				var today = new Date();
				var dd = today.getDate();
				dd = ("0" + dd).slice(-2);
				var mm = today.getMonth();
				mm = ("0" + mm).slice(-2);
				var yyyy = today.getFullYear();
				var currentDate = yyyy+'-'+ mm +'-'+dd;
				currentDate = new Date(currentDate);
			
			while ( i < data.stores.length-s){
				
				var launchOrig = data.stores[i].launch_date;//JSON launch date data
				
				var launchDate = launchOrig.substr(0, 10);//Grabs only the useful stuff in the origina date yyyy/mm/dd
				
				var launchYr = launchOrig.substring(2, 4);//Launch year
				
				var launchMonth = launchOrig.substring(5, 7);//Launch Month
				
				var launchDate = new Date(data.stores[i].launch_date);
				
				if(Date.parse(launchDate) == Date.parse(currentDate)){launch="Launching Today!! Lucky you. You can be one of the first to try it.";}
				
				if(Date.parse(launchDate) < Date.parse(currentDate)){launch="Now Available";}
				
				else{launch = 'Coming '+launchMonth+' / '+launchYr;}
				
				if(data.stores.length == 1){location += '<div class="col-lg-12">';}
				
				else{location += '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">';}
				
				location +='<h3>'+data.stores[i].name +'</h3><p>'+ launch +'</p></div>';
				
				i++;
				
			}
			//}//else statement ends
			location +='<div class="btn button-lg shipt-button box-shadow txt-shadow text-center" style="width:193px;clear:both;margin:100px">GET STARTED</div></div>';
			$("#zipResults").replaceWith(location);
			
			
			//SORTING
			var list, i, switching, b, shouldSwitch;
			list = document.getElementById("zipResults");
			switching = true;
			while (switching) {
				switching = false;
				b = list.getElementsByTagName("DIV");
				for (i = 0; i < (b.length - 1); i++) {
					shouldSwitch = false;
				    if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
					shouldSwitch= true;
					break;
				}
			}
				if (shouldSwitch) {
					b[i].parentNode.insertBefore(b[i + 1], b[i]);
					switching = true;
				}
			}
		},
		error: function(data) {
			$( "#zipForm" ).addClass( "has-error" );
			//$( "#zipForm" ).addClass( "has-error" );
			$("#target-banner-error").replaceWith('<div id="target-banner-error">THIS ZIPCODE IS INVALID! PLEASE TRY AGAIN.</div>');
		}
	});
    });//get function
	
	
})//open function


