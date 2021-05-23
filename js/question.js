const editorDiv = document.getElementById("editor");
const langSelect = document.getElementById("lang");
const inputField = document.getElementById("input");
const outputField = document.getElementById("output");
const questionDiv = document.getElementById('question');
var domain = "https://fourspace.herokuapp.com";
const params = new URL(location.href).searchParams;
const question = params.get("qid");

var editor = CodeMirror(editorDiv, {
    lineNumbers: true,
    lineWraping: true,
    mode: "clike",
    theme: "dracula",
    lint: true,
    indentUnit: 4,
    tabSize: 4,
    smartIndent: true,
    closeBrackets: true,
    value: "",
});

langSelect.onchange = () => {
    var toLang = langSelect.value;
    if (toLang == "java") {
        toLang = "text/x-java";
    }
    editor.setOption("mode", toLang);
};

const langMap = {
    python: "py",
    clike: "cpp",
    java: "java",
};

window.onload = async() => {
    try {
        const response = await fetch(domain + "/question/" + question, {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "token": token,
            },
        });
        const problem = await response.json();
        console.log(problem);
        questionDiv.innerHTML = `
        <h1 class="title">${problem.title}</h1>
        <p class="statament">
            ${problem.statement}
        </p>
        <div class="info">
            <span>Difficulty: ${problem.difficulty}</span>
            <span>Points: ${problem.points}</span>
        </div>
        `;

    } catch (e) {
        console.log(e);
    }
};

async function run() {
    try {
        outputField.value = "Running ...";
        var code = editor.getValue();
        var language = langSelect.value;
        var input = inputField.value;
        var token = localStorage.getItem("token");
        if (!token) {
            location.href = "/login.html";
        }

        var response = await fetch(domain + "/run", {
            method: "POST",
            // mode: "no-cors",
            headers: {
                "Content-type": "application/json",
                "token": token,
            },

            body: JSON.stringify({
                code,
                language: langMap[language],
                input,
            }),
        });
        var output = await response.json();
        if (output.error) {
            showError(output.error);
            return;
        }
        if (output.status == "1") {
            outputField.style.outline = "2px solid green";
        } else {
            // outputField.value = output.message;
            outputField.style.outline = "2px solid red";
        }
        outputField.value = output.output;
    } catch (e) {
        outputField.value = "";
        console.log(e);
        showError(e);
    }
}

// Submit code
async function submit() {
    try {
        outputField.value = "Running ...";
        var code = editor.getValue();
        var language = langSelect.value;
        var input = inputField.value;
        var token = localStorage.getItem("token");
        if (!token) {
            location.href = "/login.html";
        }

        var response = await fetch(domain + "/submit", {
            method: "POST",
            // mode: "no-cors",
            headers: {
                "Content-type": "application/json",
                "token": token,
            },

            body: JSON.stringify({
                question,
                code,
                language: langMap[language],
            }),
        });
        var output = await response.json();
        if (output.status == "1") {
            outputField.style.outline = "2px solid green";
        } else {
            outputField.style.outline = "2px solid red";
        }
        outputField.value = output.message;
    } catch (e) {
        outputField.value = "Something went wrong!";
        console.log(e);
    }
}