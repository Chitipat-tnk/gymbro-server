let gender = "male";

// เพศ
document.querySelectorAll(".gender-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".gender-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    gender = btn.dataset.gender;
  });
});

document.getElementById("calculateBtn").addEventListener("click", () => {

  const age = Number(document.getElementById("age").value);
  const height = Number(document.getElementById("height").value);
  const weight = Number(document.getElementById("weight").value);
  const activity = Number(document.getElementById("activity").value);

  if (!age || !height || !weight || !activity) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  // คำนวณ BMR 
  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // คำนวณ TDEE
  const tdee = Math.round(bmr * activity);

  // แสดงผล
  document.getElementById("tdeeValue").textContent = `${tdee} kcal / วัน`;
  document.getElementById("cut").textContent = tdee - 500;
  document.getElementById("maintain").textContent = tdee;
  document.getElementById("bulk").textContent = tdee + 500;

  document.getElementById("resultSection").style.display = "block";
});
