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
