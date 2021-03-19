/*
var pwa = document.getElementById("pw1").value;
var pwb = document.getElementById("pw").value;
if (pwa != pwb) {
    alert("Passwords are not the same.");
}
*/
var domain = "localhost:8080";
const form = document.getElementById('register-form');
form.addEventListener('submit', register);

function register(e) {
    e.preventDefault();
    var p1 = document.getElementById("pw").value;
    var p2 = document.getElementById("pw1").value;
    if (p1 != p2) {
        alert("Different passwords");
        return;
    }
    var data = {};
    var user_type = document.getElementsByName('choice');
    for (i = 0; i < user_type.length; i++) {
        if (user_type[i].checked) {
            data.type = user_type[i].value;
        }
    }

    data.name = document.getElementById("name").value;
    data.email = document.getElementById("email").value;
    data.password = document.getElementById("pw").value;
    console.log(data);
    fetch(domain + "/register", {
        method: 'POST',
        mode: 'CORS', //cross origin resource sharing
        body: JSON.stringify(data)
    }).then(response => { //response is a veriable, can write anything there
        console.log(response.json());
    })

}