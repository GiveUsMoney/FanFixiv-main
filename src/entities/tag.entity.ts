import { ExtraTagTypes, Tag, TagTypes } from '@src/interfaces/tag.interface';
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ContentEntity } from './content.entity';

@Entity({ name: 'tb_tag' })
export class TagEntity extends BaseEntity implements Tag {
  @Column({
    type: 'enum',
    enum: TagTypes,
    default: TagTypes.ATTRIBUTE,
  })
  type: TagTypes;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  status: boolean;

  @Column({ default: false })
  isAdult: boolean;

  @Column({
    type: 'enum',
    enum: ExtraTagTypes,
    nullable: true,
    default: null,
  })
  extraTag: ExtraTagTypes;

  @OneToMany(() => ContentEntity, (content) => content.artist)
  work: ContentEntity[];
}

@Entity({ name: 'tb_type_name' })
export class TagNameEntity extends BaseEntity {
  @Column()
  typeSeq: string;

  @Column()
  typeName: string;
}
