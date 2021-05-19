var domain = "https://fourspace.herokuapp.com";

const form = document.getElementById("login-form");
form.addEventListener("submit", login);

function login(e) {
    e.preventDefault();
    var data = {};
    var user_type = document.getElementsByName("choice");
    for (i = 0; i < user_type.length; i++) {
        if (user_type[i].checked) {
            data.type = user_type[i].value;
        }
    }
    data.email = document.getElementById("email").value;
    data.password = document.getElementById("pw").value;
    console.log(data);
    fetch(domain + "/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        // mode: "no-cors", //cross origin resource sharing
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((result) => {
            if(result.error){
                location.href = '/register.html'
            } else {
                localStorage.setItem("token", result.token);
                location.href = "/profile.html";
            }
            
        })
        .catch((e) => console.log(e));
}
