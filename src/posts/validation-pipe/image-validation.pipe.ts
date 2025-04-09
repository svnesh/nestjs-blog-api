import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";


export class ImageValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File): Express.Multer.File {
    const allowedFileFormats = ['image/jpeg', 'image/png'];
    if (!file) throw new BadRequestException('Image is required');

    if (!allowedFileFormats.includes(file.mimetype)) {
      throw new BadRequestException('Only JPEG & PNG are allowed to upload');
    }

    if (file.size > 2 * 1024 * 1024) {
      throw new BadRequestException('Image too large (max 2MB)');
    }
    return file;    
  }
}