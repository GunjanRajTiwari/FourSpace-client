const addQuestion = document.querySelector('#add-question-form');
const nameField = document.querySelector('#name');
const statementField = document.querySelector('#description');
const difficultyField = document.querySelector('#difficulty');
const pointsField = document.querySelector('#points');
const testcaseInputField = document.querySelector('#testcases');
const expectedOutputField = document.querySelector('#output');

window.onload = () => {
    const params = new URL(location.href).searchParams;
    const cid = params.get("cid");
    if(!cid){
        location.href = '/contest.html';
    }else{
        fetch(`${domain}/contest/${cid}`, {
            headers: {
                "Content-type": "application/json",
                "token": token
            },
        }).then(res => res.json())
        .then(result => {
            console.log(result);
        })
    }
}

    

// window.onload = () => {
//     const params = new URL(location.href).searchParams;
//     const cid = params.get("cid");
//     if(!cid){
//         location.href = '/contest.html';
//     }else{
//         fetch(`${domain}/contest/${cid}`, {
//             headers: {
//                 "Content-type": "application/json",
//                 "token": token
//             },
//         }).then(res => res.json())
//         .then(result => {
//             console.log(result);
//         })
//     }

//     // const token = localStorage.getItem("token");
//     // console.log(token);
//     // if (!token) {
//     //     location.href = "/contest.html";
//     // }
    
//     addQuestion.onsubmit = submitQuestion;

//     function submitQuestion(e) {
//     e.preventDefault();
//     const name = nameField.value;
//     const statement = statementField.value;
//     const difficulty = difficultyField.value;
//     const points = pointsField.value;
//     const testcaseInput = testcaseInputField.value;
//     const expectedOutput = expectedOutputField.value;
//     if (name && statement && difficulty && points && testcaseInput && expectedOutput) {
//         fetch(domain + "/contest", {
//                 method: "POST",
//                 headers: {
//                     "Content-type": "application/json; charset=UTF-8",
//                     "token": token
//                 },
//                 // mode: "no-cors", //cross origin resource sharing
//                  body: JSON.stringify({ name, statement, difficulty, points, testcaseInput, expectedOutput }),
//             })
//             .then((res) => res.json())
//             .then((result) => {
//                 console.log(result);
//                 alert("Question created Successfully!!");
//                 location.href = `/contest.html/cid=${cid}`;
//             })
//             .catch((e) => alert("Question creation failed!!"));
//         }
//     }
// };