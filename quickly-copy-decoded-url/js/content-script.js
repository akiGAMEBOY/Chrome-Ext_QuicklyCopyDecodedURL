
// Receive message

chrome.runtime.onMessage.addListener((message) => {
  // ショートカットコピー
  if (message.command == "shortcuts_copy") {
    // 実行前の検証
    if (!VerificationPre) {
      return;
    }

    let result = CopyURL(message.text, 'sender:shortcuts_copy');
    // 完了メッセージ
    if (result) {
      let alert_shortcutscopy = chrome.i18n.getMessage('msg_alert_shortcutscopy');
      alert(alert_shortcutscopy);
    }
  }
});
