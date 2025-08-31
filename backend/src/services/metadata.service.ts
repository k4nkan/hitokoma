import sharp from 'sharp';
import exifReader from 'exif-reader';

export const extractMetadata = async (buffer: Buffer) => {
  const metadata = await sharp(buffer).metadata();

  if (metadata.exif) {
    const exif = exifReader(metadata.exif);
    return {
      format: metadata.format,
      width: metadata.width,
      height: metadata.height,
      orientation: metadata.orientation,
      exif, // 撮影日時やGPS含む
    };
  }

  return {
    format: metadata.format,
    width: metadata.width,
    height: metadata.height,
    orientation: metadata.orientation,
    exif: null,
  };
};
