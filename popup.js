document.addEventListener("DOMContentLoaded", async () => {
  const tabList = document.getElementById("tab-list");
  const saveButton = document.getElementById("save-button");

  // Get tabs in the current window
  const tabs = await chrome.tabs.query({ currentWindow: true });

  // Display tabs in the popup
  const tabUrls = [];
  tabs.forEach((tab, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${tab.title} - ${tab.url}`;
    tabList.appendChild(listItem);
    tabUrls.push(tab.url);
  });

  // Save to file functionality
  saveButton.addEventListener("click", () => {
    const blob = new Blob([tabUrls.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tabs.txt";
    a.click();
    URL.revokeObjectURL(url);
  });
});
