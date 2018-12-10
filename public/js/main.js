// main.js

let currentPage = "";

$("#menu-toggle").click(function(e) {
	e.preventDefault();
	$("#wrapper").toggleClass("toggled");
});

function loadPage(url){
	if (currentPage != url){
		$.ajax({
			type: "GET",
			url: url,
			success: response => {
				console.log("AJAXed successfully");
				$('div.container-fluid').html(response);
				currentPage = url;
			},
			error: error => {
				console.log("Error while AJAXING:", error);
			}
		});
	}
}

function login(){
	let username = $('#username').val();
	let password = $('#password').val();
	if (username.length > 1 && password.length > 1){
		$.ajax({
			type: "POST",
			url: 'login',
			data: {
				username: username,
				password: password
			},
			success: response => {
				console.log("response:", response);
				if (response.id){
					window.location.href = window.location.href.replace('login', 'dashboard');
				} else {
					alert("Login failed, Server sagt nein");
				}
			},
			error: error => {
				console.log("Error", error);
			}
		});
	} else {
		$('#invalidModal').modal({backdrop: true});
	};
}