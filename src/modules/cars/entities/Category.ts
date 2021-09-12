import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("categories")
class Category {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  // meu modelo têm a responsabilidade de gerar o uuid;
  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      console.log(this.id);
    }
  }
}

export { Category };
