import {
  IsString,
} from 'class-validator';
import { FormPostDto } from 'src/modules/post/dtos/form-post.dto';

export class FormConversationDto extends FormPostDto {
  @IsString()
  content: string;
}
