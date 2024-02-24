import { validates } from '@server/utils/validation'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm'
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
  password: z
    .string()
    .min(6, 'Password must bet at least 6 characters')
    .max(64, 'Password must bet at most 64 characters')
    .regex(/[A-Z]/, 'Password must have an Uppercase characters')
    .regex(/[a-z]/, 'Password must have a Lowercase characters')
    .regex(/[0-9]/, 'Password must have a digit'),
  name: z
    .string()
    .trim()
    .min(3, { message: 'Name must bet at least 3 characters' })
    .max(64, { message: 'Name must bet at most 64 characters' }),
  phone: z.string().trim().nullable(),
  admin: z.boolean(),
})

export const userInsertSchema = userSchema.omit({ id: true }).extend({
  phone: userSchema.shape.phone.default(null),
  admin: userSchema.shape.admin.default(false),
})

export const userUpdateSchema = userSchema.omit({ password: true })

export type AuthUser = Pick<User, 'id' | 'admin'>

export const authUserSchema = validates<AuthUser>().with({
  id: userSchema.shape.id,
  admin: userSchema.shape.admin,
})
