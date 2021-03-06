var domain = "https://fourspace.herokuapp.com";
var contestList = document.getElementById("contest-list");

function enterContest(id) {
    location.href = "/contest.html?cid=" + id;
}

window.onload = function() {
    contestList.innerHTML = "Loading ...";
    const token = localStorage.getItem("token");
    console.log("success");
    fetch(domain + "/contests", {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "token": token
            },
        })
        .then((response) => response.json())
        .then((result) => {
            if (result.error) {
                showError(result.error);
                return;
            }
            console.log(result);
            const authUser = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));
            if (authUser.type === "company") {
                const floatBtn = document.createElement("button");
                floatBtn.innerText = "+";
                floatBtn.classList.add("float-btn");
                floatBtn.onclick = () => {
                    location.href = "/addContest.html";
                };
                document.body.append(floatBtn);
            }
            contestList.innerHTML = "";
            result.contests.forEach((contest) => {
                var contestBox = document.createElement("div");
                contestBox.classList.add("contest");
                contestBox.innerHTML += `
                <div class="info">
                    <p>${contest.company_email}</p>
                    <h3 class="big">${contest.name}</h3>
                </div>
                <div class="enter">
                    <button type="button" id="enter" onclick="enterContest(${contest.id})">Enter</button>
                </div>
                `;
                contestList.appendChild(contestBox);
            });
        });
};