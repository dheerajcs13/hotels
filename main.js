var dataReq = new XMLHttpRequest();
dataReq.onreadystatechange = function(){
	if((dataReq.readyState === 4) && (dataReq.status===200)){
		var obj = JSON.parse(dataReq.responseText);
		var output  = "<select	id=\"mySelect\"> <option value = \"none\" selected>--</option>";
		
		for(var i= 0 ;i<5;i++){
			output += "<option value=\"";
			output += obj[i].area;
			output += "\">";
			output += obj[i].area;
			output += "</option>"
		}
		output += "</select>"
		var input = document.querySelector('#areas');
		input.innerHTML = output;
		var hot = document.querySelector('#mySelect');
		hot.addEventListener('change',function(e){
			var x = document.querySelector("#hotels");
			var y;
			for(var j= 0 ;j<5;j++){
				y = "<h3>" + obj[j].area + "</h3><table>";
				y += "<tr><th>Serial No</th><th>Name</th><th>Speciality</th><th>Rating</th></tr>"
				if(obj[j].area == e.target.value){
					for(var m in obj[j].hotels ){
						y += "<tr>";
						y += "<td>" + m + "</td>";
						y += "<td>" + obj[j].hotels[m].name + "</td>";
						y += "<td>" + obj[j].hotels[m].Speciality + "</td>";
						y += "<td>" + ratings(obj[j].hotels[m].rating) + "</td>";
						y += "</tr>";
					}
					x.innerHTML = y;	
				}
			}
			y += "</table>";
			//document.querySelector("#hotels").childNodes[0].nodeValue = null;
			if(e.target.value == "none"){
					x.innerHTML = "";
				}
		},false);
	}
}

dataReq.open('POST','http://localhost/hotel/data.txt');
dataReq.send();
function ratings(a){
	var star = "";
	for(var q = 0 ; q < a; q++){
		star += "<span class=\"fa fa-star checked\"></span>";
	}
	for(var q = 0 ; q < (5-a); q++){
		star += "<span class=\"fa fa-star \"></span>";
	}
	return star;
}
