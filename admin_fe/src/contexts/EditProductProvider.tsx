import axios from 'axios';
import * as React from 'react';
import LAPIS_STATICS from '../core/LAPIS_STATICS';
import IProduct from '../core/types/IProduct';

export interface IProductFormData {
    categoryId?: string;
    title?: string;
    slug?: string;
    summary?: string;
    price?: number;
    discount?: number;
    discountStartAt?: string;
    discountEndAt?: string;
    quantity?: number;
    description?: string;
    images?: string[];
}

export interface IEditProductProviderProps {
    id?: string
}


export const editProductContext = React.createContext<{
    product: IProduct|undefined
    productFormData:IProductFormData,
    setProductFormData: React.Dispatch<React.SetStateAction<IProductFormData>>
}>({} as any);

export default function EditProductProvider (props: React.PropsWithChildren<IEditProductProviderProps>) {
    const {id} = props;
    const [productFormData, setProductFormData] = React.useState<IProductFormData>({});
    const [product, setProduct] = React.useState<IProduct|undefined>(undefined);

    const getProduct = React.useCallback(async (productId?: string) => {
        if (!productId) return ;

        const res = await axios.get(`${LAPIS_STATICS.API_HOST}/admin/product/find/${productId}`);
        if (res.status !== 200) {
            // console.log('request failed !');
            return ;
        }

        const lapisProduct:IProduct = {...res.data}
        const lapisProductFormData:IProductFormData = {...res.data, _id:undefined} as IProduct

        setProduct(lapisProduct);
        setProductFormData(lapisProductFormData);
    },[]);

    React.useEffect(()=>{
        getProduct(id);
    }, [id, getProduct]);

    return (
        <editProductContext.Provider
            value={{
                product,
                productFormData,
                setProductFormData
            }}
        >
            {props.children}
        </editProductContext.Provider>
    );
}
