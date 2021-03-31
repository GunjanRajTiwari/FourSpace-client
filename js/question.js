const editorDiv = document.getElementById("editor");

var editor = CodeMirror(editorDiv, {
    lineNumbers: true,
    lineWraping: true,
    mode: "clike",
    theme: "dracula",
    viewportMargin: 2,
    lint: true,
    closeBrackets: true,
});

editorDiv.addEventListener("click", () => {
    editor.setOption("mode", "javascript");
    console.log(editor.getMode());
});
