// Dynamic Navigation bar

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
        `;
}

document.getElementById("navbar").appendChild(links);

// Nav bar end

// document.getElementById("logout").addEventListener("click", () => {
//     localStorage.removeItem("token");
//     location.href = "/login.html";
// });
