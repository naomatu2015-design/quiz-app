const quizData = [
  {
    question: "1年は何日ですか？（うるう年を除く）",
    choices: ["364日", "365日", "366日", "360日"],
    answer: 1,
  },
  {
    question: "日本の首都はどこですか？",
    choices: ["大阪", "京都", "東京", "横浜"],
    answer: 2,
  },
  {
    question: "水の化学式はどれですか？",
    choices: ["CO2", "H2O", "O2", "NaCl"],
    answer: 1,
  },
  {
    question: "人間の心臓は体のどこにありますか？",
    choices: ["頭部", "胸部", "腹部", "背中"],
    answer: 1,
  },
  {
    question: "1週間は何日ですか？",
    choices: ["5日", "6日", "7日", "8日"],
    answer: 2,
  },
  {
    question: "富士山がある都道府県はどこですか？（またがる2県のうち1つ）",
    choices: ["静岡県", "長野県", "山梨県", "群馬県"],
    answer: 0,
  },
  {
    question: "日本の国鳥はどれですか？",
    choices: ["ツバメ", "キジ", "ハト", "タンチョウ"],
    answer: 1,
  },
  {
    question: "1年で最も日照時間が短い日を何と呼びますか？",
    choices: ["夏至", "冬至", "春分", "秋分"],
    answer: 1,
  },
  {
    question: "人間の血液型はA型・B型・O型ともう1つは何型ですか？",
    choices: ["C型", "D型", "AB型", "X型"],
    answer: 2,
  },
  {
    question: "1キログラムは何グラムですか？",
    choices: ["10グラム", "100グラム", "1000グラム", "10000グラム"],
    answer: 2,
  },
];

let currentIndex = 0;
let score = 0;
let isAnswered = false;

const questionText = document.getElementById("question-text");
const choicesContainer = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress");

const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
  isAnswered = false;
  feedback.textContent = "";
  feedback.className = "feedback";
  nextBtn.disabled = true;

  const current = quizData[currentIndex];
  progress.textContent = `第 ${currentIndex + 1} 問 / 全 ${quizData.length} 問`;
  questionText.textContent = current.question;

  choicesContainer.innerHTML = "";
  current.choices.forEach((choiceLabel, index) => {
    const button = document.createElement("button");
    button.textContent = choiceLabel;
    button.className = "choice-btn";
    button.addEventListener("click", () => selectAnswer(index, button));
    choicesContainer.appendChild(button);
  });
}

function selectAnswer(selectedIndex, selectedButton) {
  if (isAnswered) return;
  isAnswered = true;

  const current = quizData[currentIndex];
  const buttons = choicesContainer.querySelectorAll(".choice-btn");
  buttons.forEach((btn) => (btn.disabled = true));

  if (selectedIndex === current.answer) {
    score++;
    selectedButton.classList.add("correct");
    feedback.textContent = "正解です！";
    feedback.classList.add("correct");
  } else {
    selectedButton.classList.add("incorrect");
    buttons[current.answer].classList.add("correct");
    feedback.textContent = `不正解です。正解は「${current.choices[current.answer]}」です。`;
    feedback.classList.add("incorrect");
  }

  nextBtn.disabled = false;
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  scoreText.textContent = `${quizData.length}問中 ${score}問正解でした！`;
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  quizScreen.classList.remove("hidden");
  resultScreen.classList.add("hidden");
  loadQuestion();
});

loadQuestion();
