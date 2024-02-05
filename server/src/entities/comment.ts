import { validates } from '@server/utils/validation'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { z } from 'zod'
import { User, Ad } from '.'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text')
  text: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column('integer')
  userId: number

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  user: User

  @Column('integer')
  adId: number

  @ManyToOne(() => Ad, (ad) => ad.comments, {
    onDelete: 'CASCADE',
  })
  ad: Ad
}

export type CommentBare = Omit<Comment, 'user' | 'ad'>

export const commentSchema = validates<CommentBare>().with({
  id: z.number().int().positive(),
  text: z.string().min(1).max(300),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.number().int().positive(),
  adId: z.number().int().positive(),
})

export const commentInsertSchema = commentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const commentUpdateSchema = commentSchema.omit({
  createdAt: true,
  updatedAt: true,
})
