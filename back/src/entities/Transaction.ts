import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Category } from './Category'
import { User } from './User'

@Entity('transactions')
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "text" })
    description: string

    @Column({ type: "decimal" })
    value: number

    @Column({ type: "timestamp" })
    date: Date

    @Column()
    type: string

    @ManyToOne(() => User, (user) => user.user_id)
    @JoinColumn({ name: 'user_id' })
    user_id: User


    @ManyToOne(() => Category, (category) => category.category_id)
    @JoinColumn({ name: "category_id" })
    category_id: Category

}
