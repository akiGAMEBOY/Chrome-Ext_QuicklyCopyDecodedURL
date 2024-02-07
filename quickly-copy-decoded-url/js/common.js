
// Common Function

// コピー機能が動作するか検証
function VerificationPre() {
  let isExe = true;
  // クリップボードを呼び出せるか
  if (!navigator.clipboard) {
    isExe = false
    let alert_notaccess_clipboard = chrome.i18n.getMessage('msg_alert_notaccess_clipboard');
    alert(alert_notaccess_clipboard);
    return isExe;
  }
  return isExe;
}

// URLをデコードしてコピー
function CopyURL(copy_text, sender_name) {
  let isNormal = true;

  let decoded_url = decodeURI(copy_text);

  navigator.clipboard.writeText(decoded_url).catch(() => {
    isNormal = false;
    console.error(`Error: common.js - CopyURL - navigator.clipboard.writeText, ${sender_name}`)
  });

  return isNormal
}
