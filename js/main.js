fetch("http://localhost:3000/api/exercises")
  .then(res => res.json())
  .then(exercises => {
    const container = document.getElementById("exercise-list");

    exercises.forEach(ex => {
      const div = document.createElement("div");

      div.innerHTML = `
        <h2>${ex.name}</h2>
        <img src="http://localhost:3000${ex.image}" width="300">
        <p>${ex.description}</p>
        <a href="guide-chest.html?id=${ex.id}">ดูรายละเอียด</a>
        <hr>
      `;

      container.appendChild(div);
    });
  });
