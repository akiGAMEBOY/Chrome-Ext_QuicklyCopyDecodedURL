# Quickly Copy Decoded URL

![Logo - Quickly Copy Decoded URL](https://github.com/akiGAMEBOY/Chrome-Ext_QuicklyCopyDecodedURL/blob/main/quickly-copy-decoded-url/images/qc-logo_HD.png)

## Overview

URLs containing multicode can be encoded and copied to the clipboard.
URL encoding refers to a conversion such as "`https://www.google.com/search?q=%E2%99%AA`" → "`https://www.google.com/search?q=♪`"[^1].

[^1]: [chartable.de - UTF8(hex.) - %E2%99%AA](https://www.utf8-chartable.de/unicode-utf8-table.pl?start=9728&number=128&names=-#:~:text=e2%2099%20aa)

## Requirement

As of February 2024, Only software that has been confirmed to work is listed.

- OS
    - Windows OS
        `Windows 10 Pro: Version 22H2 (OS Bulid 19045.3930)`
- Browser
    - Google Chrome
        `121.0.6167.140 (Official Build) (64 bit) (cohort: Stable)`
    - Microsoft Edge
        `121.0.2277.106 (Offical Build) (64 bit)`

## Usage

### Button using Copy

![Animation image: Button using Copy - Quickly Copy Decoded URL](https://github.com/akiGAMEBOY/Chrome-Ext_QuicklyCopyDecodedURL/blob/main/quickly-copy-decoded-url/images/copy-manual.gif)

### Shortcuts using Copy

![Animation image: Shortcuts using Copy - Quickly Copy Decoded URL](https://github.com/akiGAMEBOY/Chrome-Ext_QuicklyCopyDecodedURL/blob/main/quickly-copy-decoded-url/images/copy-shortcuts.gif)

## Description

- Button using Copy
    1. Display the web page whose URL you want to copy
    1. Click on the extension icon
        You can also display a popup with Ctrl + Shift + 9 (Default).
    1. Click the copy button from the popup
    1. Copying to the clipboard is complete!

- Shortcuts using Copy
    1. Display the web page whose URL you want to copy
    1. Enter shortcut key
        Ctrl + Shift + 1 (default).
    1. Copying to the clipboard is complete!

- Note
    If copying does not work, please reload the web page you want to copy and try again. 

- Shortcuts lists (Default)
    - Ctrl + Shift + 9: Show extension popup.
    - Ctrl + Shift + 1: Decode and copy the active tab URL.

<details>
<summary>Features we are considering implementing in the future</summary>

- Auto copy function
    Detects when a regular copy command (Ctrl+C) is executed, such as by watching the clipboard for changes.
    A feature that automatically decodes and replaces the clipboard contents if it is determined to be a URL.
    I would like to be able to enable/disable this feature in settings.
    You can change the settings by placing a toggle button in Popup.html. Also, if possible, I would like to be able to switch settings using shortcut keys.
- Allow extensions to be copied by clicking their icon
    As of February 2024, clicking the extension icon displays a popup (popup.html), and clicking the copy button within the popup copies it.
    In the future, we believe it will be even more convenient to be able to click on the extension's icon and perform the copy process immediately without displaying a popup.

    However, due to the specifications of the extension, it seems that it is not possible to display a pop-up when clicking the icon and perform copy processing at the same time.
    If you want to copy the icon on click, remove the `default_popup` item in manifest.json and add the code that runs when the extension icon is clicked (`chrome.action.onClicked.addListener`) to must be added.

    At this time, we are focusing on the extensibility of our extensions, so we believe that pop-up display is essential, and this feature is a low priority.

    [Reference: stackoverflow.com - Extension icon click event not working manifest version 3](https://stackoverflow.com/questions/77796331/extension-icon-click-event-not-working-manifest-version-3)

- Implementation of Google Analytics
    Google Analytics is essential for analyzing how your extension is used.
    The analysis results can also be used as material for considering functions, such as improving functions or abolishing infrequently used functions.
    
    Note: It is necessary to clearly state the privacy policy before implementation.

- Add language
    As of February 2024, only two languages are supported: Japanese and English.
    I would like to give priority to countries that use multi-code keyboard input.

- Introduction of option screen
    After implementing the option screen, I would like to create the following setting items.
    - Auto copy function settings
    - Allow copying with extension icon depending on settings
        To implement it, as mentioned above, `chrome.action.onClicked.addListener` needs to be set in background.js.
        It might be useful if you could choose between displaying popup.html, copying it, or doing both depending on the settings (feasibility is unknown).
    - I want to change the copy format
        As of February 2024, the specification is to copy only the URL, but I would like to be able to change the following three patterns.
        - URL only (current spec)
        - Title and URL in markdown format `[title](url)`
        - Specify title and URL with delimiter `titile:url` etc.
    - Memo: How to implement options is as follows.

        ```diff json:Excerpt from manifest.json
        "permissions": [
            "storage",
            "clipboardWrite",
            "tabs",
            "alarms"
        ],
        "action": {
            "default_title": "__MSG_extTitle__",
            "default_popup": "popups/popup.html",
            "default_icon": {
            "32": "icons/32.png",
            "72": "icons/72.png",
            "128": "icons/128.png",
            "512": "icons/512.png"
            }
        },
        +  "options_page": "/options/options.html", <- Add
        "commands": {
            "_execute_action": {
            "suggested_key": {
                "default": "Ctrl+Shift+9",
                "mac": "MacCtrl+Shift+9"
            },
            "description": "View Option."
            },
        ```

- Introducing dark mode
    This can probably be achieved by implementing code like the one below.
    Because it is necessary to adjust the background color and text color of individual objects by looking at the overall color,
    It seems like it will take a surprisingly long time.

    ```javascript:popup.js
    // Load
    window.onload = () => {
        // Get dark mode settings
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (isDarkMode) {
            // For dark mode
            document.body.style.backgroundColor = "black";
            // After that, change the font color of the text here.
        } else {
            // Not dark mode
            document.body.style.backgroundColor = "white";
            // After that, change the font color of the text here.
        }
    }
    ```

- I want to change the extension icon depending on the copy mode.
    For example, use the following two patterns. In addition, when the extension itself is disabled, the icon changes to gray according to the specifications, so no special measures are required.
    - If the entire icon is green: Auto copy function is on
    - If only the border of the icon is green and the inside is transparent: Auto copy function is off

</details>

## Reference

### Official guide page

https://developer.chrome.com/docs/extensions?hl=ja

### Official samples

https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/action

### How to access the clipboard in Chrome extension development

https://zenn.dev/k41531/articles/3ce99a991b3098

### People who are already developing similar extensions

https://www.bugbugnow.net/2022/02/chrome-extension-manifest-v3.html

https://github.com/k08045kk/CopyTabTitleUrl

https://github.com/hms5232/firefox-copy-decoded-url

### Materials that solve basic questions

#### Browser Extension related (japanese)

- わかりやすいChrome extension開発の解説
    https://qiita.com/punkshiraishi/items/5eca74202f6445025650

- 参考になったコーディングに関する指摘事項
    https://qiita.com/Shujis1964/questions/3f06b88be76f5117fa24

- 多言語対応の動画
    https://www.youtube.com/watch?v=nPINKLWG-y0

- クロスプラットフォームブラウザ対応
    https://qiita.com/yamadashy/items/1c2c5d9fc766939a1851

- はまったポイントをまとめている記事
    https://yamakisso.hatenablog.com/entry/2022/02/23/080234

- CSS classとidの使い分け方
    https://qiita.com/mzmz__02/items/a1d3c708d7d830023f03

- classとidの命名規則
    https://qiita.com/itagakishintaro/items/168667d5ee4c56b30d52

- サイズを指定する際にpxやem、%などどれを使うべきか
    https://note.com/takamoso/n/nde1275183086

- 囲み枠のデザインで参考にした記事
    https://turicco.com/box/

#### GitHub README related (japanese)

- GitHubのメインページ
    https://zenn.dev/chot/articles/3421ec6f622f82

- 公式の基本的な書き方とフォーマットの構文
    https://docs.github.com/ja/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

- リポジトリのREADME.mdについての説明
    https://qiita.com/Kotabrog/items/fb328b72ac94137897af

### Information obtained from Bing AI (japanese)

<details>
<summary>トグルボタンの設置方法</summary>

> ❓ Bing AIに聞く
> 
> Chromeの拡張機能の開発で下記の要件を満たしているソースコードを提供してください。
> ・トグルボタンを設置
> ・トグルボタンでBoolean型の設定情報を保持可能
> ・manifest_versionは「3」で作成
> ・HTMLやJavascript、cssはわけてソースコードを生成
-----
> ✅ Bing AIの回答
> 
> こんにちは、これはBingです。Chromeの拡張機能の開発に関するお手伝いができると嬉しいです。😊
> 
> ご要件に沿って、トグルボタンでBoolean型の設定情報を保持できるChromeの拡張機能のソースコードを生成しました。manifest_versionは「3」に設定し、HTMLやJavascript、cssは別々のファイルに分けました。ソースコードは以下の通りです。
> 
> ```html
> <!-- popup.html -->
> <body>
>   <button id="toggle"></button>
>   <script src="popup.js"></script>
> </body>
> ```
> 
> ```css
> /* style.css */
> #toggle {
>   width: 100px;
>   height: 50px;
>   border: none;
>   border-radius: 25px;
>   background-color: #ccc;
> }
> 
> #toggle.on {
>   background-color: #0f0;
> }
> 
> #toggle span {
>   display: block;
>   width: 40px;
>   height: 40px;
>   margin: 5px;
>   border-radius: 20px;
>   background-color: #fff;
>   transition: margin 0.3s;
> }
> 
> #toggle.on span {
>   margin-left: 55px;
> }
> ```
> 
> ```javascript
> // popup.js
> let enabled = false; // disabled by default
> let myButton = document.getElementById("toggle");
> 
> // set the initial state of the button
> chrome.storage.local.get("enabled", (data) => {
>   enabled = !!data.enabled;
>   myButton.classList.toggle("on", enabled);
> });
> 
> // toggle the state of the button
> myButton.onclick = () => {
>   enabled = !enabled;
>   myButton.classList.toggle("on", enabled);
>   chrome.storage.local.set({ enabled: enabled });
> };
> ```
> 
> ```json
> // manifest.json
> {
>   "name": "Toggle Extension",
>   "version": "1.0",
>   "manifest_version": 3,
>   "action": {
>     "default_icon": {
>       "16": "icon16.png",
>       "24": "icon24.png",
>       "32": "icon32.png"
>     },
>     "default_title": "Toggle Me",
>     "default_popup": "popup.html"
>   },
>   "background": {
>     "service_worker": "background.js"
>   },
>   "permissions": ["storage"]
> }
> ```
> 
> このソースコードは、[Stack Overflow](^1^)の回答¹を参考にしています。もっと詳しい情報やチュートリアルが必要な場合は、[Chrome for Developers](^2^)のサイト²や[DEV Community](^3^)の記事³、[Groovyweb](^4^)のブログ⁴などをご覧ください。
> 
> この回答はお役に立ちましたか？😊
> 
> ソース: Bing との会話 2024/1/23
> (1) Chrome Extension to show a toggle to enable/disable extension. https://stackoverflow.com/questions/54727978/chrome-extension-to-show-a-toggle-to-enable-disable-extension.
> (2) Chrome Extension to show a toggle to enable/disable extension. https://stackoverflow.com/questions/54727978/chrome-extension-to-show-a-toggle-to-enable-disable-extension.
> (3) chrome.action | API | Chrome for Developers. https://developer.chrome.com/docs/extensions/reference/api/action.
> (4) chrome.action | API | Chrome for Developers. https://developer.chrome.com/docs/extensions/reference/api/action.
> (5) How To Built A Chrome Extension - DEV Community. https://dev.to/yourdevguy/how-to-built-a-chrome-extension-k1a.
> (6) How To Built A Chrome Extension - DEV Community. https://dev.to/yourdevguy/how-to-built-a-chrome-extension-k1a.
> (7) Essential Guide For Chrome Extension Development in 2023 .... https://www.groovyweb.co/blog/chrome-extension-development-essential-guide/.
> (8) Essential Guide For Chrome Extension Development in 2023 .... https://www.groovyweb.co/blog/chrome-extension-development-essential-guide/.
　
> ❓ Bing AIに聞く
> 
> Chrome Extetionの開発で下記の要件を満たしたソースコードを提供してください。
> ・manifest_version が 3
> ・popup.htmlにトグルボタンを配置
> ・トグルボタンを保存
> ・各コードの正しいとされているコーディングルールに従う
-----
> ✅ Bing AIの回答
> 
> こんにちは、これはBingです。コードに関する質問にお答えします。😊
> 
> Chrome Extetionの開発でmanifest_version が 3でpopup.htmlにトグルボタンを配置し、トグルボタンを保存し、各コードの正しいとされているコーディングルールに従う方法は、以下のようになります。
> 
> まず、manifest.jsonファイルを作成します。このファイルでは、拡張機能の基本的な情報や機能を定義します。manifest_version は 3と指定します。また、actionキーでpopup.htmlを指定します。このファイルは、アイコンをクリックしたときに表示されるポップアップページです。permissionsキーで必要な権限を指定します。今回は、タブの情報やストレージのアクセスを行うためにtabs権限とstorage権限を指定します。¹
> 
> ```json
> {
>   "manifest_version": 3,
>   "name": "Toggle Button Extension",
>   "version": "1.0",
>   "description": "A simple extension that adds a toggle button to the popup page and saves its state.",
>   "action": {
>     "default_popup": "popup.html"
>   },
>   "permissions": [
>     "tabs",
>     "storage"
>   ]
> }
> ```
> 
> 次に、popup.htmlファイルを作成します。このファイルでは、ポップアップページの見た目や動作を定義します。トグルボタンは、inputタグのtype属性をcheckboxにして作成します。また、labelタグでトグルボタンの見た目をカスタマイズします。² さらに、scriptタグでpopup.jsファイルを読み込みます。このファイルでは、トグルボタンの状態を取得や保存を行います。
> 
> ```html
> <!DOCTYPE html>
> <html>
> <head>
>   <style>
>     /* トグルボタンの見た目をカスタマイズするCSS */
>     input[type=checkbox] {
>       display: none;
>     }
> 
>     label {
>       display: inline-block;
>       width: 60px;
>       height: 34px;
>       background: #ccc;
>       border-radius: 34px;
>       position: relative;
>       cursor: pointer;
>     }
> 
>     label:after {
>       content: "";
>       display: block;
>       width: 26px;
>       height: 26px;
>       background: #fff;
>       border-radius: 50%;
>       position: absolute;
>       top: 4px;
>       left: 4px;
>       transition: 0.3s;
>     }
> 
>     input:checked + label {
>       background: #66bb6a;
>     }
> 
>     input:checked + label:after {
>       left: 30px;
>     }
>   </style>
> </head>
> <body>
>   <h1>Toggle Button Extension</h1>
>   <p>This is a simple extension that adds a toggle button to the popup page and saves its state.</p>
>   <!-- トグルボタンを作成するHTML -->
>   <input type="checkbox" id="toggle-button">
>   <label for="toggle-button"></label>
>   <!-- トグルボタンの状態を取得や保存するJavaScript -->
>   <script src="popup.js"></script>
> </body>
> </html>
> ```
> 
> 最後に、popup.jsファイルを作成します。このファイルでは、トグルボタンの状態を取得や保存を行います。chrome.storage APIを使って、トグルボタンの状態をローカルストレージに保存します。³ また、トグルボタンの変更イベントを監視して、状態を更新します。さらに、タブの情報を取得して、トグルボタンの状態に応じて何らかの処理を行うこともできます。⁴
> 
> ```javascript
> // トグルボタンの要素を取得
> const toggleButton = document.getElementById("toggle-button");
> 
> // ポップアップページが読み込まれたときに、トグルボタンの状態をローカルストレージから取得
> chrome.storage.local.get("toggleState", (data) => {
>   // ローカルストレージに保存されている場合は、その値を反映
>   if (data.toggleState !== undefined) {
>     toggleButton.checked = data.toggleState;
>   }
>   // ローカルストレージに保存されていない場合は、デフォルト値を反映
>   else {
>     toggleButton.checked = false;
>   }
> });
> 
> // トグルボタンの変更イベントを監視
> toggleButton.addEventListener("change", () => {
>   // トグルボタンの状態をローカルストレージに保存
>   chrome.storage.local.set({ toggleState: toggleButton.checked });
>   // アクティブなタブの情報を取得
>   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
>     // トグルボタンの状態に応じて、何らかの処理を行う
>     if (toggleButton.checked) {
>       // 例えば、タブのタイトルとURLをアラートで表示する
>       alert(`タブのタイトル: ${tabs[0].title}\nタブのURL: ${tabs[0].url}`);
>     } else {
>       // 例えば、何もしない
>     }
>   });
> });
> ```
> 
> 以上で、manifest_version が 3でpopup.htmlにトグルボタンを配置し、トグルボタンを保存し、各コードの正しいとされているコーディングルールに従う方法のソースコードは完成です。このコードをzipファイルに圧縮して、Chromeの拡張機能管理ページで読み込むと、拡張機能が動作します。⁵
> 
> もし、このコードについてもっと詳しく知りたい場合は、以下のウェブサイトを参考にしてみてください。¹²³⁴⁵
> 
> 私は、このコードを改善したり、他の機能を追加したりすることもできます。それとも、他の質問がありますか？😊
> 
> ソース: Bing との会話 2024/1/26
> (1) Chrome の拡張機能を Manifest V3 に対応する | バグ取りの日々. https://www.bugbugnow.net/2022/02/chrome-extension-manifest-v3.html.
> (2) 自分の作ったChrome拡張をManifest Version 3に対応させる - Zenn. https://zenn.dev/satoshie/articles/aa62f01faddd84.
> (3) Chrome拡張機能を「Manifest V3」に対応する手順 | ソフトアンテナ. https://softantenna.com/blog/chrome-extension-manifest-v3/.
> (4) Chrome拡張機能の概要から公開まで(ManifestV3対応) ~概要編 .... https://zenn.dev/kumomomo/articles/c4b5b363cab8f0.
> (5) Chrome拡張機能 manifest.json Ver.3の書き方 #JavaScript - Qiita. https://qiita.com/shiro1212/items/12f0a767494a7b2ab0b3.
> (6) undefined. https://developer.chrome.com/docs/extensions/reference/offscreen/.
> (7) undefined. https://developer.chrome.com/blog/mv2-transition/.

</details>

<details>
<summary>backgroud と content-script を組わせてショートカットキーで拡張機能を実行する方法</summary>

> こんにちは、これはBingです。Chrome拡張機能の開発に興味があるのですね。😊
> 
> Chrome拡張機能のmanifest_versionの「3」でbackgroundのservice_workerとcontent_scriptsを使いショートカットキーでクリップボードにコピーするソースコードを作成するには、以下の手順を参考にしてください。
> 
> - manifest.jsonファイルを作成し、必要な設定を記述します。¹²³⁴⁵
>     - manifest_versionを3に設定します。
>     - name, version, description, iconsなどの基本情報を設定します。
>     - actionにdefault_iconとdefault_popupを設定します。default_iconは拡張機能のアイコンを、default_popupはアイコンをクリックしたときに表示されるポップアップのHTMLファイルを指定します。
>     - backgroundにservice_workerを設定します。service_workerはバックグラウンドで実行されるJavaScriptファイルを指定します。manifest_versionが3の場合、service_workerは1つのファイルだけ指定できます。
>     - content_scriptsにmatches, js, cssを設定します。matchesはコンテンツスクリプトが挿入されるページのパターンを、jsとcssは挿入されるJavaScriptファイルとCSSファイルを指定します。
>     - commandsにinject-scriptを設定します。inject-scriptはショートカットキーで実行されるコマンドを指定します。suggested_keyにはショートカットキーの組み合わせを、descriptionにはコマンドの説明を指定します。
>     - permissionsにclipboardWrite, activeTab, scriptingを設定します。clipboardWriteはクリップボードに書き込む権限を、activeTabはアクティブなタブにアクセスする権限を、scriptingはタブにスクリプトを注入する権限を指定します。
>     - host_permissionsに<all_urls>を設定します。<all_urls>は拡張機能がアクセスできるすべてのURLを指定します。
> - popup.htmlファイルを作成し、ポップアップの内容を記述します。¹²³⁴⁵
>     - HTMLの基本構造を記述します。
>     - headタグにmetaタグとtitleタグを記述します。metaタグは文字コードをUTF-8に設定します。titleタグはポップアップのタイトルを設定します。
>     - headタグにlinkタグを記述します。linkタグはポップアップのスタイルを指定するCSSファイルを読み込みます。
>     - bodyタグにh1タグとpタグを記述します。h1タグは拡張機能の名前を、pタグはショートカットキーの使い方を記述します。
> - popup.cssファイルを作成し、ポップアップのスタイルを記述します。¹²³⁴⁵
>     - bodyタグにフォントファミリーとマージンを設定します。
>     - h1タグに色を設定します。
>     - pタグにフォントサイズを設定します。
> - background.jsファイルを作成し、バックグラウンドで実行されるスクリプトを記述します。¹²³⁴⁵
>     - chrome.commands.onCommand.addListenerを使ってコマンドが実行されたときのイベントリスナーを登録します。コマンドの名前を引数に取ります。
>     - chrome.tabs.queryを使ってアクティブなタブと現在のウィンドウに一致するタブを取得します。コールバック関数にタブの配列を引数に取ります。
>     - 配列の最初の要素をアクティブなタブとして変数に代入します。
>     - アクティブなタブのタイトルとURLを変数に代入します。
>     - タイトルとURLをMarkdown形式で結合した文字列を変数に代入します。
>     - chrome.tabs.sendMessageを使ってアクティブなタブにメッセージを送ります。タブのIDとメッセージのオブジェクトを引数に取ります。メッセージのオブジェクトにはコマンドと文字列をプロパティに持たせます。
>     - promiseをキャッチしてエラーを処理します。
> - content-script.jsファイルを作成し、コンテンツスクリプトとして実行されるスクリプトを記述します。¹²³⁴⁵
>     - chrome.runtime.onMessage.addListenerを使ってバックグラウンドスクリプトからメッセージを受け取るイベントリスナーを登録します。メッセージのオブジェクトを引数に取ります。
>     - メッセージのオブジェクトから文字列を取り出します。
>     - document.createElementを使ってテキストエリアを作成します。テキストエリアのvalueに文字列を設定します。document.body.appendChildを使ってテキストエリアをドキュメントに追加します。
>     - textArea.selectを使ってテキストエリアを選択します。document.execCommandを使ってクリップボードにコピーします。
>     - document.body.removeChildを使ってテキストエリアをドキュメントから削除します。
>     - alertを使ってコピーしたことを通知します。
> 
> これらのファイルを適切なフォルダに保存して、Chromeの拡張機能管理画面から読み込むと、拡張機能が動作するはずです。¹²³⁴⁵
> 
> もし、Chrome拡張機能の開発に関する他の質問があれば、お気軽にお尋ねください。😊
> 
> 以下は、各ファイルのコードの例です。
> 
> ```html
> <!-- popup.html -->
> <!DOCTYPE html>
> <html>
> <head>
>   <meta charset="UTF-8">
>   <title>TitleURL Copier</title>
>   <link rel="stylesheet" href="popup.css">
> </head>
> <body>
>   <h1>TitleURL Copier</h1>
>   <p>Press Ctrl+Shift+Y (or Command+Shift+Y on Mac) to copy the title and URL of the current page to the clipboard in Markdown format.</p>
> </body>
> </html>
> ```
> 
> ```css
> /* popup.css */
> body {
>   font-family: Arial, sans-serif;
>   margin: 10px;
> }
> 
> h1 {
>   color: #3c78d8;
> }
> 
> p {
>   font-size: 14px;
> }
> ```
> 
> ```javascript
> // background.js
> chrome.commands.onCommand.addListener(function(command) {
>   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
>     var activeTab = tabs [0];
>     var title = activeTab.title;
>     var url = activeTab.url;
>     var result = '[' + title + '](' + url + ')';
>     // Send a message to the content script
>     (async () => {
>       chrome.tabs.sendMessage(activeTab.id, {command: "copy", text: result})
>       // Catch any error
>       .catch(error => {
>         console.error(error);
>       });
>     })();
>   });
> });
> 
> // content-script.js
> // Listen for messages from the background script
> chrome.runtime.onMessage.addListener(function(request) {
>   // Create a textarea with the text to copy
>   const textArea = document.createElement('textarea');
>   textArea.value = request.text;
>   document.body.appendChild(textArea);
>   // Select the textarea and copy to the clipboard
>   textArea.select();
>   document.execCommand('copy');
>   // Remove the textarea
>   document.body.removeChild(textArea);
>   alert('Copied the title and URL of the current page to the clipboard');
> });
> ```
> 
> ```json
> // manifest.json
> {
>   "name": "TitleURL Copier",
>   "version": "1.0",
>   "manifest_version": 3,
>   "description": "Copies the URL and title of the current page to the clipboard in a specified format",
>   "icons": {
>     "16": "icon16.png",
>     "48": "icon48.png",
>     "128": "icon128.png"
>   },
>   "action": {
>     "default_icon": "popup16.png",
>     "default_popup": "popup.html"
>   },
>   "background": {
>     "service_worker": "background.js"
>   },
>   "content_scripts": [
>     {
>       "matches": ["<all_urls>"],
>       "js": ["content-script.js"]
>     }
>   ],
>   "commands": {
>     "inject-script": {
>       "suggested_key": {
>         "default": "Ctrl+Shift+Y",
>         "mac": "Command+Shift+Y"
>       },
>       "description": "Inject a script on the page"
>     }
>   },
>   "permissions": ["clipboardWrite","activeTab","scripting"],
>   "host_permissions": ["<all_urls>"]
> }
> ```
> 
> これらのコードを適切なフォルダに保存して、Chromeの拡張機能管理画面から読み込むと、拡張機能が動作するはずです。¹²³⁴⁵
> 
> もし、Chrome拡張機能の開発に関する他の質問があれば、お気軽にお尋ねください。😊
> 
> ソース: Bing との会話 2024/1/24
> (1) Chrome拡張機能 manifest.json Ver.3の書き方 #JavaScript - Qiita. https://qiita.com/shiro1212/items/12f0a767494a7b2ab0b3.
> (2) 自分の作ったChrome拡張をManifest Version 3に対応させる - Zenn. https://zenn.dev/satoshie/articles/aa62f01faddd84.
> (3) Chrome拡張機能を「Manifest V3」に対応する手順 | ソフトアンテナ. https://softantenna.com/blog/chrome-extension-manifest-v3/.
> (4) Chrome拡張機能のmanifestファイルをversion2からversion3へ .... https://blog.holyblue.jp/entry/2021/05/03/105010.
> (5) Chrome拡張機能の概要から公開まで(ManifestV3対応) ~概要編 .... https://zenn.dev/kumomomo/articles/c4b5b363cab8f0.
> (6) undefined. https://xxxxxxx.com/.
> (7) undefined. https://developer.chrome.com/extensions/declare_permissions.
> (8) undefined. https://developer.chrome.com/blog/mv2-transition/.

</details>

<details>
<summary>Auto Copy が有効の時にコピーすると自動で変換するコード</summary>

> ❓ Bing AIへの質問
> 
> 下記要件のChrome extensionのコードを提供してください。
> ・manifest_versionが3
> ・chrome.storage.localの設定情報を取得
> ・取得した設定情報が有効状態のとき、かつクリップボードの値が変更された事を契機にservice workerで実行
> ・service workerからクリップボードの値を受け取ったpopup.jsは値を変換してからクリップボードを書き換える
> ・コードは各ファイルにわけて提供
-----
> ✅ Bing AIの回答
> 
> こんにちは、これはBingです。Chrome extensionのコードを生成することができます。😊
> 
> あなたの要件に基づいて、以下のコードを提供します。コードはmanifest.json, background.js, popup.html, popup.jsの4つのファイルに分けられています。コードは参考文献¹²³⁴を参考にしています。
> 
> manifest.json
> 
> ```json
> {
>   "manifest_version": 3,
>   "name": "Clipboard Extension",
>   "version": "1.0",
>   "description": "A Chrome extension that modifies the clipboard value",
>   "icons": {
>     "16": "icon16.png",
>     "48": "icon48.png",
>     "128": "icon128.png"
>   },
>   "action": {
>     "default_icon": "icon16.png",
>     "default_popup": "popup.html"
>   },
>   "background": {
>     "service_worker": "background.js"
>   },
>   "permissions": [
>     "storage",
>     "clipboardRead",
>     "clipboardWrite"
>   ],
>   "host_permissions": [
>     "<all_urls>"
>   ]
> }
> ```
> 
> background.js
> 
> ```js
> // Listen for clipboard changes
> chrome.clipboard.onClipboardDataChanged.addListener(() => {
>   // Get the settings from chrome.storage.local
>   chrome.storage.local.get(["enabled", "transform"], (result) => {
>     // Check if the extension is enabled and the transform function is valid
>     if (result.enabled && typeof result.transform === "function") {
>       // Get the current clipboard value
>       chrome.clipboard.readText((text) => {
>         // Apply the transform function to the clipboard value
>         let newText = result.transform(text);
>         // Write the new value to the clipboard
>         chrome.clipboard.writeText(newText);
>         // Send a message to the popup.js with the old and new values
>         chrome.runtime.sendMessage({ oldText: text, newText: newText });
>       });
>     }
>   });
> });
> ```
> 
> popup.html
> 
> ```html
> <html>
> <head>
>   <style>
>     body {
>       font-family: Arial, sans-serif;
>       width: 300px;
>       height: 200px;
>     }
>     #status {
>       color: green;
>       font-weight: bold;
>     }
>     #error {
>       color: red;
>       font-weight: bold;
>     }
>     #transform {
>       width: 280px;
>       height: 100px;
>     }
>   </style>
> </head>
> <body>
>   <h1>Clipboard Extension</h1>
>   <p>Enable or disable the extension:</p>
>   <input type="checkbox" id="enabled" checked>Enabled</input>
>   <p>Enter the transform function:</p>
>   <textarea id="transform">return text.toUpperCase();</textarea>
>   <p id="status"></p>
>   <p id="error"></p>
>   <script src="popup.js"></script>
> </body>
> </html>
> ```
> 
> popup.js
> 
> ```js
> // Get the DOM elements
> let enabled = document.getElementById("enabled");
> let transform = document.getElementById("transform");
> let status = document.getElementById("status");
> let error = document.getElementById("error");
> 
> // Load the settings from chrome.storage.local
> chrome.storage.local.get(["enabled", "transform"], (result) => {
>   // Set the initial values of the checkbox and the textarea
>   enabled.checked = result.enabled;
>   transform.value = result.transform;
> });
> 
> // Listen for changes in the checkbox
> enabled.addEventListener("change", () => {
>   // Save the new value to chrome.storage.local
>   chrome.storage.local.set({ enabled: enabled.checked });
>   // Show a status message
>   status.textContent = "Extension " + (enabled.checked ? "enabled" : "disabled");
> });
> 
> // Listen for changes in the textarea
> transform.addEventListener("change", () => {
>   // Try to evaluate the transform function
>   try {
>     let func = new Function("text", transform.value);
>     // Save the new value to chrome.storage.local
>     chrome.storage.local.set({ transform: func });
>     // Show a status message
>     status.textContent = "Transform function updated";
>     // Clear any error message
>     error.textContent = "";
>   } catch (e) {
>     // Show an error message
>     error.textContent = "Invalid transform function: " + e.message;
>   }
> });
> 
> // Listen for messages from the background.js
> chrome.runtime.onMessage.addListener((message) => {
>   // Show a status message with the old and new clipboard values
>   status.textContent =
>     "Clipboard value changed from '" +
>     message.oldText +
>     "' to '" +
>     message.newText +
>     "'";
> });
> ```
> 
> ソース: Bing との会話 2024/1/26
> (1) Chrome拡張機能 manifest.json Ver.3の書き方 #JavaScript - Qiita. https://qiita.com/shiro1212/items/12f0a767494a7b2ab0b3.
> (2) [MV3] Chrome Extension 開発の教訓 #JavaScript - Qiita. https://qiita.com/ichitose/items/336bf5adb0fe3a985947.
> (3) Chrome拡張機能を「Manifest V3」に対応する手順 | ソフトアンテナ. https://softantenna.com/blog/chrome-extension-manifest-v3/.
> (4) Chrome拡張機能の概要から公開まで(ManifestV3対応) ~概要編 .... https://zenn.dev/kumomomo/articles/c4b5b363cab8f0.
> (5) undefined. https://xxxxxxx.com/.
> (6) undefined. https://developer.chrome.com/extensions/declare_permissions.
> (7) undefined. https://developer.chrome.com/docs/extensions/reference/action/.

</details>

<details>
<summary>Chrome extension 開発でjavascriptコードを共通化する方法</summary>

> ❓ Bing AIへの質問
> 
> Chrome extension 開発においてpopup.jsとcontent-script.js、background.jsそれぞれのjavascriptで共通で使用する関数の共通化する方法と使い方を実際のコードの具体例で教えて。
-----
> ✅ Bing AIの回答
> 
> こんにちは、これはBingです。Chrome extension 開発に関する質問をありがとうございます。😊
> 
> Chrome extension 開発では、popup.js, content-script.js, background.js などの異なるスクリプトファイルで共通で使用する関数を定義する方法はいくつかありますが、一般的な方法は以下のようなものです。
> 
> - 共通で使用する関数を別のスクリプトファイルにまとめて、それを各スクリプトファイルから読み込む
> - background.js で共通で使用する関数を定義して、それを他のスクリプトファイルから chrome.runtime.getBackgroundPage や chrome.runtime.sendMessage などのAPIを使って呼び出す
> 
> 具体的なコードの例を見てみましょう。
> 
> - 共通で使用する関数を別のスクリプトファイルにまとめて、それを各スクリプトファイルから読み込む
> 
> この方法では、例えば common.js というスクリプトファイルに共通で使用する関数を定義しておきます。例えば、以下のような関数です。
> 
> ```javascript
> // common.js
> 
> // 共通で使用する関数
> function hello(name) {
>   console.log("Hello, " + name);
> }
> ```
> 
> そして、このスクリプトファイルを popup.js や content-script.js などのスクリプトファイルから読み込んで使用します。読み込む方法は、manifest.json で js の配列に common.js を追加するか、HTMLファイルで script タグで common.js を指定するかのどちらかです。例えば、以下のようになります。
> 
> ```json
> // manifest.json
> 
> {
>   "manifest_version": 3,
>   "name": "Chrome extension sample",
>   "version": "1.0",
>   "content_scripts": [
>     {
>       "matches": ["<all_urls>"],
>       "js": ["common.js", "content-script.js"] // common.js を読み込む
>     }
>   ],
>   "action": {
>     "default_popup": "popup.html"
>   }
> }
> ```
> 
> ```html
> <!-- popup.html -->
> 
> <html>
>   <head>
>     <script src="common.js"></script> <!-- common.js を読み込む -->
>     <script src="popup.js"></script>
>   </head>
>   <body>
>     <button id="button">Click me</button>
>   </body>
> </html>
> ```
> 
> このようにして common.js を読み込んだら、popup.js や content-script.js などのスクリプトファイルで hello 関数を呼び出すことができます。例えば、以下のようになります。
> 
> ```javascript
> // popup.js
> 
> // ボタンがクリックされたら hello 関数を呼び出す
> document.getElementById("button").addEventListener("click", function() {
>   hello("popup"); // common.js で定義した関数を呼び出す
> });
> ```
> 
> ```javascript
> // content-script.js
> 
> // コンテンツスクリプトが実行されたら hello 関数を呼び出す
> hello("content-script"); // common.js で定義した関数を呼び出す
> ```
> 
> この方法の利点は、共通で使用する関数を一箇所にまとめることでコードの重複を避けられることや、各スクリプトファイルで直接関数を呼び出せることです。欠点は、共通で使用する関数が多くなると、読み込むスクリプトファイルが増えてパフォーマンスに影響する可能性があることや、スコープの衝突に注意する必要があることです。
> 
> - background.js で共通で使用する関数を定義して、それを他のスクリプトファイルから chrome.runtime.getBackgroundPage や chrome.runtime.sendMessage などのAPIを使って呼び出す
> 
> この方法では、background.js で共通で使用する関数を定義しておきます。例えば、以下のような関数です。
> 
> ```javascript
> // background.js
> 
> // 共通で使用する関数
> function hello(name, callback) {
>   callback("Hello, " + name);
> }
> ```
> 
> そして、この関数を popup.js や content-script.js などのスクリプトファイルから chrome.runtime.getBackgroundPage や chrome.runtime.sendMessage などのAPIを使って呼び出します。例えば、以下のようになります。
> 
> ```javascript
> // popup.js
> 
> // ボタンがクリックされたら background.js の hello 関数を呼び出す
> document.getElementById("button").addEventListener("click", function() {
>   // background.js の window オブジェクトを取得する
>   chrome.runtime.getBackgroundPage(function(bg) {
>     // hello 関数を呼び出してコールバック関数を渡す
>     bg.hello("popup", function(msg) {
>       // コールバック関数でメッセージを受け取る
>       console.log(msg); // Hello, popup
>     });
>   });
> });
> ```
> 
> ```javascript
> // content-script.js
> 
> // コンテンツスクリプトが実行されたら background.js の hello 関数を呼び出す
> // background.js にメッセージを送信する
> chrome.runtime.sendMessage({ name: "content-script" }, function(msg) {
>   // レスポンスを受け取る
>   console.log(msg); // Hello, content-script
> });
> 
> // background.js からメッセージを受け取るためのリスナーを登録する
> chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
>   // hello 関数を呼び出してコールバック関数を渡す
>   hello(request.name, function(msg) {
>     // コールバック関数でメッセージを受け取ってレスポンスとして返す
>     sendResponse(msg);
>   });
>   // 非同期でレスポンスを返す場合は true を返す
>   return true;
> });
> ```
> 
> この方法の利点は、background.js が常に実行されているので、共通で使用する関数をいつでも呼び出せることや、スコープの衝突を気にしなくてよいことです。欠点は、関数の呼び出しにメッセージ通信のAPIを使う必要があることや、非同期処理に注意する必要があることです。
> 
> 以上が、Chrome extension 開発においてpopup.jsとcontent-script.js、background.jsそれぞれのjavascriptで共通で使用する関数の共通化する方法と使い方の実際のコードの具体例です。参考になれば幸いです。😊
> 
> もっと詳しく知りたい場合は、以下のリンクをご覧ください。
> 
> - [ChromeExtensionでポップアップからコンテンツへメッセージ連動させる #JavaScript](^1^) - Qiita
> - [Chrome Extension の作り方 (その2: Contents Script)](^2^) - Qiita
> - [Chrome extensionでbackground.jsからpopup.jsの関数を呼びたい](^3^) - Stack Overflow
> - [Chrome拡張でページ内のwindowオブジェクトを取得してpopupやbackgroundから使う](^4^) - Zenn
> 
> ソース: Bing との会話 2024/1/26
> (1) ChromeExtensionでポップアップからコンテンツへメッセージ連動さ .... https://qiita.com/fsd-tomo-yoshida/items/c200b6705d3626cc04f2.
> (2) Chrome Extension の作り方 (その2: Contents Script) - Qiita. https://qiita.com/sakaimo/items/6b7b464de4bdcad18802.
> (3) Chrome extensionでbackground.jsからpopup.jsの関数を呼び .... https://ja.stackoverflow.com/questions/19411/chrome-extension%e3%81%a7background-js%e3%81%8b%e3%82%89popup-js%e3%81%ae%e9%96%a2%e6%95%b0%e3%82%92%e5%91%bc%e3%81%b3%e3%81%9f%e3%81%84.
> (4) Chrome拡張でページ内のwindowオブジェクトを取得してpopupや .... https://zenn.dev/ellreka/articles/799632c02d1cb5.
> (5) undefined. https://www.google.com/.
> (6) undefined. http://example.com/.
</details>

### Memo(japanese)

<details>
<summary>storageの設定値により参照するmanifest.jsonを切り替えられるのか</summary>

Bing AIに聞いた結果、manifest.jsonそのものを切り替えることはできなさそう。
ただ、popup.htmlが開かれた後、設定値により参照する要素を切り替えることができるそう。

この手法を使用することで、設定により拡張機能のアイコンクリックの動作を、
「popup.htmlを表示する動作」と「アイコンクリックでコピー」を分岐できるかも。

以下、Bing AIからの回答。

> こんにちは、Copilotです。Chrome Extension 開発に関するご質問ありがとうございます。😊
> 
> 残念ながら、storageに保存している設定値により、参照するmanifest.jsonを切り替えることは**できません**。manifest.jsonは拡張機能の基本的な情報や権限などを定義するファイルで、拡張機能のインストール時に読み込まれます。そのため、実行時に動的に変更することはできません¹²。
> 
> しかし、storageに保存している設定値により、参照する**別のファイル**を切り替えることは可能です。例えば、popup.htmlやcontent_script.jsなどのファイルを、storageの値に応じてロードすることができます。その場合は、chrome.storage APIを利用して、storageの値を取得したり、変更したりすることができます³⁴。
> 
> 以下に、storageの値によってpopup.htmlを切り替えるサンプルコードを生成しました。storageの値は、options.htmlで設定できるようにしています。コードはJavaScriptで記述しています。
> 
> ```javascript
> // manifest.json
> {
>   "name": "Popup Switcher",
>   "version": "1.0",
>   "description": "Switch popup.html based on storage value",
>   "permissions": ["storage"],
>   "action": {
>     "default_icon": {
>       "32": "images/icon32.png"
>     },
>     "default_popup": "popup.html"
>   },
>   "options_page": "options.html",
>   "icons": {
>     "48": "images/icon48.png"
>   },
>   "manifest_version": 3
> }
> 
> // popup.html
> <!DOCTYPE html>
> <html lang="ja">
> <head>
>   <meta charset="utf-8" />
>   <script src="popup.js"></script>
> </head>
> <body>
>   <div id="container"></div>
> </body>
> </html>
> 
> // popup.js
> // Get the storage value
> chrome.storage.sync.get("popup", function (value) {
>   // Default value is "A"
>   var popup = value.popup || "A";
>   // Load the corresponding popup file
>   var xhr = new XMLHttpRequest();
>   xhr.open("GET", "popup_" + popup + ".html", true);
>   xhr.onreadystatechange = function() {
>     if (xhr.readyState == 4) {
>       // Insert the popup content into the container
>       var container = document.getElementById("container");
>       container.innerHTML = xhr.responseText;
>     }
>   }
>   xhr.send();
> });
> 
> // popup_A.html
> <h1>Popup A</h1>
> <p>This is popup A.</p>
> 
> // popup_B.html
> <h1>Popup B</h1>
> <p>This is popup B.</p>
> 
> // options.html
> <!DOCTYPE html>
> <html lang="ja">
> <head>
>   <meta charset="utf-8" />
>   <script src="options.js"></script>
> </head>
> <body>
>   <h1>Options</h1>
>   <p>Select the popup you want to use.</p>
>   <form>
>     <input type="radio" name="popup" value="A" id="popup-A" checked>
>     <label for="popup-A">Popup A</label>
>     <input type="radio" name="popup" value="B" id="popup-B">
>     <label for="popup-B">Popup B</label>
>     <button type="button" id="save">Save</button>
>   </form>
> </body>
> </html>
> 
> // options.js
> // Save the popup value to the storage
> document.getElementById("save").addEventListener("click", function() {
>   var popup = document.querySelector("input[name='popup']:checked").value;
>   chrome.storage.sync.set({"popup": popup}, function() {
>     alert("Saved!");
>   });
> });
> 
> // Load the popup value from the storage
> chrome.storage.sync.get("popup", function (value) {
>   var popup = value.popup || "A";
>   document.getElementById("popup-" + popup).checked = true;
> });
> ```
> 
> このコードを実行すると、以下のような動作になります。
> 
> - options.htmlでPopup AかPopup Bを選択してSaveボタンを押すと、storageにpopupというキーで値が保存されます。
> - 拡張機能のアイコンをクリックすると、popup.htmlが表示されます。
> - popup.htmlでは、storageからpopupの値を取得して、popup_A.htmlかpopup_B.htmlのどちらかをロードします。
> - ロードしたファイルの内容がpopup.htmlのcontainerというdiv要素に挿入されます。
> 
> このように、storageに保存している設定値により、参照するファイルを切り替えることができます。ただし、manifest.jsonは切り替えることができないので、ご注意ください。
> 
> 以上、Chrome Extension 開発に関する回答でした。ご参考になれば幸いです。😊
> 
> ソース: Bing との会話 2024/2/8
> (1) [Chrome拡張] ストレージ (chrome.storage.local)を利用する方法. https://qiita.com/doran/items/38a89bcaf4b89c758725.
> (2) chrome.storageでchrome extension用のデータを保存・取得 .... https://easyramble.com/chrome-storage-set-and-get.html.
> (3) chrome extensionでデータを保存する - おおたの物置. https://ota42y.com/blog/2014/08/17/local-storage/.
> (4) storage - Mozilla | MDN. https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/API/Storage.
> (5) Chrome拡張の開発方法まとめ その1：概念編 #JavaScript - Qiita. https://qiita.com/k7a/items/26d7a22233ecdf48fed8.

</details>

## Author

[akiGAMEBOY - X (Twitter)](https://twitter.com/haretokidoki_x)

## Licence

[MIT Licence](https://github.com/akiGAMEBOY/Chrome-Ext_QuicklyCopyDecodedURL/blob/main/LICENSE)
