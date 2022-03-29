import { Category } from '../../entities/category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find(category => category.name === name);
    return category;
  }
  async list(): Promise<Category[]> {
    const all = this.categories;

    return all;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(Category, { name, description });

    this.categories.push(category);
  }
  import({}: {}) {
    throw new Error('Method not implemented.');
  }
}

export { CategoriesRepositoryInMemory };