var domain = "https://fourspace.herokuapp.com";

const contestForm = document.getElementById("contest-form");
const nameField = document.getElementById("name");
const infoField = document.getElementById("info");

window.onload = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
        location.href = "/login.html";
    }

    contestForm.onsubmit = submitQuestion;

    function submitQuestion(e) {
        e.preventDefault();
        const name = nameField.value;
        const info = infoField.value;
        if (name && info) {
            fetch(domain + "/contests", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "token": token
                    },
                    // mode: "no-cors", //cross origin resource sharing
                    body: JSON.stringify({ name, info }),
                })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    alert("Contest created Successfully!!");
                    location.href = "/contests.html";
                })
                .catch((e) => alert("Contest creation failed!!"));
        }
    }
};