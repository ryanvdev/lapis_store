import { ILapisSelectionOption } from '../../components/LapisUi/LapisSelection';
import ICategory from '../types/ICategory';
import makeCategoryPath from './makeCategoryPath';

export default function makeCategoriesOptions(categories: ICategory[]): ILapisSelectionOption[] {
    return categories.map((category) => {
        return {
            label: makeCategoryPath(categories, category),
            value: category._id,
        };
    });
}
