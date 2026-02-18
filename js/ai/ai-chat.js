const aiBtn = document.getElementById("aiBtn");
const aiInput = document.getElementById("aiInput");
const aiAnswer = document.getElementById("aiAnswer");

aiBtn.addEventListener("click", askAI);
aiInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") askAI();
});

async function askAI() {
  const question = aiInput.value.trim();

  if (!question) {
    aiAnswer.innerHTML = "<strong>กรุณาพิมพ์คำถามก่อน</strong>";
    return;
  }

  aiAnswer.innerHTML = " กำลังคิดคำตอบ...";

  try {
    const res = await fetch("/api/ask-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await res.json();
    
    if (data.answer) {
        aiAnswer.innerHTML = marked.parse(data.answer);
    } else {
        aiAnswer.innerHTML = "❌ AI ไม่ตอบกลับ";
    }

  } catch (err) {
    console.error(err);
    aiAnswer.innerHTML = "❌ เชื่อมต่อ AI ไม่ได้";
  }
}