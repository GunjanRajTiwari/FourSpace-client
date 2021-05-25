// Dynamic Navigation bar
var domain = "https://fourspace.herokuapp.com";


var token = localStorage.getItem("token");

const links = document.createElement("div");
links.classList.add("nav-links");

if (!token) {
    links.innerHTML = `
            <a href="/register.html" class="nav-link">Register</a>
            <a href="/login.html" class="nav-link">Login</a>
        `;
} else {
    links.innerHTML = `
            <a href="/profile.html" class="nav-link">Profile</a>
            <a href="/contests.html" class="nav-link">Contests</a>
            <a href="/leaderboard.html" class="nav-link">Top</a>
        `;
}

document.getElementById("navbar").appendChild(links);

function showError(error) {
    console.log(error);
    document.getElementsByClassName("container")[0].innerHTML = `
    <div class="error">
    ${error}
    </div>
    `;

}


// Nav bar end

// document.getElementById("logout").addEventListener("click", () => {
//     localStorage.removeItem("token");
//     location.href = "/login.html";
// });