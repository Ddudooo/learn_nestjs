import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { FindOption } from '../dto/request/findOption.dto';

@Injectable()
export class ReqFindOption implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const option: FindOption = new FindOption();
    option.offset = +value.offset || 0;
    option.pageSize = +value.pageSize || 10;
    option.sort = value.sort || undefined;

    return option;
  }
}
