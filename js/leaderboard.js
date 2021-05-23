var domain = "https://fourspace.herokuapp.com";

const table = document.getElementById("table");

window.onload = async() => {
    const params = new URL(location.href).searchParams;
    var cid = params.get("cid");
    var field = "score";
    console.log(cid);
    if (!cid) {
        cid = "";
        field = "rating";
    }
    fetch(`${domain}/leaderboard/${cid}`, {
            headers: {
                "Content-type": "application/json",
                "token": token
            }
        }).then(res => res.json())
        .then(result => {
            if (result.error) {
                showError(result.error);
            }
            console.log(result);
            result.users.forEach((user, index) => {
                const div = document.createElement("div");
                div.innerHTML = `
                <span>#${index + 1}</span>
                <span>${user.name}</span>
                <span>${user[field]}🏆</span>`;
                table.appendChild(div);
            });
        });
}