var domain = "https://fourspace.herokuapp.com";

function show_details(user) {
    var name = user.name;
    var email = user.email;
    var rating = user.rating;
    var stars = "⭐";
    for (var i = 0; i < Math.ceil(user.rating / 500); ++i) {
        stars += "⭐";
    }
    var available = user.available ? "YES" : "NO";
    document.getElementById("name").innerHTML = "Name: " + name;
    document.getElementById("email").innerHTML = "Email: " + email;
    document.getElementById("ratings").innerHTML = "Rating: " + rating;
    document.getElementById("stars").innerHTML = "Stars: " + stars;
    document.getElementById("available").innerHTML = "Available: " + available;
}

window.onload = function () {
    var token = localStorage.getItem("token");
    if (!token) {
        location.href = "/login.html";
        return;
    }

    fetch(domain + "/profile", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        // mode: "no-cors", //cross origin resource sharing
        body: JSON.stringify({ token }),
    })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            show_details(result);
        })
        .catch((e) => console.log(e));
};

document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    location.href = "/login.html";
});
