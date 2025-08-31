document.getElementById('uploadBtn').addEventListener('click', async () => {
  const fileInput = document.getElementById('fileInput');
  if (!fileInput.files.length) {
    alert('画像を選択してください');
    return;
  }

  const formData = new FormData();
  formData.append('image', fileInput.files[0]);

  try {
    const res = await fetch('http://localhost:8080/api/images/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('アップロード失敗');

    const data = await res.json();

    // メタデータ
    console.log('Metadata:', data.metadata);

    // 画像表示
    document.getElementById('preview').src = data.imageUrl;
  } catch (err) {
    console.error(err);
    alert('エラーが発生しました');
  }
});
