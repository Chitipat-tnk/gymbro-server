const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`http://localhost:3000/api/exercises/${id}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("exercise-name").textContent = data.name;
    document.getElementById("exercise-image").src = data.image;

    renderList("setup", data.steps.setup);
    renderList("eccentric", data.steps.eccentric);
    renderList("concentric", data.steps.concentric);
  })
  .catch(err => {
    console.error(err);
    alert("โหลดข้อมูลไม่สำเร็จ");
  });

function renderList(id, items) {
  const ul = document.getElementById(id);
  ul.innerHTML = "";
  items.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    ul.appendChild(li);
  });
}
