import ICategory from '../core/types/ICategory';

export interface IStoreState {
    categories: ICategory[];
}

export const initStoreState: IStoreState = {
    categories: [],
};
