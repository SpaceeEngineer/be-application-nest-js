import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exceptions/validation.exception";


@Injectable()
export class ValidationDate implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const objReq = plainToClass(metadata.metatype, value);
        const errors = await validate(objReq);

        if (errors.length) {
            let messages = errors.map(err => {
                return `${err.property} - ${Object.values(err.constraints).join(', ')}`
            })
            throw new ValidationException(messages)
        }
    }
    
}