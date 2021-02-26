import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';

export interface IUser {
  id?: number;
  email: string;
  name: string;
  password: string;
  status?: boolean;
  recover_token?: string;
  created_at?: Date;
  updated_at?: Date;
}

@Table({
  tableName: 'user',
  modelName: 'user',
})
export class User extends Model<User> implements IUser {

  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED
  })
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  @Column({ allowNull: false, type: DataType.STRING })
  email: string;

  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @Column({ allowNull: false, type: DataType.STRING })
  password: string;

  @Column({ allowNull: true, type: DataType.STRING })
  recover_token: string;

  @Column({ allowNull: false, type: DataType.BOOLEAN })
  status: boolean;

  @CreatedAt
  public readonly created_at!: Date;

  @UpdatedAt
  public readonly updated_at!: Date;
}
