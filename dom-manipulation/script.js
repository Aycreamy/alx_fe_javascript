// Step 1: Create an array of quotes (with text + category)
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Your time is limited, don’t waste it living someone else’s life.", category: "Inspiration" }
];

// Step 2: Function to show a random quote
function showRandomQuote() {
  // Pick a random number (index) between 0 and quotes.length - 1
  let randomIndex = Math.floor(Math.random() * quotes.length);

  // Get that random quote
  let randomQuote = quotes[randomIndex];

  // Display it inside the "quoteDisplay" div
  let quoteDiv = document.getElementById("quoteDisplay");
  quoteDiv.innerHTML = `"${randomQuote.text}" <br><em>(${randomQuote.category})</em>`;
}

// Step 3: Hook the "Show New Quote" button to this function
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Step 4: Function to add a new quote
function addQuote() {
  // Get the input values
  let newQuoteText = document.getElementById("newQuoteText").value.trim();
  let newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  // Check if input is not empty
  if (newQuoteText && newQuoteCategory) {
    // Add new quote object into the array
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    // Clear input fields after adding
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    alert("Quote added successfully!");
  } else {
    alert("Please enter both a quote and a category!");
  }
}
