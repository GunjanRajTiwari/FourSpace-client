const editorDiv = document.getElementById("editor");
const langSelect = document.getElementById("lang");
const inputField = document.getElementById("input");
const outputField = document.getElementById("output");
var domain = "https://fourspace.herokuapp.com";

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
                token: token,
            },

            body: JSON.stringify({
                code,
                language: langMap[language],
                input,
            }),
        });
        var output = await response.json();
        if (output.status == "1") {
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
