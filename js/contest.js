const title = document.getElementById("title");
const company = document.getElementById("company");
const info = document.getElementById("info");
const questions = document.getElementById('questions');
const leaderboard = document.getElementById('leaderboard');

function solve(qid) {
    location.href = '/question.html?qid=' + qid;
}

window.onload = () => {
    const params = new URL(location.href).searchParams;
    const cid = params.get("cid");
    if (!cid) {
        location.href = "/contests.html";
    } else {
        leaderboard.addEventListener('click', () => {
            location.href = '/leaderboard.html?cid=' + cid;
        })
        fetch(`${domain}/contests/${cid}`, {
                headers: {
                    "Content-type": "application/json",
                    "token": token
                },
            }).then(res => res.json())
            .then(result => {
                if (result.error) {
                    showError(result.error);
                    return;
                }
                console.log(result);
                title.innerHTML = result.name;
                company.innerHTML = result.company_email;
                info.innerHTML = result.info;

                questions.innerHTML = '';
                if (result.questionCount === 0) {
                    questions.innerHTML = "No questions added 🙁"
                } else {
                    result.questions.forEach((problem, index) => {
                        const question = document.createElement('div');
                        question.classList.add('question');
                        question.innerHTML = `
                        <span>
                        #${index+1} ${problem.title}
                        </span>
                        <button onclick="solve(${problem.id})" class="btn">Solve</button>
                        `;
                        questions.appendChild(question);
                    });
                }
            })
    }
}