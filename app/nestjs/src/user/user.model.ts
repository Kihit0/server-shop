import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column
  firstname: string;

  @Column
  lastname: string;

  @Column
  age: number;

  @Column
  gender: string;

  @Column({ defaultValue: false })
  has_problem: boolean;
}
