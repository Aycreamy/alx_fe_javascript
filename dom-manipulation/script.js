// Default quotes
let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "inspirational" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "humor" },
  { text: "Consistency is more important than intensity.", category: "mindset" }
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Load quotes from localStorage
function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  if (stored) {
    quotes = JSON.parse(stored);
  }
}

// Save last viewed quote to sessionStorage
function saveLastQuote(quote) {
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// Load last viewed quote from sessionStorage
function loadLastQuote() {
  const stored = sessionStorage.getItem("lastQuote");
  if (stored) {
    return JSON.parse(stored);
  }
  return null;
}

// Show random quote
function showRandomQuote() {
  const category = document.getElementById("categorySelect").value;
  let pool = quotes;

  if (category !== "all") {
    pool = quotes.filter(q => q.category === category);
  }

  const display = document.getElementById("quoteDisplay");
  if (pool.length === 0) {
    display.textContent = "No quotes available in this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * pool.length);
  const quote = pool[randomIndex];
  display.textContent = `"${quote.text}" — [${quote.category}]`;

  saveLastQuote(quote);
}

// Populate category dropdown
function populateCategories() {
  const select = document.getElementById("categorySelect");
  while (select.options.length > 1) {
    select.remove(1);
  }
  const categories = [...new Set(quotes.map(q => q.category))];
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
}

// Add new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please enter both text and category!");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  showRandomQuote();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// Export quotes to JSON
function exportToJson() {
  const data = JSON.stringify(quotes, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import from JSON
function importFromJsonFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    alert("Quotes imported successfully!");
  };
  reader.readAsText(file);
}

// Initialize app
loadQuotes();
populateCategories();

// Restore last viewed quote if available
const lastQuote = loadLastQuote();
if (lastQuote) {
  document.getElementById("quoteDisplay").textContent = `"${lastQuote.text}" — [${lastQuote.category}]`;
} else {
  showRandomQuote();
}

// ✅ Attach event listeners here
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("categorySelect").addEventListener("change", showRandomQuote);
document.getElementById("addQuote").addEventListener("click", addQuote);
document.getElementById("exportBtn").addEventListener("click", exportToJson);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);
