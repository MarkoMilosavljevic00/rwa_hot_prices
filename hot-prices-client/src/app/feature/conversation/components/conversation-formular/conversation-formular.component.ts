import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { CategoryService } from 'src/app/feature/post/services/category.service';
import { Coupon } from 'src/app/feature/coupon/models/coupon.model';
import { Conversation } from '../../models/conversation.model';
import { ActivatedRoute } from '@angular/router';
import { loadCategories } from 'src/app/feature/post/state/category/category.action';
import { selectCategoriesList } from 'src/app/feature/post/state/category/category.selector';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Subscription, filter, skip, switchMap } from 'rxjs';
import {
  clearEditingConversation,
  createConversation,
  loadEditingConversation,
  updateConversation,
} from '../../state/conversation.action';
import { selectEditingConversation } from '../../state/conversation.selector';
import { selectIdFromRouteParams } from 'src/app/state/app.selectors';
import { isNotUndefined } from 'src/app/common/type-guards';
import { FormConversationDto } from '../../models/dtos/form-conversation.dto';
import { PostType } from 'src/app/common/enums/post-type.enum';
import { Category } from 'src/app/feature/post/models/category.model';

@Component({
  selector: 'app-conversation-formular',
  templateUrl: './conversation-formular.component.html',
  styleUrls: ['./conversation-formular.component.css'],
})
export class ConversationFormularComponent {
  conversation?: Conversation;
  conversationForm: FormGroup;
  editMode: boolean = false;

  conversationSubscription: Subscription;

  categoryOptions: TreeNode[];
  selectedCategory?: TreeNode;

  get contentControl() {
    return this.conversationForm.get('content');
  }

  constructor(
    private store: Store<AppState>,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
    this.initValues();
    this.loadConversation();
  }

  initFormGroup() {
    this.conversationForm = new FormGroup({
      title: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      content: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      selectedCategory: new FormControl(),
    });
  }

  private initValues() {
    this.store.dispatch(loadCategories());
    this.store.select(selectCategoriesList).subscribe((categories) => {
      this.categoryOptions = categories.map((category) =>
        this.categoryService.convertCategoryToTreeNode(category)
      );
    });
  }

  loadConversation() {
    this.conversationSubscription = this.store
      .select(selectIdFromRouteParams)
      .pipe(
        filter(isNotUndefined),
        switchMap((conversationId) => {
          this.store.dispatch(loadEditingConversation({ id: +conversationId }));
          return this.store.select(selectEditingConversation);
        }),
        skip(1)
      )
      .subscribe((conversation) => {
        if (conversation) {
          this.editMode = true;
          this.conversation = { ...conversation };
          this.patchFormWithLoadedConversation();
        }
      });
  }

  patchFormWithLoadedConversation() {
    this.conversationForm.patchValue({
      title: this.conversation?.title,
      selectedCategory: this.categoryService.convertCategoryToTreeNode(
        this.conversation!.category
      ),
      content: this.conversation?.content,
    });
  }

  onContentChange(content: string) {
    this.contentControl?.setValue(content);
  }

  onSubmit() {
    const formConversationDto: FormConversationDto = {
      ...this.conversationForm.value,
      postType: PostType.CONVERSATION,
      categoryId: this.conversationForm.value.selectedCategory.data.id,
      selectedCategory: undefined,
    };

    console.log(formConversationDto);

    if (this.editMode) {
      this.store.dispatch(
        updateConversation({ id: this.conversation!.id, formConversationDto })
      );
    } else {
      this.store.dispatch(createConversation({ formConversationDto }));
    }
  }

  ngOnDestroy(): void {
    this.conversationSubscription.unsubscribe();
    this.store.dispatch(clearEditingConversation());
  }
}
