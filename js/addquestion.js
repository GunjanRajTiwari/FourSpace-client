var domain = "https://fourspace.herokuapp.com";

const addQuestion = document.querySelector("#add-question-form");
const nameField = document.querySelector("#name");
const statementField = document.querySelector("#description");
const difficultyField = document.querySelector("#difficulty");
const pointsField = document.querySelector("#points");
const testcaseInputField = document.querySelector("#testcases");
const expectedOutputField = document.querySelector("#output");
const submitBtn = document.querySelector("#submit");

const params = new URL(location.href).searchParams;
const cid = params.get("cid");
console.log(cid);

function submitQuestion(e) {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.value = "Adding...";

    const title = nameField.value;
    const statement = statementField.value;
    const difficulty = difficultyField.value;
    const points = pointsField.value;
    const testcase = testcaseInputField.value;
    const output = expectedOutputField.value;

    if (!cid) {
        location.href = "/contest.html";
    } else {
        fetch(domain + "/question", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "token": token,
            },
            body: JSON.stringify({ cid, title, statement, difficulty, points, testcase, output }),
        })
            .then(response => response.json())
            .then((result) => {
                if (result && result.error) {
                    showError(result.error);
                } else {
                    alert("Question Created Successfully!")
                    location.href = "/contests.html"
                }
                // console.log(result);
                
            })
            .catch((e) => {
                console.log("You fucked up");
                // showError(e)
                location.href = "/contests.html"
            });
    }
}

addQuestion.onsubmit = submitQuestion;
