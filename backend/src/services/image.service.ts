import sharp from 'sharp';

export const processImage = async (buffer: Buffer): Promise<Buffer> => {
  return await sharp(buffer)
    .rotate() // Exifのorientationを自動補正
    .resize(800)
    .modulate({ saturation: 0.8, brightness: 0.9 })
    .toFormat('webp', { quality: 70 })
    .toBuffer();
};
