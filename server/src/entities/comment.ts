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
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  user: User

  @ManyToOne(() => Ad, (ad) => ad.comments, {
    onDelete: 'CASCADE',
  })
  ad: Ad
}
