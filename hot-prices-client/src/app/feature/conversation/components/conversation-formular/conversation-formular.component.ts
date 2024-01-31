import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { CategoryService } from 'src/app/feature/post/services/category.service';
import { CONVERSATIONS } from '../../services/conversations.model';
import { Coupon } from 'src/app/feature/coupon/models/coupon.model';
import { Conversation } from '../../models/conversation.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversation-formular',
  templateUrl: './conversation-formular.component.html',
  styleUrls: ['./conversation-formular.component.css'],
})
export class ConversationFormularComponent {
  conversation?: Conversation;
  conversationForm: FormGroup;
  content: string;
  categoryOptions: TreeNode[];

  get contentControl() {
    return this.conversationForm.get('content');
  }

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
    this.initInnerElementsValues();
    this.patchValues();
  }

  patchValues() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.conversation = CONVERSATIONS.find(
          (conversation) => conversation.id.toString() === id
        );
        this.conversationForm.patchValue({
          title: this.conversation?.title,
          selectedCategory: this.categoryService.convertCategoryToTreeNode(
            this.conversation!.category
          ),
          content: this.conversation?.content,
        });
      }
    });
  }

  private initInnerElementsValues() {
    // this.categoryOptions = this.categoryService.getAllCategoriesAsTreeNodes();
  }

  private initFormGroup() {
    this.conversationForm = new FormGroup({
      title: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      content: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      contentPlainText: new FormControl(''),
      selectedCategory: new FormControl(),
    });
  }

  onContentChange(content: string) {
    this.contentControl?.setValue(content);
  }

  onSubmit() {
    console.log(this.conversationForm.value);
  }
}
