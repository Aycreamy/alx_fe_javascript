// Step 1: Create an array of quotes (with text + category)
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Your time is limited, don’t waste it living someone else’s life.", category: "Inspiration" }
];

// Step 2: Function to show a random quote
function showRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomIndex];

  let quoteDiv = document.getElementById("quoteDisplay");
  quoteDiv.innerHTML = `"${randomQuote.text}" <br><em>(${randomQuote.category})</em>`;
}

// Hook the "Show New Quote" button to this function
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Step 3: Function to add a new quote
function addQuote() {
  let newQuoteText = document.getElementById("newQuoteText").value.trim();
  let newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    // Clear input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    alert("Quote added successfully!");
  } else {
    alert("Please enter both a quote and a category!");
  }
}

// Step 4: Function to dynamically create the Add Quote form
function createAddQuoteForm() {
  let formDiv = document.createElement("div");

  // Create input for new quote
  let quoteInput = document.createElement("input");
  quoteInput.type = "text";
  quoteInput.id = "newQuoteText";
  quoteInput.placeholder = "Enter a new quote";

  // Create input for category
  let categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";

  // Create button
  let addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  // Append everything to formDiv
  formDiv.appendChild(quoteInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addButton);

  // Finally, attach formDiv to body (or another container)
  document.body.appendChild(formDiv);
}

// Call the function to create the form when the page loads
createAddQuoteForm();
