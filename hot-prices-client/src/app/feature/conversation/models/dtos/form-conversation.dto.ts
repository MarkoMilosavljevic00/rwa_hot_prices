import { Category } from "src/app/feature/post/models/category.model";

export class FormConversationDto {
  postType: string;
  title: string;
  categoryId: number;
  content: string;
}
