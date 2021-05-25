const title = document.getElementById("title");
const company = document.getElementById("company");
const info = document.getElementById("info");
const questions = document.getElementById('questions');

function solve(qid){
    location.href = '/question.html?qid='+qid;
}

window.onload = () => {
    const params = new URL(location.href).searchParams;
    const cid = params.get("cid");
    if (!cid) {
        location.href = "/contests.html";
    } else {
        fetch(`${domain}/contests/${cid}`, {
                headers: {
                    "Content-type": "application/json",
                    "token": token
                },
            }).then(res => res.json())
            .then(result => {
                console.log(result);

                const authUser = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));
                if (authUser.type === "company") {
                    const floatBtn = document.createElement("button");
                    floatBtn.innerText = "+";
                    floatBtn.classList.add("float-btn");
                    floatBtn.onclick = () => {
                        location.href = '/addquestion.html?cid='+ cid;
                    };
                    document.body.append(floatBtn);
                }

                title.innerHTML = result.name;
                company.innerHTML = result.company_email;
                info.innerHTML = result.info;

                questions.innerHTML='';
                if(result.questionCount===0){
                    questions.innerHTML = "No questions added 🙁"
                } else {
                    result.questions.forEach((problem, index) => {
                        const question = document.createElement('div');
                        question.classList.add('question');
                        question.innerHTML=`
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