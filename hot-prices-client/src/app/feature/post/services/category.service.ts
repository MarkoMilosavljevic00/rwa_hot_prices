import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[];

  constructor() {
    this.categories = this.createCategories();
  }

  private createCategories(): Category[] {
    // Kreiranje instanci kategorija
    let category1: Category = {
      id: 1,
      name: 'Kategorija 1',
      imgPaths: ['path1', 'path2'],
    };
    let category2: Category = {
      id: 2,
      name: 'Kategorija 2',
      imgPaths: ['path3', 'path4'],
    };
    let category3: Category = {
      id: 3,
      name: 'Kategorija 3',
      imgPaths: ['path5', 'path6'],
    };
    let category4: Category = {
      id: 4,
      name: 'Kategorija 4',
      imgPaths: ['path7', 'path8'],
    };
    let category5: Category = {
      id: 5,
      name: 'Kategorija 5',
      imgPaths: ['path9', 'path10'],
    };

    // Kreiranje dece za kategorije
    let child1: Category = {
      id: 6,
      name: 'Dete 1',
      imgPaths: ['path11', 'path12'],
      parent: category1,
    };
    let child2: Category = {
      id: 7,
      name: 'Dete 2',
      imgPaths: ['path13', 'path14'],
      parent: category2,
    };
    let child3: Category = {
      id: 8,
      name: 'Dete 3',
      imgPaths: ['path15', 'path16'],
      parent: category3,
    };
    let child4: Category = {
      id: 9,
      name: 'Dete 4',
      imgPaths: ['path17', 'path18'],
      parent: category4,
    };
    let child5: Category = {
      id: 10,
      name: 'Dete 5',
      imgPaths: ['path19', 'path20'],
      parent: category5,
    };

    // Dodavanje dece kategorijama
    category1.children = [child1];
    category2.children = [child2];
    category3.children = [child3];
    category4.children = [child4];
    category5.children = [child5];

    // Kreiranje unuka za kategorije
    let grandChild1: Category = {
      id: 11,
      name: 'Unuk 1',
      imgPaths: ['path21', 'path22'],
      parent: child1,
    };
    let grandChild2: Category = {
      id: 12,
      name: 'Unuk 2',
      imgPaths: ['path23', 'path24'],
      parent: child2,
    };

    // Dodavanje unuka deci
    child1.children = [grandChild1];
    child2.children = [grandChild2];

    // Vraćanje svih nadređenih kategorija
    return [category1, category2, category3, category4, category5];
  }

  public getAllCategories(): Category[] {
    return this.categories;
  }

  convertToTreeNode(category: Category, keyPrefix = ''): TreeNode {
    let node: TreeNode = {
      key: keyPrefix + category.id,
      label: category.name,
      data: category,
      icon: 'pi pi-fw pi-inbox', // Ovde možete postaviti ikonicu koju želite da koristite za kategorije
      children: category.children?.map((child, index) =>
        this.convertToTreeNode(child, keyPrefix + category.id + '-')
      ),
      leaf: category.children?.length === 0,
    };

    return node;
  }

  getCategoriesAsTreeNodes() {
    return this.categories.map((category) => this.convertToTreeNode(category));
  }
}
