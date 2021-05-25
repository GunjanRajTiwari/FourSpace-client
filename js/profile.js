var domain = "https://fourspace.herokuapp.com";
var btn = document.getElementById("btn");

function show_details(user) {
    var name = user.name;
    var email = user.email;

    document.getElementById("name").innerHTML = "Name: " + name;
    document.getElementById("email").innerHTML = "Email: " + email;

    if (user.type == "user") {
        var rating = user.rating;
        var stars = "⭐";
        for (var i = 0; i < Math.ceil(user.rating / 500); ++i) {
            stars += "⭐";
        }
        var available = user.available ? "YES" : "NO";
        document.getElementById("ratings").innerHTML = "Rating: " + rating;
        document.getElementById("stars").innerHTML = "Stars: " + stars;
        document.getElementById("available").innerHTML = "Available for hire: " + available;
    } else {
        var openings = user.openings;
        var stars = "⭐⭐⭐⭐⭐";

        document.getElementById("ratings").innerHTML = "Openings: " + openings;
        document.getElementById("stars").innerHTML = "Stars: " + stars;
    }
}

window.onload = function() {
    var token = localStorage.getItem("token");
    // if (!token) {
    //     location.href = "/login.html";
    //     return;
    // }
    const params = new URL(location.href).searchParams;
    var email = params.get("email");
    if (!email) {
        email = "";
    } else {
        btn.innerHTML = "";
    }
    console.log(email);
    fetch(`${domain}/profile/${email}`, {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "token": token
            },
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            if (result.error) {
                showError(result.error);
            } else {
                show_details(result);
            }
        })
        .catch((e) => {
            console.log(e);
            showError(e);
        });
};

document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    location.href = "/login.html";
});