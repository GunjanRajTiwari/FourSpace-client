var domain = "https://fourspace.herokuapp.com";

const form = document.getElementById("register-form");
form.addEventListener("submit", register);

function register(e) {
    e.preventDefault();
    var p1 = document.getElementById("pw").value;
    var p2 = document.getElementById("pw1").value;
    if (p1 != p2) {
        alert("Different passwords");
        return;
    }
    var data = {};
    var user_type = document.getElementsByName("choice");
    for (i = 0; i < user_type.length; i++) {
        if (user_type[i].checked) {
            data.type = user_type[i].value;
        }
    }

    console.log(JSON.stringify(data));
    data.name = document.getElementById("name").value;
    data.email = document.getElementById("email").value;
    data.password = document.getElementById("pw").value;
    console.log(data);
    fetch(domain + "/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            // mode: "no-cors", //cross origin resource sharing
            body: JSON.stringify(data),
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((e) => console.log(e));
}