import { validates } from '@server/utils/validation'
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { z } from 'zod'
import { Ad } from '.'

@Entity()
export class Image {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text')
  url: string

  @ManyToOne(() => Ad, (ad) => ad.images, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  ad: Ad
}

export type ImageBare = Omit<Image, 'ad'>

export const imageSchema = validates<ImageBare>().with({
  id: z.number().int().positive(),
  url: z.string().url(),
})

export const imageUpsertSchema = imageSchema.partial({ id: true })
