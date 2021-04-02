const editorDiv = document.getElementById("editor");
const langSelect = document.getElementById("lang");
const inputField = document.getElementById("input");
const outputField = document.getElementById("output");
const url = "http://localhost:8080";

var editor = CodeMirror(editorDiv, {
    lineNumbers: true,
    lineWraping: true,
    mode: "clike",
    theme: "dracula",
    viewportMargin: 2,
    lint: true,
    closeBrackets: true,
    value: "",
});

langSelect.onchange = () => {
    editor.setOption("mode", langSelect.value);
};

const langMap = {
    python: "py",
    clike: "cpp",
    java: "java",
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

        var response = await fetch(url + "/run", {
            method: "POST",
            // mode: "no-cors",
            headers: {
                "Content-type": "application/json",
            },

            body: JSON.stringify({
                token,
                code,
                language: langMap[language],
                input,
            }),
        });
        var output = await response.json();
        if (output.status) {
            outputField.style.outline = "2px solid green";
        } else {
            outputField.value = output.message;
            outputField.style.outline = "2px solid green";
        }
        outputField.value = output.output;
    } catch (e) {
        outputField.value = "";
        console.log(e);
    }
}
