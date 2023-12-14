import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/feature/post/models/category';
import { CategoryService } from 'src/app/feature/post/services/category.service';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-offer-formular',
  templateUrl: './offer-formular.component.html',
  styleUrls: ['./offer-formular.component.css'],
})
export class OfferFormularComponent implements OnInit {
  description: string = '';
  offerForm: FormGroup;
  uploadedFiles: any[] = [];
  options: TreeNode[] = [];

  constructor(
    private messageService: MessageService,
    private categoryService: CategoryService
  ) {}

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }

  ngOnInit(): void {
    this.offerForm = new FormGroup({
      basicInformation: new FormGroup({
        title: new FormControl(' ', {nonNullable: true, validators: [Validators.required],}),
      }),
      selectedNodes: new FormControl(null, {nonNullable: true, validators: [Validators.required],}),
      saleType: new FormControl(''),
      link: new FormControl(''),
      location: new FormControl(''),
    });
    const categories = this.categoryService.getAllCategories();
    this.options = this.categoryService.getCategoriesAsTreeNodes();

    this.offerForm.get('selectedNodes')?.valueChanges.subscribe((value) => {
      console.log('selectedNodes value changed:', value);
    });
  }

  onSubmit() {
    console.log(this.offerForm);
  }
}
