import { validates } from '@server/utils/validation'
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { z } from 'zod'
import { Ad, Comment } from '.'

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Unique(['email'])
  @Column('text')
  email: string

  @Column('text', { select: false })
  password: string

  @Column('text')
  name: string

  @Column('text', { nullable: true })
  phone: string | null

  @Column('text', { nullable: true })
  avatar: string | null

  @Column('boolean', { default: false })
  admin: boolean

  @OneToMany(() => Ad, (ad) => ad.user)
  ads: Ad[]

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]
}

export type UserBare = Omit<User, 'ads' | 'comments'>

export const userSchema = validates<UserBare>().with({
  id: z.number().int().positive(),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(6).max(64),
  name: z.string().trim(),
  phone: z.string().trim().nullable(),
  avatar: z.string().url().nullable(),
  admin: z.boolean(),
})

export const userUpsertSchema = userSchema.extend({
  id: userSchema.shape.id.optional(),
  phone: userSchema.shape.phone.default(null),
  avatar: userSchema.shape.avatar.default(null),
  admin: userSchema.shape.admin.default(false),
})

export type AuthUser = Pick<User, 'id'>

export const authUserSchema = validates<AuthUser>().with({
  id: z.number().int().positive(),
})
