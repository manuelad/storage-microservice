import * as sharp from 'sharp';

export function thumbnailGeneration(buffer: Buffer, width: number = 200, height: number = 200, format: keyof sharp.FormatEnum = 'jpeg') {
    return sharp(buffer)
        .resize(width, height)
        .toFormat(format)
        .toBuffer();
}