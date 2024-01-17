import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Category } from '../models/category.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GetCategoryDto } from '../models/dtos/get-category.dto';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[];

  constructor(private http: HttpClient) {}

  convertCategoryToTreeNode(category: Category, keyPrefix = ''): TreeNode {
    let node: TreeNode = {
      key: keyPrefix + category.id,
      label: category.name,
      data: category,
      icon: 'pi pi-fw pi-inbox', // Ovde možete postaviti ikonicu koju želite da koristite za kategorije
      children: category.children?.map((child, index) =>
        this.convertCategoryToTreeNode(child, keyPrefix + category.id + '-')
      ),
      leaf: category.children?.length === 0,
    };

    return node;
  }

  convertTreeNodeToCategory(treeNode: TreeNode): Category {
    return treeNode.data;
  }

  getAllCategoriesAsTreeNodes() {
    return this.categories.map((category) =>
      this.convertCategoryToTreeNode(category)
    );
  }

  getAll() {
    return this.http.get<Category[]>(`${environment.api}/category`);
  }
}
