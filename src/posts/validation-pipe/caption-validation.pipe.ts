import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";


@Injectable()
export class CaptionValidationPipe implements PipeTransform {
  transform(value: any): object {
    const imgCaption = value.caption;
    const trimmed = (imgCaption != '' && imgCaption != null) ? imgCaption?.trim() : [];
    if (trimmed.length === 0){
      throw new BadRequestException('Caption cannot be empty');
    }
    if (trimmed.length > 200){
      throw new BadRequestException('Caption cannot exceeds 200 characters');
    }
    value['imgCaption'] = trimmed;
    return value;
  }
}