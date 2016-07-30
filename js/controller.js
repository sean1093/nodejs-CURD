  

function sumbit(){
	var name = document.getElementById("name").value;
	var id = document.getElementById("id").value;
	var pwd = document.getElementById("pwd").value;
	var email = document.getElementById("email").value;
	console.info("name: "+name);
	console.info("id: "+id);
	console.info("pwd: "+pwd);
	if (name===null) {
		alert("Please input your name.");
	}
	else if(id===null){
		alert("Please input your id.");
	}
	else if(pwd===null){
		alert("Please input your password.");
	}
	else if(email===null){
		alert("Please input your email.");
	}
	else{
		var data = {};
		data.name = name;
		data.id = id;
		data.pwd = pwd;
		data.email = email;
		
		// if(query(id)===null){
		// 	alert("Please re-enter your id, this is has been used.");
		// 	document.getElementById("id").value = null;
		// }
		// else{
			$.ajax({
				type: 'get',
				data: data,
		        contentType: 'application/json',
		        url: 'http://localhost:8000/insert',						
		        success: function(data) {
		            console.log('success');
		            console.log(data);
		        }
		    });

		    document.getElementById("name").value = null;
			document.getElementById("id").value = null;
			document.getElementById("pwd").value = null;
			document.getElementById("email").value = null;				
		// }
	
	}


}

function query(id) {
	// if (id===undefined) {
	id = document.getElementById("id").value;
	// }
	console.log("id:"+id);
	var data={};
	data.id = id;
	$.ajax({
		type: 'get',
		// data: data,
        contentType: 'application/json',
        url: 'http://localhost:8000/query',						
        success: function(data) {
			console.log('success');
        	console.log(data);
			var table = document.getElementById("userTable");
			var startRow = 1;
			deleteTable("userTable", startRow);
        	for (var idx in data) {
        		var row = table.insertRow(startRow);
        		var tableName = row.insertCell(0);
				var tableId = row.insertCell(1);
				var tablePassword = row.insertCell(2);
				var tableEmail = row.insertCell(3);
        		
        		tableName.innerHTML = data[idx].name;
				tableId.innerHTML = data[idx].id;
				tablePassword.innerHTML = data[idx].password;
				tableEmail.innerHTML = data[idx].email;
				startRow++;
        	}

        	return data;
            
        },
        error: function (ajaxContext) {
        	console.log(ajaxContext.responseText);
    	}
    });
}


function deleteUser(){
	var target = document.getElementById("deleteId").value;
	console.log("id:"+target);
	var data={};
	data.target = target;
	$.ajax({
		type: 'get',
		data: data,
        contentType: 'application/json',
        url: 'http://localhost:8000/delete',						
        success: function(data) {
            console.log('success');
            console.log(data);
        }
    });
}

function deleteTable(tableId, startRow){
	var table = document.getElementById(tableId);
	var tableRows = table.getElementsByTagName('tr');
	var rowCount = tableRows.length;
	for (var x=rowCount-1; x>0; x--) {
	   table.deleteRow(x);
	}

}
