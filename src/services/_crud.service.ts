import { CreateOptions, FindOptions, Model as OriginalModel } from 'sequelize';
import { Model, Repository } from 'sequelize-typescript';

export interface IRead<T> {
  filter(item: any): Promise<Model<T>[]>;
  findOne(id: number): Promise<Model<T>>;
}

export interface IWrite<T> {
  create(item: T): Promise<T>;
  update(id: number, item: T): Promise<T>;
  destroy(id: number): Promise<number>;
}

export class CrudService<T2 extends OriginalModel> {

  constructor(protected repository: Repository<T2>) {}

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  async create(payload: any) {
    return this.repository.create(payload);
  }

  async update(id: number, payload): Promise<T2> {
    const [affedtedRows] = await this.repository.update(payload, { where: { id } });
    if (affedtedRows < 1)
      throw new Error('Cannot update this item');

    return this.repository.findOne({ where: { id }});
  }

  delete(id: number) {
    return this.repository.destroy({ where: { id: id } });
  }

}