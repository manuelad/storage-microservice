import { Type } from "class-transformer";
import { IsOptional, IsPositive, Validate } from "class-validator";
import * as sharp from 'sharp';
import { ValidateFormatImage } from "../utils/formatImage";
import { ApiProperty } from "@nestjs/swagger";


export enum FormatImage {
    avif = 'avif',
    dz = 'dz',
    fits = 'fits',
    gif = 'gif',
    heif = 'heif',
    input = 'input',
    jpeg = 'jpeg',
    jpg = 'jpg',
    jp2 = 'jp2',
    jxl = 'jxl',
    magick = 'magick',
    openslide = 'openslide',
    pdf = 'pdf',
    png = 'png',
    ppm = 'ppm',
    raw = 'raw',
    svg = 'svg',
    tiff = 'tiff',
    tif = 'tif',
    v = 'v',
    webp = 'webp',
}


export class CreateImageDto {

    @ApiProperty({
        required: false,
        description: 'Width of the image',
        default: 200,
        type: Number
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    width: number

    @ApiProperty({
        required: false,
        description: 'Height of the image',
        default: 200,
        type: Number
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    height: number

    @ApiProperty({
        required: false,
        description: 'Format of the image',
        default: 'jpg',
        type: String,
        enum: FormatImage
    })
    @IsOptional()
    @Validate(ValidateFormatImage)
    format: keyof sharp.FormatEnum

    @ApiProperty({ type: 'array', items: { type: 'File', format: 'binary' } })
    files: Array<Express.Multer.File>


}

