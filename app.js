// Ilova holati (State)
let currentUser = {
  firstName: "",
  lastName: ""
};

let currentQuestionIndex = 0;
let userAnswers = {}; // { 0: 2, 1: 0, ... } -> questionIndex: selectedOptionIndex
let currentQuizQuestions = []; // Har bir urinish uchun aralashtirilgan savollar

// Massivni tasodifiy aralashtirish (Fisher-Yates shuffle algoritmi)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Savollar va ularning variantlarini tasodifiy aralashtirish
function prepareQuizQuestions() {
  const shuffledQuestions = shuffleArray(testQuestions);

  return shuffledQuestions.map((item) => {
    const originalCorrectText = item.options[item.correctAnswer];
    const shuffledOptions = shuffleArray(item.options);
    const newCorrectIndex = shuffledOptions.indexOf(originalCorrectText);

    return {
      id: item.id,
      question: item.question,
      options: shuffledOptions,
      correctAnswer: newCorrectIndex
    };
  });
}

// DOM Elementlari
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const loginForm = document.getElementById("login-form");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const totalQuestionsPreview = document.getElementById("total-questions-preview");

// Quiz elementlari
const displayFullName = document.getElementById("display-fullname");
const userAvatar = document.getElementById("user-avatar");
const currentQNum = document.getElementById("current-q-num");
const totalQNum = document.getElementById("total-q-num");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");

// Natija elementlari
const statusIcon = document.getElementById("status-icon");
const resultFullName = document.getElementById("result-fullname");
const resultSummaryCard = document.getElementById("result-summary-card");
const statusTag = document.getElementById("status-tag");
const resultPercent = document.getElementById("result-percent");
const resultFraction = document.getElementById("result-fraction");
const statusMessage = document.getElementById("status-message");
const toggleReviewBtn = document.getElementById("toggle-review-btn");
const reviewContainer = document.getElementById("review-container");
const reviewList = document.getElementById("review-list");
const restartBtn = document.getElementById("restart-btn");

// Boshlang'ich sozlamalar
function init() {
  const total = Array.isArray(testQuestions) ? testQuestions.length : 0;
  totalQuestionsPreview.textContent = `${total} ta savol`;
  totalQNum.textContent = total;

  loginForm.addEventListener("submit", handleStartQuiz);
  prevBtn.addEventListener("click", handlePrevQuestion);
  nextBtn.addEventListener("click", handleNextQuestion);
  submitBtn.addEventListener("click", handleSubmitQuiz);
  toggleReviewBtn.addEventListener("click", handleToggleReview);
  restartBtn.addEventListener("click", handleRestart);
}

// 1. Testni boshlash
function handleStartQuiz(e) {
  e.preventDefault();

  const fName = firstNameInput.value.trim();
  const lName = lastNameInput.value.trim();

  if (!fName || !lName) {
    alert("Iltimos, ism va familiyangizni to'liq kiriting!");
    return;
  }

  if (!testQuestions || testQuestions.length === 0) {
    alert("Hozircha test savollari kiritilmagan. Iltimos, questions.js fayliga savollar qo'shing!");
    return;
  }

  currentUser.firstName = fName;
  currentUser.lastName = lName;

  displayFullName.textContent = `${fName} ${lName}`;
  userAvatar.textContent = fName.charAt(0).toUpperCase();

  // Savollarni har safar tasodifiy tartibda aralashtirish
  currentQuizQuestions = prepareQuizQuestions();

  // Holatni tozalash
  currentQuestionIndex = 0;
  userAnswers = {};

  // Ekranni almashtirish
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  loadQuestion(currentQuestionIndex);
}

// 2. Savolni ekranga chiqarish
function loadQuestion(index) {
  const currentQ = currentQuizQuestions[index];
  const total = currentQuizQuestions.length;

  currentQNum.textContent = index + 1;
  const progressPercent = ((index + 1) / total) * 100;
  progressBar.style.width = `${progressPercent}%`;

  questionText.textContent = `${index + 1}. ${currentQ.question}`;
  optionsContainer.innerHTML = "";

  const optionLetters = ["A", "B", "C", "D", "E", "F"];

  currentQ.options.forEach((optText, optIndex) => {
    const optionDiv = document.createElement("div");
    optionDiv.className = "option-item";
    
    // Agar oldin tanlangan bo'lsa
    if (userAnswers[index] === optIndex) {
      optionDiv.classList.add("selected");
    }

    const prefix = document.createElement("div");
    prefix.className = "option-prefix";
    prefix.textContent = optionLetters[optIndex] || (optIndex + 1);

    const textSpan = document.createElement("div");
    textSpan.className = "option-text";
    textSpan.textContent = optText;

    optionDiv.appendChild(prefix);
    optionDiv.appendChild(textSpan);

    optionDiv.addEventListener("click", () => selectOption(index, optIndex));
    optionsContainer.appendChild(optionDiv);
  });

  // Navigatsiya tugmalari holati
  prevBtn.disabled = index === 0;

  if (index === total - 1) {
    nextBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
  } else {
    nextBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
  }
}

// 3. Variantni tanlash
function selectOption(qIndex, optIndex) {
  userAnswers[qIndex] = optIndex;
  
  // UI ni yangilash
  const optionItems = optionsContainer.querySelectorAll(".option-item");
  optionItems.forEach((item, idx) => {
    if (idx === optIndex) {
      item.classList.add("selected");
    } else {
      item.classList.remove("selected");
    }
  });
}

