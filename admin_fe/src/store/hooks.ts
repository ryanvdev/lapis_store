import { useContext } from 'react';
import storeContext from './storeContext';

export function useStore() {
    const { storeStates, storeDispatch } = useContext(storeContext);
    return { storeStates, storeDispatch };
}
