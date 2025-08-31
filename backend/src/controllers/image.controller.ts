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
    console.log('Metadata:', metadata);

    // Step 2. 画像加工
    const processedImage = await processImage(req.file.buffer);

    // 画像とmetadata両方返す
    res.set('Content-Type', 'application/json');
    res.send({
      metadata,
      image: processedImage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '画像処理失敗' });
  }
};
