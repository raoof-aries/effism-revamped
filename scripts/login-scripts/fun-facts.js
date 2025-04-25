// Quote Data
const quoteData = [
  {
    description:
      "Love what you do. Great work comes from passion and dedication.",
    author: "Steve Jobs",
  },
  {
    description:
      "Life is 10% what happens, 90% how you react. Stay positive and resilient.",
    author: "Charles R. Swindoll",
  },
];

// Fact Data
const factData = [
  {
    description:
      "The shortest war in history lasted 38 minutes, between Britain and Zanzibar on August 27, 1896.",
  },
  {
    description:
      "Antarctica, not the Sahara, is the world's largest desert, spanning over 14 million square kilometers.",
  },
];

// Health Data
const healthData = [
  {
    description:
      "Stay hydrated by drinking water daily, essential for maintaining good health and well-being.",
  },
  {
    description:
      "Regular exercise improves cardiovascular health, reduces chronic disease risk, and enhances overall fitness.",
  },
];

// Function to get random data
function getRandomData(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

// Function to populate cards
function populateFunFacts() {
  console.log("Populating Fun Facts"); // Debug log

  // Quote Card
  const quoteCard = document.getElementById("quote-card");
  if (!quoteCard) {
    console.error("Quote card element not found");
    return;
  }

  const randomQuoteData = getRandomData(quoteData);
  const quoteBodyElement = quoteCard.querySelector(".login_card_body p");
  const quoteFooterElement = quoteCard.querySelector(".login_card_footer");

  if (quoteBodyElement) {
    quoteBodyElement.textContent = randomQuoteData.description;
  }

  if (quoteFooterElement) {
    if (randomQuoteData.author) {
      quoteFooterElement.textContent = randomQuoteData.author;
    } else {
      quoteFooterElement.style.display = "none";
    }
  }

  // Fact Card
  const factCard = document.getElementById("fact-card");
  const randomFactData = getRandomData(factData);
  const factBodyElement = factCard.querySelector(".login_card_body p");
  if (factBodyElement) {
    factBodyElement.textContent = randomFactData.description;
  }

  // Health Card
  const healthCard = document.getElementById("health-card");
  const randomHealthData = getRandomData(healthData);
  const healthBodyElement = healthCard.querySelector(".login_card_body p");
  if (healthBodyElement) {
    healthBodyElement.textContent = randomHealthData.description;
  }
}

// Global init function
function funFactsInit() {
  console.log("Fun Facts Init called");
  // Slight delay to ensure DOM is fully ready
  setTimeout(populateFunFacts, 100);
}

// Expose init function globally
window.funFactsInit = funFactsInit;
