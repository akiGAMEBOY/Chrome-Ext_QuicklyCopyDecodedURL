// 読み込み時
window.onload = () => {

  // 対応する言語を設定
  let label_manualcopy = chrome.i18n.getMessage('msg_label_manualcopy');
  let button_manualcopy = chrome.i18n.getMessage('msg_button_manualcopy');
  let label_shortcutscopy = chrome.i18n.getMessage('msg_label_shortcutscopy');
  let desc_shortcutscopy = chrome.i18n.getMessage('msg_desc_shortcutscopy');

  document.getElementById('label_manualcopy').innerText = label_manualcopy;
  document.getElementById('button_manualcopy').innerText = button_manualcopy;
  document.getElementById('label_shortcutscopy').innerText = label_shortcutscopy;
  document.getElementById('desc_shortcutscopy').innerText = desc_shortcutscopy;
}

// ボタンをクリックしたときの処理

// Manual Copyをクリックした時
document.getElementById('button_manualcopy').addEventListener('click', async () => {
  ManialCopyDecodeURL();
});

// Manual Copyの処理
function ManialCopyDecodeURL() {
  // コピー機能が動作するか検証
  if (!VerificationPre()) {
    return;
  }
  // アクティブタブのURLをデコードして取得
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    // Debug
    // let result = `Manual Copy:[${tabs[0].title}](${tabs[0].url})`;
    let result = CopyURL(tabs[0].url, 'sender:button_copy');
    if (result) {
      // コピーボタンの表示を完了メッセージに変更
      let complete_messages = chrome.i18n.getMessage("msg_button_manualcopy_complete");
      ChangeButtonLabel('button_manualcopy', complete_messages);
    }
  });
}

// コピーボタンの表示を完了メッセージに変更
function ChangeButtonLabel(id, after_text) {
  const button = document.getElementById(id);
  const before_text = button.textContent;
  setTimeout(() => {
    // 完了メッセージに変更
    button.textContent = after_text;
  }, 200);
  setTimeout(() => {
    // 変更前の表示に戻す
    button.textContent = before_text;
  }, 2800);
}
