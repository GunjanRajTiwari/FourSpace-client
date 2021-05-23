var domain = "https://fourspace.herokuapp.com";

const table = document.getElementById("table");

window.onload = async () => {
    const response = await fetch(domain + "/leaderboard");
    const result = await response.json();
    console.log(result);
    result.users.forEach((user, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <span>#${index + 1}</span>
        <span>${user.name}</span>
        <span>${user.rating}🏆</span>`;
        table.appendChild(div);
    });
};
