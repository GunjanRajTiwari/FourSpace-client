var domain = "https://fourspace.herokuapp.com";
var contestList = document.getElementById("contest-list");

window.onload = function () {
    console.log("success");
    fetch(domain + "/contests")
        .then((response) => response.json())
        .then((result) => {
            result.contests.forEach((contest) => {
                console.log(contest);
                var contestBox = document.createElement("div");
                contestBox.classList.add("contest");
                contestBox.innerHTML = `
                <div class="info">
                    <p>${contest.company_email}</p>
                    <h3 class="big">${contest.name}</h3>
                </div>
                <div class="enter">
                    <button type="button" id="enter">Enter</button>
                </div>
                `;
                contestList.appendChild(contestBox);
            });
        });
};
