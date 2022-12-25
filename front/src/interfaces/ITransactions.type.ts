
import ICategory from './ICategory.type'
import IUser from './IUser.type';
export default interface ITransactions {
    category: ICategory;
    date: Date;
    description: string;
    id: number;
    type: string;
    user: IUser
    value: string;

}
