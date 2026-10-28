// Python fanidan test savollari (20 ta savol)
const testQuestions = [
  {
    id: 1,
    question: "Python’da ekranga ma’lumot chiqarish uchun qaysi funksiya ishlatiladi?",
    options: ["input()", "print()", "int()", "str()"],
    correctAnswer: 1 // B
  },
  {
    id: 2,
    question: "Foydalanuvchidan ism kiritishni so‘rash uchun qaysi funksiya kerak?",
    options: ["print()", "type()", "input()", "float()"],
    correctAnswer: 2 // C
  },
  {
    id: 3,
    question: "Quyidagi kod natijasi nima?\na = 12\nb = 5\nprint(a + b)",
    options: ["17", "7", "125", "60"],
    correctAnswer: 0 // A
  },
  {
    id: 4,
    question: "print(17 // 5) kodi qanday natija beradi?",
    options: ["3.4", "2", "4", "3"],
    correctAnswer: 3 // D
  },
  {
    id: 5,
    question: "17 % 5 ifodasining natijasi nima?",
    options: ["3", "2", "3.4", "1"],
    correctAnswer: 1 // B
  },
  {
    id: 6,
    question: "Python’da 2 ning 4-darajasini hisoblash uchun qaysi ifoda to‘g‘ri?",
    options: ["2 * 4", "2 // 4", "2 ** 4", "2 % 4"],
    correctAnswer: 2 // C
  },
  {
    id: 7,
    question: "Qaysi qiymat Integer (int), ya’ni butun son hisoblanadi?",
    options: ['"25"', "25.0", "True", "25"],
    correctAnswer: 3 // D
  },
  {
    id: 8,
    question: 'Quyidagi kod natijasi nima?\nism = "Ali"\nprint(ism + "bek")',
    options: ["Alibek", "Ali bek", "ismbek", "Xatolik"],
    correctAnswer: 0 // A
  },
  {
    id: 9,
    question: 'Quyidagi kod nimani chiqaradi?\nism = "Ali"\nyosh = 12\nprint(f"{ism} {yosh}")',
    options: ["ism yosh", "Ali 12", "Ali yosh", "Xatolik"],
    correctAnswer: 1 // B
  },
  {
    id: 10,
    question: "Python’da Boolean turining qiymatlari qaysilar?",
    options: ["Yes va No", "1 va 2", "True va False", '"True" va "False"'],
    correctAnswer: 2 // C
  },
  {
    id: 11,
    question: "print(9 > 4) kodi qanday natija chiqaradi?",
    options: ["False", "9", "4", "True"],
    correctAnswer: 3 // D
  },
  {
    id: 12,
    question: "= va == operatorlari orasidagi farq qaysi javobda to‘g‘ri ko‘rsatilgan?",
    options: [
      "= qiymat beradi, == tenglikni tekshiradi",
      "Ikkalasi ham faqat qo‘shish uchun",
      "= tenglikni tekshiradi, == qiymat beradi",
      "Ikkalasi ham matn chiqaradi"
    ],
    correctAnswer: 0 // A
  },
  {
    id: 13,
    question: "if operatorining asosiy vazifasi nima?",
    options: [
      "Sonni matnga aylantirish",
      "Shartni tekshirish",
      "Foydalanuvchidan ma’lumot olish",
      "Har doim kodni takrorlash"
    ],
    correctAnswer: 1 // B
  },
  {
    id: 14,
    question: 'Quyidagi kod natijasi nima?\nyosh = 16\nif yosh >= 18:\n    print("Katta")\nelse:\n    print("Kichik")',
    options: ["Katta", "16", "Kichik", "Xatolik"],
    correctAnswer: 2 // C
  },
  {
    id: 15,
    question: "elif operatori nima uchun ishlatiladi?",
    options: [
      "Yangi qo‘shimcha shartni tekshirish",
      "Faqat matn chiqarish",
      "Sonni butun songa aylantirish",
      "O‘zgaruvchini o‘chirish"
    ],
    correctAnswer: 0 // A
  },
  {
    id: 16,
    question: 'Quyidagi kod natijasi nima?\nson = 0\nif son > 0:\n    print("Musbat")\nelif son < 0:\n    print("Manfiy")\nelse:\n    print("Nol")',
    options: ["Musbat", "Manfiy", "Hech narsa chiqmaydi", "Nol"],
    correctAnswer: 3 // D
  },
  {
    id: 17,
    question: "Qaysi shart sonning juft ekanini to‘g‘ri tekshiradi?",
    options: ["son / 2 == 0", "son % 2 == 0", "son // 2 == 0", "son + 2 == 0"],
    correctAnswer: 1 // B
  },
  {
    id: 18,
    question: 'Quyidagi kodda nima xato?\nif yosh => 18:\n    print("Ruxsat")',
    options: [
      "print() ishlatish mumkin emas",
      "if o‘rniga input yozish kerak",
      ">= operatori yozilishi kerak",
      "yosh albatta matn bo‘lishi kerak"
    ],
    correctAnswer: 2 // C
  },
  {
    id: 19,
    question: 'Quyidagi kodda son 10 bo‘lsa, qaysi matn chiqariladi?\nson = 10\nif son > 10:\n    print("A")\nelse:\n    print("B")',
    options: ["A", "B", "10", "Xatolik"],
    correctAnswer: 1 // B
  },
  {
    id: 20,
    question: 'Quyidagi koddagi xatoni qanday tuzatish kerak?\nif son % 2 = 0:\n    print("Juft")',
    options: [
      "= o‘rniga == yozish kerak",
      "% o‘rniga + yozish kerak",
      "if o‘rniga else yozish kerak",
      "print() o‘rniga input() yozish kerak"
    ],
    correctAnswer: 0 // A
  }
];
