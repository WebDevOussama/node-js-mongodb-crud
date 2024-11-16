export default class Product {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string,
    public price: number,
    public quantity: number,
    public category: string,
    public tags: string[],
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
