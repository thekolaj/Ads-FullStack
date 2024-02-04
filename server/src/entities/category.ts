import { validates } from '@server/utils/validation'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  ManyToMany,
} from 'typeorm'
import { z } from 'zod'
import { Ad } from '.'

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Unique(['title'])
  @Column('text')
  title: string

  @ManyToMany(() => Ad)
  ads: Ad[]
}

export type CategoryBare = Omit<Category, 'ads'>

export const categorySchema = validates<CategoryBare>().with({
  id: z.number().int().positive(),
  title: z.string().min(1).max(64),
})

export const categoryUpsertSchema = categorySchema.extend({
  id: categorySchema.shape.id.optional(),
})
