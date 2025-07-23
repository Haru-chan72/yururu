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
    const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw_ZstVQ3tub2MD-Si65aKNH9yFsFdxphwvXgkCHGesnLDVPrycS3kXEivCHGtstj9X3Q/exec';

    emojiButtons.forEach(button => {
        button.addEventListener('click', async (event) => { // ★イベントオブジェクト(event)を受け取るように修正★
            // 親のイラストアイテムからIDを取得
            const illustrationItem = button.closest('.illustration-item');
            const illustrationId = illustrationItem ? illustrationItem.dataset.illustrationId : 'unknown';
            const emoji = button.dataset.emoji; // クリックされた絵文字を取得

            // ★ここからパーティクルエフェクトの追加★
            createEmojiParticle(emoji, event.clientX, event.clientY);
            // ★ここまでパーティクルエフェクトの追加★

            try {
                const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        illustrationId: illustrationId,
                        emoji: emoji
                    }),
                });

                console.log(`絵文字リアクションが記録されました: ${illustrationId} - ${emoji}`);

            } catch (error) {
                console.error('絵文字リアクションの送信中にエラーが発生しました:', error);
            }
        });
    });

    // ★★★ ここから新しい関数を追加 ★★★
    function createEmojiParticle(emojiText, startX, startY) {
        const particle = document.createElement('div');
        particle.textContent = emojiText;
        particle.style.position = 'fixed'; // 画面上に固定表示
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.fontSize = '1em'; // 絵文字の大きさ
        particle.style.pointerEvents = 'none'; // クリックが透過するようにする
        particle.style.opacity = '1'; // 最初は不透明
        particle.style.transform = 'translate(-50%, -50%)'; // 中心を基準に配置
        particle.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out'; // アニメーションの速度
        particle.style.zIndex = '9999'; // 他の要素の上に表示

        document.body.appendChild(particle);

        // 少し遅延させてからアニメーションを開始
        // これにより、transitionが適用される前に初期位置が設定される
        setTimeout(() => {
            const randomOffsetX = (Math.random() - 0.5) * 30; // -25px から 25px の範囲で横にずらす
            const randomOffsetY = Math.random() * 10 + 45; // 50px から 130px の範囲で上に移動

            particle.style.opacity = '0'; // 徐々に透明に
            particle.style.transform = `translate(${randomOffsetX}px, -${randomOffsetY}px) scale(1.2)`; // 上に移動し、少し拡大
        }, 10); // 10msのわずかな遅延

        // アニメーション終了後に要素を削除
        particle.addEventListener('transitionend', () => {
            particle.remove();
        });
    }
    // ★★★ ここまで新しい関数を追加 ★★★
});