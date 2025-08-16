// -------------------------
// QUOTES ARRAY (Load from localStorage if available)
// -------------------------
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Your time is limited, don’t waste it living someone else’s life.", category: "Inspiration" }
];

// -------------------------
// SAVE QUOTES TO LOCAL STORAGE
// -------------------------
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// -------------------------
// SHOW RANDOM QUOTE
// -------------------------
function showRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomIndex];

  let quoteDiv = document.getElementById("quoteDisplay");
  quoteDiv.innerHTML = `"${randomQuote.text}" <br><em>(${randomQuote.category})</em>`;

  // Save last viewed quote to sessionStorage
  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// -------------------------
// ADD NEW QUOTE
// -------------------------
function addQuote() {
  let newQuoteText = document.getElementById("newQuoteText").value.trim();
  let newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    // Save to localStorage
    saveQuotes();

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    alert("Quote added successfully!");
  } else {
    alert("Please enter both a quote and a category!");
  }
}

// -------------------------
// CREATE ADD QUOTE FORM
// -------------------------
function createAddQuoteForm() {
  let formDiv = document.createElement("div");

  let quoteInput = document.createElement("input");
  quoteInput.type = "text";
  quoteInput.id = "newQuoteText";
  quoteInput.placeholder = "Enter a new quote";

  let categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";

  let addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  formDiv.appendChild(quoteInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addButton);

  document.body.appendChild(formDiv);
}

// -------------------------
// JSON EXPORT FUNCTION
// -------------------------
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2); // pretty print
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json"; // filename
  a.click();

  URL.revokeObjectURL(url); // cleanup
}

// -------------------------
// JSON IMPORT FUNCTION
// -------------------------
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid file format!");
      }
    } catch (error) {
      alert("Error reading JSON file!");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// -------------------------
// ON PAGE LOAD
// -------------------------
createAddQuoteForm();

// Show last viewed quote from sessionStorage (if available)
const lastQuote = sessionStorage.getItem("lastQuote");
if (lastQuote) {
  const quoteDiv = document.getElementById("quoteDisplay");
  const parsedQuote = JSON.parse(lastQuote);
  quoteDiv.innerHTML = `"${parsedQuote.text}" <br><em>(${parsedQuote.category})</em>`;
}
