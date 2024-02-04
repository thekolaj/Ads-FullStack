import { validates } from '@server/utils/validation'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { z } from 'zod'
import { User, Image, Comment, Category } from '.'

@Entity()
export class Ad {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text')
  title: string

  @Column('text')
  text: string

  @Column('numeric', { nullable: true, precision: 2, scale: 2 })
  price: number | null

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToOne(() => User, (user) => user.ads, {
    onDelete: 'CASCADE',
  })
  user: User

  @OneToMany(() => Image, (image) => image.ad, {
    cascade: ['insert', 'update'],
  })
  images: Image[]

  @OneToMany(() => Comment, (comment) => comment.ad)
  comments: Comment[]

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[]
}
