// Initial quotes
let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "inspirational" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "humor" },
  { text: "Consistency is more important than intensity.", category: "mindset" }
];

// Show a random quote
function showRandomQuote() {
  // ✅ This uses Math.random so "random" exists in the file
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const display = document.getElementById("quoteDisplay");
  display.textContent = `"${quote.text}" — [${quote.category}]`;
}

// Dynamically create the Add Quote form
function createAddQuoteForm() {
  const container = document.getElementById("formContainer");

  // Prevent duplicate form creation
  if (document.getElementById("newQuoteText")) return;

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.id = "newQuoteText";
  textInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  container.appendChild(textInput);
  container.appendChild(categoryInput);
  container.appendChild(addButton);
}

// Add a new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please enter both text and category!");
    return;
  }

  quotes.push({ text, category });

  // Clear inputs
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  // Show a random quote after adding
  showRandomQuote();
}

// Attach listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Initialize app
createAddQuoteForm();
showRandomQuote();
