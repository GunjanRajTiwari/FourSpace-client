const editorDiv = document.getElementById("editor");
const langSelect = document.getElementById("lang");

var editor = CodeMirror(editorDiv, {
    lineNumbers: true,
    lineWraping: true,
    mode: "clike",
    theme: "dracula",
    viewportMargin: 2,
    lint: true,
    closeBrackets: true,
});

const langChange = () => {
    editor.setOption("mode", langSelect.value);
};

langSelect.onchange = langChange;
