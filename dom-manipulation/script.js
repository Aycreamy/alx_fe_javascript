// -------------------------
// LOAD QUOTES FROM LOCALSTORAGE OR DEFAULT
// -------------------------
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Your time is limited, don’t waste it living someone else’s life.", category: "Inspiration" }
];

// -------------------------
// SAVE QUOTES TO LOCALSTORAGE
// -------------------------
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// -------------------------
// POPULATE CATEGORIES IN DROPDOWN
// -------------------------
function populateCategories() {
  let categorySelect = document.getElementById("categoryFilter");

  // Clear old options (except "All")
  categorySelect.innerHTML = '<option value="all">All Categories</option>';

  // Get unique categories
  let categories = [...new Set(quotes.map(q => q.category))];

  // Add to dropdown
  categories.forEach(cat => {
    let option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });

  // Restore last selected filter (if saved)
  let savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter) {
    categorySelect.value = savedFilter;
    filterQuotes();
  }
}

// -------------------------
// FILTER QUOTES BASED ON SELECTED CATEGORY
// -------------------------
function filterQuotes() {
  let selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);

  let filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter(q => q.category === selectedCategory);

  // If there are quotes, show one at random
  let quoteDiv = document.getElementById("quoteDisplay");
  if (filteredQuotes.length > 0) {
    let randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    let randomQuote = filteredQuotes[randomIndex];
    quoteDiv.innerHTML = `"${randomQuote.text}" <br><em>(${randomQuote.category})</em>`;
  } else {
    quoteDiv.innerHTML = "No quotes available for this category.";
  }
}

// -------------------------
// SHOW RANDOM QUOTE (respects filter)
// -------------------------
function showRandomQuote() {
  filterQuotes(); // just reuse filtering logic
}
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// -------------------------
// ADD QUOTE
// -------------------------
function addQuote() {
  let newQuoteText = document.getElementById("newQuoteText").value.trim();
  let newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    saveQuotes();
    populateCategories(); // update filter dropdown

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
// JSON EXPORT
// -------------------------
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

// -------------------------
// JSON IMPORT
// -------------------------
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
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
populateCategories();
filterQuotes(); // show something on load
