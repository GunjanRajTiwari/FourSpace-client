window.onload = () => {
    const params = new URL(location.href).searchParams;
    const cid = params.get("cid");
    if (!cid) {
        location.href = "/contests.html";
    } else {
        fetch(`${domain}/questions`);
    }
}