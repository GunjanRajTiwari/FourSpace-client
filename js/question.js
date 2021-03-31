const editor = document.getElementById("editor");

var myCodeMirror = CodeMirror(editor, {
    lineNumbers: true,
    mode: "javascript",
    theme: "dracula",
    viewportMargin: 2,
});

editor.addEventListener("click", () => {
    console.log(myCodeMirror.getValue());
});
