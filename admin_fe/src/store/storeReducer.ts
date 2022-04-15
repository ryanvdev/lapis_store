import { handlerSetCategories } from './storeHandlerActions';
import { IStoreState } from './storeState';
import EStoreActions from './types/EStoreActions';
import IStoreProps from './types/IStoreProps';

export default function storeReducer(
    state: IStoreState,
    props: IStoreProps,
): IStoreState {
    switch (props.action) {
        case EStoreActions.setCategories: {
            return handlerSetCategories(state, props.payload);
        }
        default: {
            throw new Error(
                `Invalid action: action passed to storeReducer does not exists. [action="${props.action}"]`,
            );
            // return state;
        }
    }
}
