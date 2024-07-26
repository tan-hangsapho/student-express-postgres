import { Entity, PrimaryGeneratedColumn, Column, Index, Check } from "typeorm";

@Entity()
@Index(["isDeleted"])
@Check(`"age" >= 0 AND "age" <= 120`)
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  firstName!: string;

  @Column({ type: "varchar", length: 100 })
  lastName!: string;

  @Column({ type: "int" })
  age!: number;

  @Column({ type: "varchar", length: 100, unique: true })
  email!: string;

  @Column({ type: "text", nullable: true, default: "No description" })
  description?: string;

  @Column({ type: "boolean", default: false })
  isDeleted!: boolean;
}
