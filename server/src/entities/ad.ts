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
import { imageUpsertSchema } from './image'
import { categorySchema } from './category'
import { User, Image, Comment, Category } from '.'

@Entity()
export class Ad {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text')
  title: string

  @Column('text')
  text: string

  @Column('numeric', { nullable: true, precision: 10, scale: 2 })
  price: number | null

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column('integer')
  userId: number

  @ManyToOne(() => User, (user) => user.ads, {
    onDelete: 'CASCADE',
  })
  user: User

  @OneToMany(() => Image, (image) => image.ad, {
    cascade: true,
  })
  images: Image[]

  @OneToMany(() => Comment, (comment) => comment.ad)
  comments: Comment[]

  @ManyToMany(() => Category, (category) => category.ads, { onDelete: 'CASCADE' })
  @JoinTable()
  categories: Category[]
}

export type AdBare = Omit<Ad, 'user' | 'comments' | 'images' | 'categories'>

export const adSchema = validates<AdBare>().with({
  id: z.number().int().positive(),
  title: z.string().min(1).max(64),
  text: z.string().min(1).max(999),
  price: z.coerce.number().nonnegative('Price must be greater than or equal to 0').nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.number().int().positive(),
})

export const adUpdateSchema = adSchema
  .omit({ userId: true, createdAt: true, updatedAt: true })
  .extend({
    // HTML number input return empty string on empty input. We convert it to `null`
    price: z.preprocess((arg) => (arg === '' ? null : arg), adSchema.shape.price),
    images: imageUpsertSchema.array(),
    categories: categorySchema.array(),
  })

export type AdUpsert = z.infer<typeof adUpdateSchema>

export const adInsertSchema = adUpdateSchema.omit({ id: true })

export const adSearchSchema = adSchema
  .pick({ userId: true })
  .extend({
    categoryId: z.number().int().positive(),
    pagination: z.object({ page: z.number().int().positive(), take: z.number().int().positive() }),
  })
  .partial()

export type AdSearch = z.infer<typeof adSearchSchema>
