const title = document.getElementById("title");
const company = document.getElementById("company");
const info = document.getElementById("info");

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
                title.innerHTML = result.name;
                company.innerHTML = result.company_email;
                info.innerHTML = result.info;
            })
    }
}