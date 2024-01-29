import { Injectable } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { Category } from '../models/category.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GetCategoryDto } from '../models/dtos/get-category.dto';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[];

  constructor(private http: HttpClient) {}

  convertCategoryToTreeNode(
    category: Category,
    keyPrefix = ''
  ): TreeNode<Category> {
    let node: TreeNode<Category> = {
      key: keyPrefix + category.id,
      label: category.name,
      data: category,
      // icon: 'pi pi-fw pi-inbox',
      children: category.children?.map((child, index) =>
        this.convertCategoryToTreeNode(child, keyPrefix + category.id + '-')
      ),
      leaf: category.children?.length === 0,
    };

    return node;
  }

  convertCategoryToMenuItems(category: Category): MenuItem[] {
    const categoryMenuItems = [];
    let currentCategory: Category | undefined = category;
    while (currentCategory) {
      categoryMenuItems.unshift({
        label: currentCategory.name,
        // routerLink: `/category/${currentCategory.id}`,
      });
      currentCategory = currentCategory.parent;
    }
    return categoryMenuItems;
  }

  convertTreeNodeToCategory(treeNode: TreeNode): Category {
    return treeNode.data;
  }

  getAllCategoriesAsTreeNodes() {
    // return this.categories.map((category) =>
    //   this.convertCategoryToTreeNode(category)
    // );
    return this.http.get<Category[]>(`${environment.api}/category`).pipe(
      map((categories) => {
        let treeNodes = categories.map((category) =>
          this.convertCategoryToTreeNode(category)
        );
        return treeNodes;
      })
    );
  }

  getAll() {
    return this.http.get<Category[]>(`${environment.api}/category`);
  }
}
