theLocalhostUrl = 'http://localhost:8080/ladders';
theHostedSiteUrl = 'https://immense-headland-50105.herokuapp.com/ladders';

$(document).ready(function() {
	console.log("index.html loaded.")
});

$("#selectLeagueInputGroup").change(function(){
    var selected = $('#selectLeagueInputGroup option:selected').val();
    console.log("Selected League : " + selected);      
    getLeagueData(selected);
});

var getLeagueData = function(selectedLeague) {
    $.ajax({
        url: theHostedSiteUrl,
        type: 'GET',
        dataType: "json",
        data : {
        	league : selectedLeague
        },
        success: function(results) {
        	console.log(results)
            populateLeagueTable(results);
        },
        error: function(error) {
            console.log("getLeagueData error : " + error.responseJSON.message, "error");
        }
    });
};

var populateLeagueTable = function(results) {
    $('#leagueInfoTable').dataTable().fnDestroy();
    $("#leagueInfoTable tbody").empty();
    $("#leagueInfoTableContainer").css({
        "display": "block"
    });
    
    results.forEach(function(data) {
    	var character = data.character;
    	if(data.dead == "true") {
    		character += " <i id='deadStatus'>(dead)</i>";
    	}
    	
    	var account = "";
    	if(data.online == "true") {
    		account = "<img class='img-valign' src='/images/green-icon.png' title='online' />   " + data.account;
    	} else {
    		account = "<img class='img-valign' src='/images/red-icon.png' title='offline' />   " + data.account;
    	}
    	
	    $('#leagueInfoTable tbody').append(
	            '<tr>' +
		    		'<td>' + data.rank + '</td>' +
		    		'<td>' + account + '</td>' +
		    		'<td>' + character + '</td>' +
		    		'<td>' + data.level + '</td>' +
		    		'<td>' + data.theClass + '</td>' +
		    		'<td>' + data.challenges + '</td>' +
		    		'<td>' + data.experience + '</td>' +
	    		'</tr>'
	     );
    });
    
    $('#leagueInfoTable').DataTable({        
//        searching: true,
//        deferRender: true,
//        scrollY: 310,
//        scrollCollapse: true,
//        scroller: true
    	"iDisplayLength": 50,
    	fixedHeader: true
    });
 
};