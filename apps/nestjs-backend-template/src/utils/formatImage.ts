import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'formatImage', async: false })
export class ValidateFormatImage implements ValidatorConstraintInterface {
    validate(value: string): Promise<boolean> | boolean {
        if ([
            'avif',
            'dz',
            'fits',
            'gif',
            'heif',
            'input',
            'jpeg',
            'jpg',
            'jp2',
            'jxl',
            'magick',
            'openslide',
            'pdf',
            'png',
            'ppm',
            'raw',
            'svg',
            'tiff',
            'tif',
            'v',
            'webp',
        ].includes(value))
            return true
        return false

    }
    defaultMessage?(args?: ValidationArguments): string {
        return `the destination format ${args.value} is not valid the valid format are: (avif, dz, fits, gif, heif, input, jpeg, jpg, jp2, jxl, magick, openslide, pdf, png, ppm, raw, svg, tiff, tif, v, webp)`
    }

}