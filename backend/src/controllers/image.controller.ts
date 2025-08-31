// image.controller.ts
import { Request, Response } from 'express';
import { processImage } from '../services/image.service.js';
import { extractMetadata } from '../services/metadata.service.js';

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'ファイルがありません' });
    }

    // Step 1. metadata解析
    const metadata = await extractMetadata(req.file.buffer);

    // Step 2. 画像加工
    const processedImage = await processImage(req.file.buffer);

    // Step 3. レスポンス（JSON + 画像URL風）
    // 一旦メモリに保存した画像を `/tmp` 的な場所に出してURL返すイメージ
    const imageBase64 = processedImage.toString('base64');
    const imageSrc = `data:image/webp;base64,${imageBase64}`;

    res.json({
      metadata,
      imageUrl: imageSrc,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '画像処理失敗' });
  }
};
