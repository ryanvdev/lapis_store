import * as React from 'react';
import storeReducer from './storeReducer';
import { initStoreState } from './storeState';

import storeContext from './storeContext';

export interface IStoreProviderProps {}

export default function StoreProvider(
    props: React.PropsWithChildren<IStoreProviderProps>,
) {
    const [storeStates, storeDispatch] = React.useReducer(storeReducer, initStoreState);

    return (
        <storeContext.Provider
            value={{
                storeStates: storeStates,
                storeDispatch: storeDispatch,
            }}
        >
            {props.children}
        </storeContext.Provider>
    );
}
