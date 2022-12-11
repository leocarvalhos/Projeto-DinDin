import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Transaction } from './Transaction'

@Entity('categorys')
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    description: string

    @OneToMany(() => Transaction, (transaction) => transaction.category_id)
    category_id: Transaction[]




}
