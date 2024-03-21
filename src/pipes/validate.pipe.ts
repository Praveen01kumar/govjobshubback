/* eslint-disable prettier/prettier */
import { Injectable, ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
   public async transform(value, metadata: ArgumentMetadata) {
      try {
         return await super.transform(value, metadata);
      } catch (e) {
         this.handleTransformError(e);
         throw e;
      }
   }

   private handleTransformError(error: any): void {
      if (error instanceof BadRequestException) {
         const response = error.getResponse() as { message?: string | string[] };
         const originalMessages = response?.message;
         let validationErrors: string[] = [];
         if (Array.isArray(originalMessages)) {
            validationErrors = originalMessages.map((msg) => `${msg}`);
         } else if (typeof originalMessages === 'string') { validationErrors.push(`${originalMessages}`); }
         const customResponse = { message: validationErrors, error: 'Validation Error', statusCode: 400 };
         error.message = JSON.stringify(validationErrors);
         error.getResponse = () => customResponse;
      }
   }


}
