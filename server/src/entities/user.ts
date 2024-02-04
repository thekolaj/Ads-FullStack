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
