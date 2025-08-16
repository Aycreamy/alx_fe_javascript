// -------------------------
// INITIAL SETUP
// -------------------------
let quotes = JSON.parse(localStorage.getItem("quotes")) || [];
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // mock API

// Save to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// -------------------------
// SYNC WITH SERVER
// -------------------------
async function syncWithServer() {
  try {
    let response = await fetch(SERVER_URL);
    let serverData = await response.json();

    // Simulate server quotes structure (use only first 5 for demo)
    let serverQuotes = serverData.slice(0, 5).map(post => ({
      text: post.title,
      category: "Server"
    }));

    let conflicts = [];

    // Merge server quotes with local
    serverQuotes.forEach(serverQuote => {
      let localMatch = quotes.find(q => q.text === serverQuote.text);

      if (!localMatch) {
        // Add new server quote to local
        quotes.push(serverQuote);
      } else if (JSON.stringify(localMatch) !== JSON.stringify(serverQuote)) {
        // Conflict: server vs local → server wins
        conflicts.push({ local: localMatch, server: serverQuote });

        // Replace local with server’s version
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
// NOTIFICATION SYSTEM
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
// PERIODIC SYNC (every 15s)
// -------------------------
setInterval(syncWithServer, 15000);

// -------------------------
// EXISTING FUNCTIONS (filter, add, etc.)
// -------------------------
// keep all your previous functions: 
// populateCategories(), filterQuotes(), addQuote(), exportToJsonFile(), importFromJsonFile(), etc.

// Call sync once on load
syncWithServer();
