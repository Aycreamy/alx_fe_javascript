// -------------------------
// INITIAL SETUP
// -------------------------
let quotes = JSON.parse(localStorage.getItem("quotes")) || [];
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // mock API

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// -------------------------
// FETCH QUOTES FROM SERVER
// -------------------------
async function fetchQuotesFromServer() {
  let response = await fetch(SERVER_URL);
  let serverData = await response.json();

  // Simulate server quotes structure (just use first 5 for demo)
  return serverData.slice(0, 5).map(post => ({
    text: post.title,
    category: "Server"
  }));
}

// -------------------------
// POST QUOTE TO SERVER
// -------------------------
async function postQuoteToServer(quote) {
  try {
    let response = await fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quote)
    });
    let result = await response.json();
    console.log("Quote posted to server:", result);
  } catch (error) {
    console.error("Error posting quote:", error);
  }
}

// -------------------------
// SYNC WITH SERVER
// -------------------------
async function syncWithServer() {
  try {
    let serverQuotes = await fetchQuotesFromServer();
    let conflicts = [];

    serverQuotes.forEach(serverQuote => {
      let localMatch = quotes.find(q => q.text === serverQuote.text);

      if (!localMatch) {
        // New server quote → add it
        quotes.push(serverQuote);
      } else if (JSON.stringify(localMatch) !== JSON.stringify(serverQuote)) {
        // Conflict → server wins
        conflicts.push({ local: localMatch, server: serverQuote });
        Object.assign(localMatch, serverQuote);
      }
    });

    saveQuotes();
    populateCategories();
    filterQuotes();

    if (conflicts.length > 0) {
      showNotification(`${conflicts.length} conflicts resolved (server wins).`);
    } else {
      showNotification("Sync completed successfully.");
    }
  } catch (error) {
    showNotification("Error syncing with server.");
    console.error(error);
  }
}

// -------------------------
// ADD QUOTE (extended to POST)
// -------------------------
function addQuote(text, category) {
  if (!text.trim()) return;

  let newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  filterQuotes();

  // Post new quote to server
  postQuoteToServer(newQuote);
}

// -------------------------
// NOTIFICATION BAR
// -------------------------
function showNotification(message) {
  let notificationBar = document.getElementById("notificationBar");
  if (!notificationBar) {
    notificationBar = document.createElement("div");
    notificationBar.id = "notificationBar";
    notificationBar.style.position = "fixed";
    notificationBar.style.top = "0";
    notificationBar.style.left = "0";
    notificationBar.style.right = "0";
    notificationBar.style.background = "#333";
    notificationBar.style.color = "#fff";
    notificationBar.style.padding = "10px";
    notificationBar.style.textAlign = "center";
    document.body.appendChild(notificationBar);
  }
  notificationBar.textContent = message;

  setTimeout(() => {
    notificationBar.textContent = "";
  }, 4000);
}

// -------------------------
// PERIODIC SYNC
// -------------------------
setInterval(syncWithServer, 15000);

// -------------------------
// ON PAGE LOAD
// -------------------------
createAddQuoteForm();
populateCategories();
filterQuotes();
syncWithServer(); // initial sync
