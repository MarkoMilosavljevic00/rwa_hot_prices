import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { CategoryService } from 'src/app/feature/post/services/category.service';

@Component({
  selector: 'app-conversation-formular',
  templateUrl: './conversation-formular.component.html',
  styleUrls: ['./conversation-formular.component.css'],
})
export class ConversationFormularComponent {
  conversationForm: FormGroup;
  content: string;
  categoryOptions: TreeNode[];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.conversationForm = new FormGroup({
      title: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      selectedNodes: new FormControl(null, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
    this.categoryOptions = this.categoryService.getCategoriesAsTreeNodes();
  }

  onSubmit() {
    console.log(this.conversationForm.value);
  }
}
