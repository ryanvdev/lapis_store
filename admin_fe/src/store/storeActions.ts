import EStoreActions from './types/EStoreActions';
import IStoreProps from './types/IStoreProps';

import ICategory from '../core/types/ICategory';

export function setCategories(categories: ICategory[]): IStoreProps {
    return {
        action: EStoreActions.setCategories,
        payload: categories,
    };
}
