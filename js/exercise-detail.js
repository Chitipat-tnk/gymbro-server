const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  alert("ไม่พบ exercise id");
  throw new Error("Missing id");
}
fetch(`/api/exercises/${id}`)
  .then(res => {
    if (!res.ok) throw new Error("Exercise not found");
    return res.json();
  })
  .then(data => {

    // muscle bar
    const muscleBar = document.getElementById("muscleBar");
    muscleBar.textContent = data.muscle.toUpperCase();
    muscleBar.className = `muscle-bar ${data.muscle}`;

    document.getElementById("exerciseName").textContent = data.name;

    document.getElementById("exerciseImage").src = data.image;

    document.getElementById("exerciseDesc").textContent = data.description;

    // steps
    fillList("setupList", data.steps.setup);
    fillList("eccentricList", data.steps.eccentric);
    fillList("concentricList", data.steps.concentric);
  })
  .catch(err => {
    alert(err.message);
    console.error(err);
  });

function fillList(id, items) {
  const ul = document.getElementById(id);
  ul.innerHTML = "";
  if (!items) return;

  items.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    ul.appendChild(li);
  });
}