import React, { createContext } from 'react';
import { IStoreState } from './storeState';
import IStoreProps from './types/IStoreProps';

interface IStoreContext {
    storeStates: IStoreState;
    storeDispatch: React.Dispatch<IStoreProps>;
}

const storeContext = createContext<IStoreContext>({} as any);

export default storeContext;
