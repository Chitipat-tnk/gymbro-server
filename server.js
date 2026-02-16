require("dotenv").config();
console.log("🔑 GEMINI KEY:", process.env.GEMINI_API_KEY ? "Found ✅" : "Not Found ❌");

const express = require("express");
const cors = require("cors");
const path = require("path");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

app.use(cors());
app.use(express.json());
// ================== serve images ==================
app.use(
  "/images",
  express.static(path.join(__dirname, "../images"))
);

// ================== mock data ==================
const exercises = [
/* ========================= CHEST ========================= */
{
  id: "dumbbell-fly",
  name: "Dumbbell Fly",
  muscle: "chest",
  image: "/images/chest/dumbbell-fly.gif",
  description: "ท่าแยกอกด้วยดัมเบล เน้นการยืดและบีบกล้ามอก",
  steps: {
    setup: [
      "นอนบนม้านอนราบ ถือดัมเบลเหนืออก",
      "งอศอกเล็กน้อยตลอดการเคลื่อนไหว"
    ],
    eccentric: [
      "ค่อย ๆ กางแขนออกด้านข้างจนรู้สึกตึงที่อก"
    ],
    concentric: [
      "บีบอกแล้วยกดัมเบลกลับขึ้นมาชิดกัน"
    ]
  },
  tips: [
    "อย่าเหยียดศอกตึง",
    "ควบคุมน้ำหนัก ไม่เหวี่ยง"
  ]
},

{
  id: "pec-deck",
  name: "Pec Deck",
  muscle: "chest",
  image: "/images/chest/pec-deck.gif",
  description: "ท่าแมชชีนเน้นการบีบหน้าอก ปลอดภัย คุมฟอร์มง่าย",
  steps: {
    setup: ["นั่งพิงพนัก ปรับที่จับให้อยู่ระดับอก"],
    eccentric: ["ค่อย ๆ เปิดแขนออก"],
    concentric: ["บีบที่จับเข้าหากัน"]
  },
  tips: ["บีบค้าง 1 วินาที"]
},

{
  id: "dumbbell-press",
  name: "Dumbbell Press",
  muscle: "chest",
  image: "/images/chest/Dumbell-press.jpg",
  description: "ท่า Compound เพิ่มมวลกล้ามเนื้อหน้าอก",
  steps: {
    setup: ["นอนบนม้านั่ง ถือดัมเบลระดับอก"],
    eccentric: ["ลดดัมเบลลง"],
    concentric: ["ดันดัมเบลขึ้น"]
  },
  tips: ["คุมจังหวะ"]
},

{
  id: "dip-chest",
  name: "Chest Dip",
  muscle: "chest",
  image: "/images/chest/dip-chest.gif",
  description: "ท่าน้ำหนักตัว เน้นหน้าอกล่าง",
  steps: {
    setup: ["จับบาร์ เอนตัวไปข้างหน้า"],
    eccentric: ["ย่อตัวลง"],
    concentric: ["ดันตัวขึ้น"]
  },
  tips: ["เอนตัวเพื่อโดนหน้าอก"]
},

{
  id: "smith-incline-press",
  name: "Smith Machine Incline Press",
  muscle: "chest",
  image: "/images/chest/Smith Machine Incline Press.gif",
  description: "ท่าอกบนด้วยสมิทแมชชีน คุมทิศทางง่าย",
  steps: {
    setup: ["ปรับม้านั่งเอียง"],
    eccentric: ["ลดบาร์ลงระดับอกบน"],
    concentric: ["ดันบาร์ขึ้น"]
  },
  tips: ["อย่าล็อกศอก"]
},

{
  id: "decline-barbell-press",
  name: "Decline Barbell Press",
  muscle: "chest",
  image: "/images/chest/Decline-Barbell.gif",
  description: "ท่าอกล่าง เพิ่มความหนา",
  steps: {
    setup: ["นอนม้านั่งลาดลง"],
    eccentric: ["ลดบาร์ลง"],
    concentric: ["ดันบาร์ขึ้น"]
  },
  tips: ["มีคนเซฟ"]
},

{
  id: "neutral-grip-dumbbell-press",
  name: "Neutral Grip Dumbbell Press",
  muscle: "chest",
  image: "/images/chest/Neutral Grip Dumbbell Press.gif",
  description: "ลดแรงกดหัวไหล่ เหมาะกับมือใหม่",
  steps: {
    setup: ["ฝ่ามือหันเข้าหากัน"],
    eccentric: ["ลดดัมเบล"],
    concentric: ["ดันขึ้น"]
  },
  tips: ["เหมาะคนเจ็บไหล่"]
},

/* ========================= SHOULDER ========================= */
{
  id: "shoulder-press",
  name: "Shoulder Press",
  muscle: "shoulder",
  image: "/images/shoulder/Shoulder-press.gif",
  description: "เพิ่มมวลหัวไหล่ด้านหน้าและกลาง",
  steps: {
    setup: ["ถือดัมเบลระดับไหล่"],
    eccentric: ["ลดดัมเบล"],
    concentric: ["ดันขึ้น"]
  },
  tips: ["ไม่แอ่นหลัง"]
},

{
  id: "side-lateral-raise",
  name: "Side Lateral Raise",
  muscle: "shoulder",
  image: "/images/shoulder/side lateral raise.gif",
  description: "เน้นหัวไหล่ด้านข้าง",
  steps: {
    setup: ["ถือดัมเบลข้างลำตัว"],
    eccentric: ["ลดแขนลง"],
    concentric: ["ยกแขนออกด้านข้าง"]
  },
  tips: ["ยกถึงระดับไหล่"]
},

{
  id: "reverse-fly",
  name: "Reverse Fly",
  muscle: "shoulder",
  image: "/images/shoulder/Reverse Fly.gif",
  description: "เน้นไหล่หลัง ปรับสมดุลไหล่",
  steps: {
    setup: ["ก้มตัวเล็กน้อย"],
    eccentric: ["หุบแขน"],
    concentric: ["กางแขน"]
  },
  tips: ["ใช้น้ำหนักเบา"]
},

{
  id: "front-raise",
  name: "Dumbbell Front Raise",
  muscle: "shoulder",
  image: "/images/shoulder/Dumbell-FrontRaise.gif",
  description: "เน้นไหล่หน้า",
  steps: {
    setup: ["ถือดัมเบลด้านหน้า"],
    eccentric: ["ลดแขน"],
    concentric: ["ยกแขนขึ้น"]
  },
  tips: ["ไม่เหวี่ยง"]
},

{
  id: "overhead-press",
  name: "Overhead Press",
  muscle: "shoulder",
  image: "/images/shoulder/Overhead-Press.gif",
  description: "ท่า Compound สำหรับไหล่และแกนกลาง",
  steps: {
    setup: ["จับบาร์ระดับไหล่"],
    eccentric: ["ลดบาร์"],
    concentric: ["ดันบาร์ขึ้น"]
  },
  tips: ["เกร็งหน้าท้อง"]
},

/* ========================= TRICEPS ========================= */
{
  id: "db-overhead-triceps",
  name: "Dumbbell Overhead Triceps",
  muscle: "triceps",
  image: "/images/triceps/Dumbell Overhead Triceps.png",
  description: "เน้นทริเซปส์หัวยาว",
  steps: {
    setup: ["ถือดัมเบลเหนือหัว"],
    eccentric: ["งอศอกลง"],
    concentric: ["เหยียดแขน"]
  },
  tips: ["ศอกไม่กาง"]
},

{
  id: "assisted-dip",
  name: "Assisted Dip",
  muscle: "triceps",
  image: "/images/triceps/Assisted Dip.gif",
  description: "ทริเซปส์ด้วยแมชชีน",
  steps: {
    setup: ["วางเข่าบนเครื่อง"],
    eccentric: ["ย่อตัว"],
    concentric: ["ดันขึ้น"]
  },
  tips: ["หลังตรง"]
},

{
  id: "triceps-extension",
  name: "Triceps Extension",
  muscle: "triceps",
  image: "/images/triceps/Triceps Extension.gif",
  description: "แยกทริเซปส์ชัด",
  steps: {
    setup: ["ถือบาร์หรือดัมเบล"],
    eccentric: ["งอศอก"],
    concentric: ["เหยียดแขน"]
  },
  tips: ["ไม่ขยับต้นแขน"]
},

{
  id: "cable-triceps-pushdown",
  name: "Cable Triceps Pushdown",
  muscle: "triceps",
  image: "/images/triceps/Cable Tricep Pushdown.gif",
  description: "ท่าหลักเก็บงานแขนหลัง",
  steps: {
    setup: ["จับบาร์สายเคเบิล"],
    eccentric: ["งอศอก"],
    concentric: ["กดลง"]
  },
  tips: ["ศอกแนบลำตัว"]
},

{
  id: "bench-dips",
  name: "Bench Dips",
  muscle: "triceps",
  image: "/images/triceps/Bench Dips.gif",
  description: "ท่าน้ำหนักตัวสำหรับแขนหลัง",
  steps: {
    setup: ["วางมือบนม้านั่ง"],
    eccentric: ["ย่อตัว"],
    concentric: ["ดันขึ้น"]
  },
  tips: ["ไม่ย่อลึกเกิน"]
},

/* ========================= BACK ========================= */
{
  id: "pull-up",
  name: "Pull Up",
  muscle: "back",
  image: "/images/back/Pull Up.gif",
  description: "ท่าหลังด้วยน้ำหนักตัว",
  steps: {
    setup: ["จับบาร์"],
    eccentric: ["หย่อนตัว"],
    concentric: ["ดึงตัวขึ้น"]
  },
  tips: ["อกนำ"]
},

{
  id: "barbell-row",
  name: "Barbell Row",
  muscle: "back",
  image: "/images/back/Barbell Row.gif",
  description: "เพิ่มความหนาหลัง",
  steps: {
    setup: ["ก้มหลังตรง"],
    eccentric: ["ลดบาร์"],
    concentric: ["ดึงบาร์"]
  },
  tips: ["ไม่โก่งหลัง"]
},

{
  id: "lat-pulldown",
  name: "Lat Pulldown",
  muscle: "back",
  image: "/images/back/Lat pulldown.gif",
  description: "เพิ่มความกว้างหลัง",
  steps: {
    setup: ["จับบาร์กว้าง"],
    eccentric: ["ปล่อยบาร์"],
    concentric: ["ดึงลง"]
  },
  tips: ["ไม่เอนมาก"]
},

{
  id: "one-arm-db-row",
  name: "One Arm Dumbbell Row",
  muscle: "back",
  image: "/images/back/One-Arm Dumbbell Row.gif",
  description: "แยกซ้ายขวา",
  steps: {
    setup: ["มือหนึ่งยันม้านั่ง"],
    eccentric: ["ลดดัมเบล"],
    concentric: ["ดึงขึ้น"]
  },
  tips: ["ศอกชิดตัว"]
},

{
  id: "seated-cable-row",
  name: "Seated Cable Row",
  muscle: "back",
  image: "/images/back/Seated Cable Row.gif",
  description: "คุมแรงตลอดช่วง",
  steps: {
    setup: ["นั่งหลังตรง"],
    eccentric: ["เหยียดแขน"],
    concentric: ["ดึงเข้าลำตัว"]
  },
  tips: ["บีบสะบัก"]
},

/* ========================= ARM (BICEPS) ========================= */
{
  id: "dumbbell-curl",
  name: "Dumbbell Curl",
  muscle: "arm",
  image: "/images/arm/Dumbell curl.gif",
  description: "ท่าพื้นฐานแขนหน้า",
  steps: {
    setup: ["ถือดัมเบล"],
    eccentric: ["ลดดัมเบล"],
    concentric: ["งอแขน"]
  },
  tips: ["ไม่เหวี่ยง"]
},

{
  id: "ez-preacher-curl",
  name: "EZ-Bar Preacher Curl",
  muscle: "arm",
  image: "/images/arm/EZ-Bar Preacher Curl.gif",
  description: "แยกแขนหน้าชัด",
  steps: {
    setup: ["วางแขนบนเบาะ"],
    eccentric: ["ลดบาร์"],
    concentric: ["งอแขน"]
  },
  tips: ["คุมจังหวะ"]
},

{
  id: "concentration-curl",
  name: "Concentration Curl",
  muscle: "arm",
  image: "/images/arm/Concentration Curl.gif",
  description: "โฟกัสแขนหน้า",
  steps: {
    setup: ["นั่ง วางศอกกับขา"],
    eccentric: ["ลดดัมเบล"],
    concentric: ["งอแขน"]
  },
  tips: ["บีบค้าง"]
},

{
  id: "standing-cable-curl",
  name: "Standing Cable Curl",
  muscle: "arm",
  image: "/images/arm/Standing Cable Curl.gif",
  description: "แรงตึงต่อเนื่อง",
  steps: {
    setup: ["จับบาร์เคเบิล"],
    eccentric: ["เหยียดแขน"],
    concentric: ["งอแขน"]
  },
  tips: ["ศอกไม่ขยับ"]
},

/* ========================= LEG ========================= */
{
  id: "smith-squat",
  name: "Smith Machine Squat",
  muscle: "leg",
  image: "/images/leg/Smith Machine Squat.gif",
  description: "สควอทคุมทิศทาง",
  steps: {
    setup: ["วางบาร์บนบ่า"],
    eccentric: ["ย่อตัว"],
    concentric: ["ดันขึ้น"]
  },
  tips: ["เข่าไม่พับเข้า"]
},

{
  id: "barbell-squat",
  name: "Barbell Squat",
  muscle: "leg",
  image: "/images/leg/Barbell Squat.gif",
  description: "ราชาแห่งท่าขา",
  steps: {
    setup: ["วางบาร์บนหลัง"],
    eccentric: ["ย่อตัว"],
    concentric: ["ดันขึ้น"]
  },
  tips: ["หลังตรง"]
},

{
  id: "leg-press",
  name: "Leg Press",
  muscle: "leg",
  image: "/images/leg/Leg Press.gif",
  description: "เพิ่มแรงขา",
  steps: {
    setup: ["วางเท้าบนแท่น"],
    eccentric: ["งอเข่า"],
    concentric: ["ดันแท่น"]
  },
  tips: ["ไม่ล็อกเข่า"]
},

{
  id: "leg-extension",
  name: "Leg Extension",
  muscle: "leg",
  image: "/images/leg/Leg Extension.gif",
  description: "เน้นหน้าขา",
  steps: {
    setup: ["นั่งหลังตรง"],
    eccentric: ["งอเข่า"],
    concentric: ["เหยียดขา"]
  },
  tips: ["บีบค้าง"]
},

{
  id: "lying-leg-curl",
  name: "Lying Leg Curl",
  muscle: "leg",
  image: "/images/leg/Lying Leg Curl.gif",
  description: "เน้นหลังขา",
  steps: {
    setup: ["นอนคว่ำ"],
    eccentric: ["เหยียดขา"],
    concentric: ["งอขา"]
  },
  tips: ["คุมช้า"]
},
/* ========================= CHEST (ADD) ========================= */
{
  id: "bench-press",
  name: "Bench Press",
  muscle: "chest",
  image: "/images/chest/bench-press.gif",
  description: "ท่าหลักสร้างมวลกล้ามอก",
  steps: {
    setup: ["นอนบนม้านอนราบ จับบาร์กว้างระดับไหล่"],
    eccentric: ["ลดบาร์ลงแตะอก"],
    concentric: ["ดันบาร์ขึ้น"]
  },
  tips: ["มีคนเซฟ", "ไม่ล็อกศอก"]
},

/* ========================= TRICEPS (ADD) ========================= */
{
  id: "rope-triceps-pushdown",
  name: "Cable Triceps Pushdown (Rope)",
  muscle: "triceps",
  image: "/images/triceps/Cable Triceps Pushdown(Rope).gif",
  description: "แยกหัวทริเซปส์ชัดกว่าแบบบาร์",
  steps: {
    setup: ["จับเชือกเคเบิล"],
    eccentric: ["งอศอกขึ้น"],
    concentric: ["กดลงพร้อมแยกเชือก"]
  },
  tips: ["ศอกแนบลำตัว"]
},

/* ========================= BACK (ADD) ========================= */
{
  id: "t-bar-row",
  name: "T-Bar Row",
  muscle: "back",
  image: "/images/back/T-Bar Row.jpg",
  description: "เพิ่มความหนากลางหลัง",
  steps: {
    setup: ["ยืนคร่อมบาร์"],
    eccentric: ["ลดน้ำหนักลง"],
    concentric: ["ดึงเข้าหาหน้าท้อง"]
  },
  tips: ["บีบสะบัก"]
},

{
  id: "underhand-row",
  name: "Underhand Row",
  muscle: "back",
  image: "/images/back/Barbell Row (Underhand Grip).gif",
  description: "โดนหลังล่างและแขนหน้ามากขึ้น",
  steps: {
    setup: ["จับบาร์หงายมือ"],
    eccentric: ["ลดบาร์ลง"],
    concentric: ["ดึงบาร์เข้าลำตัว"]
  },
  tips: ["หลังตรง"]
},

/* ========================= ARM (ADD) ========================= */
{
  id: "dumbbell-preacher-curl",
  name: "Dumbbell Preacher Curl",
  muscle: "arm",
  image: "/images/arm/Dumbbell Preacher Curl.gif",
  description: "แยกแขนหน้าอย่างชัดเจน",
  steps: {
    setup: ["วางแขนบนเบาะ preacher"],
    eccentric: ["ลดดัมเบลลงช้า ๆ"],
    concentric: ["งอแขนขึ้น"]
  },
  tips: ["คุมจังหวะ"]
},

/* ========================= LEG (ADD) ========================= */
{
  id: "bulgarian-split-squat",
  name: "Bulgarian Split Squat",
  muscle: "leg",
  image: "/images/leg/Dumbbell Bulgarian Split Squat.gif",
  description: "เน้นก้นและต้นขา แยกซ้ายขวา",
  steps: {
    setup: ["วางเท้าหลังบนม้านั่ง"],
    eccentric: ["ย่อตัวลง"],
    concentric: ["ดันขึ้น"]
  },
  tips: ["เข่าไม่ล้ำปลายเท้า"]
},

{
  id: "goblet-squat",
  name: "Dumbbell Goblet Squat",
  muscle: "leg",
  image: "/images/leg/Dumbbell Goblet Squat.gif",
  description: "เหมาะสำหรับมือใหม่ ฝึกฟอร์ม",
  steps: {
    setup: ["ถือดัมเบลหน้าลำตัว"],
    eccentric: ["ย่อตัวลง"],
    concentric: ["ดันขึ้น"]
  },
  tips: ["หลังตรง"]
},

{
  id: "romanian-deadlift",
  name: "Romanian Deadlift",
  muscle: "leg",
  image: "/images/leg/Barbell Romanian Deadlift.gif",
  description: "เน้นหลังขาและก้น",
  steps: {
    setup: ["ถือบาร์ระดับสะโพก"],
    eccentric: ["ดันสะโพกไปด้านหลัง"],
    concentric: ["ดึงกลับขึ้น"]
  },
  tips: ["หลังตรง"]
},

{
  id: "hack-squat",
  name: "Hack Squat",
  muscle: "leg",
  image: "/images/leg/Hack Squat.gif",
  description: "เน้นหน้าขา ปลอดภัย",
  steps: {
    setup: ["ยืนพิงเครื่อง"],
    eccentric: ["ย่อลง"],
    concentric: ["ดันขึ้น"]
  },
  tips: ["ไม่ล็อกเข่า"]
},

{
  id: "front-squat",
  name: "Barbell Front Squat",
  muscle: "leg",
  image: "/images/leg/Barbell Front Squat.gif",
  description: "เน้นหน้าขาและแกนกลาง",
  steps: {
    setup: ["วางบาร์หน้าหัวไหล่"],
    eccentric: ["ย่อตัว"],
    concentric: ["ดันขึ้น"]
  },
  tips: ["ศอกยกสูง"]
},

{
  id: "standing-calf-raise",
  name: "Standing Calf Raise",
  muscle: "leg",
  image: "/images/leg/Standing Calf Raise.gif",
  description: "เพิ่มกล้ามน่อง",
  steps: {
    setup: ["ยืนปลายเท้า"],
    eccentric: ["ลดส้นเท้า"],
    concentric: ["เขย่งขึ้น"]
  },
  tips: ["บีบค้างด้านบน"]
},

{
  id: "barbell-hip-thrust",
  name: "Barbell Hip Thrust",
  muscle: "leg",
  image: "/images/leg/Barbell Hip Thrust.gif",
  description: "ท่าหลักสร้างก้น",
  steps: {
    setup: ["พิงหลังกับม้านั่ง"],
    eccentric: ["ลดสะโพกลง"],
    concentric: ["ดันสะโพกขึ้น"]
  },
  tips: ["คางชิดอก"]
}

];

