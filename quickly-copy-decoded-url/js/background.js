
// Shortcuts Key

chrome.commands.onCommand.addListener((command_name) => {
  // Shortcuts Copy
  if (command_name == 'shortcuts_copy') {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      // Debug
      // let result = `Shortcuts Copy:[${tabs[0].title}](${tabs[0].url})`;
      let encode_url = `${tabs[0].url}`;
      (async () => {
        chrome.tabs.sendMessage(tabs[0].id, {command: command_name, text: encode_url}).catch(error => {
          console.error('Error occurred on [background.js - shortcuts_copy - chrome.tabs.sendMessage].', error);
        });
      })();
    });
  }
});
