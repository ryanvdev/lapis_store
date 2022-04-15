import ICategory from '../core/types/ICategory';
import { IStoreState } from './storeState';

export function handlerSetCategories(
    prevState: IStoreState,
    payload: ICategory[],
): IStoreState {
    return {
        ...prevState,
        categories: [...payload],
    };
}
