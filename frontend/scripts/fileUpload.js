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

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    document.getElementById('preview').src = url;
  } catch (err) {
    console.error(err);
    alert('エラーが発生しました');
  }
});
