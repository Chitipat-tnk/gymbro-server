const container = document.getElementById("exercise-list");

fetch("http://localhost:3000/api/exercises?muscle=chest")
  .then(res => res.json())
  .then(data => {
    data.forEach(ex => {
      const card = document.createElement("div");

      card.innerHTML = `
        <h3>${ex.name}</h3>
        <img src="${ex.image}" width="200">
        <p>${ex.description}</p>
        <a href="exercise.html?id=${ex.id}">ดูรายละเอียด</a>
        <hr>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error(err);
    alert("โหลดข้อมูลไม่สำเร็จ");
  });
