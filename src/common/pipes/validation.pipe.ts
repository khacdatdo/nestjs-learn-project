import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  UnprocessableEntityException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AllValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object, {
      validationError: { target: false },
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    if (Object.keys(object).length === 0) {
      throw new UnprocessableEntityException('Empty request body');
    }
    if (errors.length > 0) {
      throw new UnprocessableEntityException(this.getErrorsString(errors));
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private getErrorsString(errors: any[]) {
    return errors
      .map((err) => {
        return Object.values(err.constraints).join(', ');
      })
      .join(', ');
  }
}