// 4. Oldingi / Keyingi savolga o'tish
function handlePrevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);
  }
}

function handleNextQuestion() {
  if (currentQuestionIndex < currentQuizQuestions.length - 1) {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
  }
}

// 5. Testni yakunlash va Natijalarni hisoblash
function handleSubmitQuiz() {
  const total = currentQuizQuestions.length;
  const answeredCount = Object.keys(userAnswers).length;

  if (answeredCount < total) {
    const unanswered = total - answeredCount;
    const confirmSubmit = confirm(
      `Siz hali ${unanswered} ta savolga javob bermadingiz. Baribir testni yakunlamoqchimisiz?`
    );
    if (!confirmSubmit) {
      return;
    }
  }

  calculateAndShowResults();
}

function calculateAndShowResults() {
  let correctCount = 0;
  const total = currentQuizQuestions.length;

  currentQuizQuestions.forEach((q, index) => {
    if (userAnswers[index] === q.correctAnswer) {
      correctCount++;
    }
  });

  const percent = Math.round((correctCount / total) * 100);

  // Rang va baho tasnifi:
  // Yashil (Green): >= 70%
  // Sariq (Yellow): 50% - 69%
  // Qizil (Red): < 50%
  resultSummaryCard.classList.remove("theme-green", "theme-yellow", "theme-red");

  if (percent >= 70) {
    // YAXSHI - Yashil
    resultSummaryCard.classList.add("theme-green");
    statusTag.textContent = "Yaxshi (A'lo)";
    statusIcon.textContent = "🏆";
    statusMessage.textContent = "Ajoyib natija! Siz testdan muvaffaqiyatli o'tdingiz.";
  } else if (percent >= 50) {
    // O'RTACHA - Sariq
    resultSummaryCard.classList.add("theme-yellow");
    statusTag.textContent = "O'rtacha";
    statusIcon.textContent = "⭐";
    statusMessage.textContent = "Yaxshi harakat! O'z ustingizda yana biroz ishlashingiz lozim.";
  } else {
    // YOMON - Qizil
    resultSummaryCard.classList.add("theme-red");
    statusTag.textContent = "Yomon (Qoniqarsiz)";
    statusIcon.textContent = "⚠️";
    statusMessage.textContent = "Natijangiz past. Mavzuni qaytadan o'qib chiqishni tavsiya qilamiz.";
  }

  // Ma'lumotlarni yozish
  resultFullName.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
  resultPercent.textContent = `${percent}%`;
  resultFraction.textContent = `${total} tadan ${correctCount} tasi to'g'ri`;

  // Xatolarni tahlil qilish ro'yxatini shakllantirish
  renderReviewList();

  // Ekranni almashtirish
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
}

// 6. Xatolar va javoblar tahlili
function renderReviewList() {
  reviewList.innerHTML = "";
  const optionLetters = ["A", "B", "C", "D", "E", "F"];

  currentQuizQuestions.forEach((q, index) => {
    const isAnswered = userAnswers.hasOwnProperty(index);
    const chosenIndex = userAnswers[index];
    const isCorrect = isAnswered && chosenIndex === q.correctAnswer;

    const reviewItem = document.createElement("div");
    reviewItem.className = `review-item ${isCorrect ? "correct" : "incorrect"}`;

    const header = document.createElement("div");
    header.className = "review-item-header";
    header.innerHTML = `
      <span>${index + 1}-savol</span>
      <span class="review-verdict">${isCorrect ? "&#10003; To'g'ri" : "&#10007; Noto'g'ri"}</span>
    `;

    const qTitle = document.createElement("div");
    qTitle.className = "review-question-text";
    qTitle.textContent = q.question;

    const details = document.createElement("div");
    details.className = "review-answer-details";

    const userAnsText = isAnswered 
      ? `${optionLetters[chosenIndex] || ""}) ${q.options[chosenIndex]}`
      : "Javob berilmagan";

    const correctAnsText = `${optionLetters[q.correctAnswer] || ""}) ${q.options[q.correctAnswer]}`;

    details.innerHTML = `
      <div class="review-user-answer">Sizning javobingiz: <strong>${userAnsText}</strong></div>
      ${!isCorrect ? `<div class="review-correct-answer">To'g'ri javob: ${correctAnsText}</div>` : ""}
    `;

    reviewItem.appendChild(header);
    reviewItem.appendChild(qTitle);
    reviewItem.appendChild(details);
    reviewList.appendChild(reviewItem);
  });
}

function handleToggleReview() {
  const isHidden = reviewContainer.classList.contains("hidden");
  if (isHidden) {
    reviewContainer.classList.remove("hidden");
    toggleReviewBtn.innerHTML = "Xatolarni yashirish &#9652;";
  } else {
    reviewContainer.classList.add("hidden");
    toggleReviewBtn.innerHTML = "Xatolarni ko'rib chiqish &#9662;";
  }
}

// 7. Qayta topshirish
function handleRestart() {
  reviewContainer.classList.add("hidden");
  toggleReviewBtn.innerHTML = "Xatolarni ko'rib chiqish &#9662;";
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  firstNameInput.value = "";
  lastNameInput.value = "";
  currentUser = { firstName: "", lastName: "" };
}

// Ilovani ishga tushirish
document.addEventListener("DOMContentLoaded", init);
