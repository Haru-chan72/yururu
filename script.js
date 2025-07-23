document.addEventListener('DOMContentLoaded', () => {
    // 説明文の折りたたみボタン
    const toggleButtons = document.querySelectorAll('.toggle-description-button');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const descriptionContent = button.nextElementSibling;

            if (descriptionContent.style.display === 'none' || descriptionContent.style.display === '') {
                descriptionContent.style.display = 'block';
                button.textContent = 'とじる';
            } else {
                descriptionContent.style.display = 'none';
                button.textContent = 'よむ';
            }
        });
    });

    // 絵文字リアクション機能
    const emojiButtons = document.querySelectorAll('.emoji-button');
    // ★★★ ここにApps ScriptのウェブアプリURLを貼り付けてください ★★★
    const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw_ZstVQ3tub2MD-Si65aKNH9yFsFdxphwvXgkCHGesnLDVPrycS3kXEivCHGtstj9X3Q/exec'
    emojiButtons.forEach(button => {
        button.addEventListener('click', async () => {
            // 親のイラストアイテムからIDを取得
            const illustrationItem = button.closest('.illustration-item');
            const illustrationId = illustrationItem ? illustrationItem.dataset.illustrationId : 'unknown';
            const emoji = button.dataset.emoji; // クリックされた絵文字を取得

            try {
                const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // CORSエラーを避けるため、no-corsモードにする
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        illustrationId: illustrationId,
                        emoji: emoji // 絵文字データを送信
                    }),
                });

                // no-corsモードでは、レスポンスの内容をJavaScriptで読み取ることができません。
                // 成功したかどうかは、ネットワークタブでリクエストが200 OKになっているかで確認します。
                console.log(`絵文字リアクションが記録されました: ${illustrationId} - ${emoji}`);
                // 必要であれば、ここに一時的な視覚フィードバック（例: 絵文字が短く光る）を追加できます。

            } catch (error) {
                console.error('絵文字リアクションの送信中にエラーが発生しました:', error);
                // alert('絵文字リアクションの送信に失敗しました。時間をおいて再度お試しください。'); // 失敗時アラートはUXを損なう場合があるので、コメントアウト推奨
            }
        });
    });
});