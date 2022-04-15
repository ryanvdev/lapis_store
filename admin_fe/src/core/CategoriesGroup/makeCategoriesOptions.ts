import { IOption } from '../../components/LapisUi/LapisSelection';
import ICategory from '../types/ICategory';
import makeCategoryPath from './makeCategoryPath';

export default function makeCategoriesOptions(categories: ICategory[]): IOption[] {
    return categories.map((category) => {
        return {
            label: makeCategoryPath(categories, category),
            value: category._id,
        };
    });
}
