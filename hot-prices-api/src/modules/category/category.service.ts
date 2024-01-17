import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { CreateCategoryDto } from 'src/models/dtos/create-category.dto';
import { Category } from 'src/models/entities/category.entity';
import { GetCategoryDto } from 'src/models/dtos/get-category.dto';
import { DeleteCategoryDto } from 'src/models/dtos/delete-category.dto';
import { ChildHandlingMethod } from 'src/models/enums/child-handling-method.enum';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: TreeRepository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(createCategoryDto);

    if (createCategoryDto.parentId) {
      const parentCategory = await this.categoryRepository.findOne({
        where: { id: createCategoryDto.parentId },
      });
      newCategory.parent = parentCategory;
    }

    return this.categoryRepository.save(newCategory);
  }

  // async update(
  //   id: number,
  //   updateCategoryDto: CreateCategoryDto,
  // ): Promise<Category> {
  //   const category = await this.categoryRepository.findOne({ where: { id } });

  //   if (updateCategoryDto.parentId) {
  //     const parentCategory = await this.categoryRepository.findOne({
  //       where: { id: updateCategoryDto.parentId },
  //     });
  //     category.parent = parentCategory;
  //   }

  //   this.categoryRepository.merge(category, updateCategoryDto);
  //   return this.categoryRepository.save(category);
  // }

  // async getById(id: number): Promise<Category> {
  //   return this.categoryRepository.findOne({
  //     where: { id },
  //     relations: ['children', 'parent', 'posts'],
  //   });
  // }

  async get(getCategoryDto: GetCategoryDto): Promise<Category[]> {
    let { id, descendants, ancestors } = getCategoryDto;
    if (id) {
      let category: Category;
      category = await this.categoryRepository.findOne({ where: { id } });
      if (!category)
        throw new NotFoundException(`Category with ID ${id} not found`);
      if (descendants)
        category.children = (
          await this.categoryRepository.findDescendantsTree(category)
        ).children;
      if (ancestors)
        category.parent = (
          await this.categoryRepository.findAncestorsTree(category)
        ).parent;
      return [category];
    } else {
      return await this.categoryRepository.findTrees();
    }
  }

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.findTrees();
  }

  async getDescendantsTree(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    return await this.categoryRepository.findDescendantsTree(category);
  }

  async getAncestorsTree(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    return await this.categoryRepository.findAncestorsTree(category);
  }

  async getTest(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    return await this.categoryRepository.findDescendants(category, {
      relations: ['posts'],
    });
  }

  async delete(deleteCategoryDto: DeleteCategoryDto): Promise<Category[]> {
    const category = await this.categoryRepository.findOne({
      where: { id: deleteCategoryDto.id },
      relations: ['children', 'parent', 'posts'],
    });

    if (!category) {
      throw new NotFoundException(
        `Category with ID ${deleteCategoryDto.id} not found`,
      );
    }

    const categoriesForUpdating = [];
    const categoriesForDeleting = [];

    switch (deleteCategoryDto.childHandlingMethod) {
      case ChildHandlingMethod.REASSIGN_TO_PARENT:
        if (!category.parent) {
          throw new BadRequestException(
            `Category with ID ${deleteCategoryDto.id} has no parent`,
          );
        }

        const parent = await this.categoryRepository.findOne({
          where: { id: category.parent.id },
          relations: ['children', 'posts'],
        });

        const children = (
          await this.categoryRepository.findDescendants(category, {
            relations: ['posts'],
          })
        ).filter((currCategory) => currCategory.id !== category.id);
        for (const child of children) {
          child.parent = parent;
          parent.children.push(child);
          categoriesForUpdating.push(child);
        }
        categoriesForUpdating.push(parent);
        break;

      case ChildHandlingMethod.DELETE:
        const descendants = await this.categoryRepository.findDescendants(
          category,
          { relations: ['posts'] },
        );
        categoriesForDeleting.push(...descendants);
        break;

      case ChildHandlingMethod.DETACH:
        const directChildren = await this.categoryRepository.findDescendants(
          category,
          { relations: ['posts'], depth: 1 },
        );
        console.log(directChildren);
        for (const child of directChildren) {
          child.parent = null;
          categoriesForUpdating.push(child);
        }
        break;

      default:
        throw new BadRequestException(`Invalid child handling method`);
    }

    categoriesForDeleting.push(category);

    for (const category of categoriesForDeleting) {
      if (category.posts && category.posts.length > 0) {
        throw new BadRequestException(
          `Category with ID ${category.id} is assigned to Post with ID ${category.posts[0].id}`,
        );
      }
    }

    await this.categoryRepository.save(categoriesForUpdating);
    await this.categoryRepository.remove(categoriesForDeleting);

    return categoriesForDeleting;
  }

  // async delete(deleteCategoryDto: DeleteCategoryDto): Promise<void> {
  //   let category: Category;
  //   const categoriesForDeleting: Category[] = [];
  //   const categoriesForUpdating: Category[] = [];
  //   const { id, childHandlingMethod } = deleteCategoryDto;

  //   if (childHandlingMethod) {
  //     category = this.get({ id, descendants: true, ancestors: true})[0];
  //     for (const child of category.children) {
  //       if (childHandlingMethod === ChildHandlingMethod.REASSIGN_TO_PARENT)
  //         child.parent = category.parent;
  //       else if (childHandlingMethod === ChildHandlingMethod.DETACH)
  //         child.parent = null;
  //       else if (childHandlingMethod === ChildHandlingMethod.DELETE)
  //         await this.categoryRepository.remove(child);
  //       else throw new BadRequestException('Invalid child handling method');
  //     }
  //   }
  //   else {
  //     category = await this.categoryRepository.findOne({ where: { id } });
  //     categoriesForDeleting.push(category);
  //     if (!category) {
  //       throw new NotFoundException(
  //         `Category with ID ${deleteCategoryDto.id} not found`,
  //       );
  //     }
  //   }
  //   await this.categoryRepository.remove(categoriesForDeleting);
  //   if(categoriesForUpdating.length > 0)
  //     await this.categoryRepository.save(categoriesForUpdating);

  // switch (childHandlingMethod) {
  //   case ChildHandlingMethod.REASSIGN_TO_PARENT:
  //     children = await this.categoryRepository.findDescendants(category);
  //     for (const child of children) {
  //       child.parent = category.parent;
  //       await this.categoryRepository.save(child);
  //     }
  //     break;
  //   case ChildHandlingMethod.DETACH:
  //     children = await this.categoryRepository.findDescendants(category);
  //     for (const child of children) {
  //       child.parent = null;
  //       await this.categoryRepository.save(child);
  //     }
  //     break;
  //   case ChildHandlingMethod.DELETE:
  //     await this.categoryRepository.remove(category);
  //     break;
  // }
  // }
}