// ================== API ==================

// get all exercises (filter by muscle ได้)
app.get("/api/exercises", (req, res) => {
  const { muscle } = req.query;

  if (muscle) {
    return res.json(exercises.filter(e => e.muscle === muscle));
  }

  res.json(exercises);
});

//  get exercise id
app.get("/api/exercises/:id", (req, res) => {
  const { id } = req.params;
  const exercise = exercises.find(e => e.id === id);

  if (!exercise) {
    return res.status(404).json({ message: "Exercise not found" });
  }

  res.json(exercise);
});

//---API AI (Scope)---//
app.post("/api/ask-ai", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "No question provided" });
    }

    const prompt = `
      บทบาท: คุณคือเทรนเนอร์มืออาชีพและนักโภชนาการ (Professional Trainer & Nutritionist)

      สไตล์การตอบ (Tone & Style):
      1. **จริงจังและละเอียด:** ให้ข้อมูลเชิงลึก มีหลักการวิทยาศาสตร์รองรับ (เช่น ตัวเลขโปรตีน, แคลอรี่, โซนหัวใจ)
      2. **โครงสร้างชัดเจน:** แบ่งหัวข้อเป็นข้อๆ (1, 2, 3) มีหัวข้อย่อย และใช้ตัวหนา (**Bold**) เพื่อเน้นคำสำคัญ
      3. **สุภาพและน่าเชื่อถือ:** ใช้คำลงท้าย "ครับ" ภาษาเป็นทางการกึ่งสนทนา (อ่านง่ายแต่มีความรู้)
      4. **ห้าม:** ห้ามใช้คำวัยรุ่นจ๋า (เช่น ชาวแก๊ง, เพื่อน) และห้ามตอบสั้นห้วนๆ ต้องอธิบายเหตุผลเสมอ

      ตัวอย่างรูปแบบคำตอบที่ต้องการ (ให้เลียนแบบโครงสร้างนี้ เเต่ถ้าเป็นท่าออกกำลังกาย ให้เเบบเเนะนำการเล่นท่า ขั้นต้อน วิธีการ)

      "เรื่องนี้สามารถทำได้จริงครับ แต่ต้องอาศัยความแม่นยำใน 3 หลักการนี้:
      1. โภชนาการ (Nutrition)
         * **Calorie Deficit:** กินให้น้อยกว่า TDEE ประมาณ 200-300 แคลอรี่ เพื่อดึงไขมันมาใช้แต่ไม่เสียกล้ามเนื้อ
         * **High Protein:** ทานโปรตีน 1.6 - 2.2 กรัมต่อน้ำหนักตัว เพื่อรักษามวลกล้ามเนื้อ
      2. การออกกำลังกาย (Training)
         * **Weight Training:** เน้นท่า Compound (Squat, Bench Press) เพื่อกระตุ้นฮอร์โมน
         * **Progressive Overload:** ต้องเพิ่มน้ำหนักหรือจำนวนครั้งเรื่อยๆ
      3. การพักผ่อน (Recovery)
         * **Sleep:** นอน 7-8 ชั่วโมงเพื่อให้ Growth Hormone ทำงาน"

      คำถามจากผู้ใช้งาน: "${question}"
    `;

    const result = await model.generateContent(prompt);
    
    const response = await result.response;
    const answer = response.text();

    res.json({ answer });

  } catch (err) {
    console.error("❌ Gemini error:", err);
    res.status(500).json({ error: "Gemini API error", details: err.message });
  }
});

// ================== start server ==================
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
