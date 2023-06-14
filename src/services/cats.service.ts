export class CatsService {
  private readonly cats: string[] = ['Tiger', 'Cheetah', 'Leopard'];
  private readonly breeds: string[] = ['Abyssinian', 'Shorthair', 'Sphynx'];

  create(cat: string) {
    this.cats.push(cat);
  }

  findAll(): string[] {
    return this.cats;
  }

  getBreeds(): string[] {
    return this.breeds;
  }
}
