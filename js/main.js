fetch("/api/exercises")
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch exercises");
    return res.json();
  })
  .then(exercises => {
    const container = document.getElementById("exercise-list");

    exercises.forEach(ex => {
      const div = document.createElement("div");

      div.innerHTML = `
        <h2>${ex.name}</h2>
        <img src="${ex.image}" width="300" alt="${ex.name}">
        <p>${ex.description}</p>
        <a href="guide-chest.html?id=${ex.id}">ดูรายละเอียด</a>
        <hr>
      `;

      container.appendChild(div);
    });
  })
  .catch(err => console.error("Error loading exercises:", err));