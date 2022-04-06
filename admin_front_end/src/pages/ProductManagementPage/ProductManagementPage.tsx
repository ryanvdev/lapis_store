import React,{useCallback, useEffect, useState} from 'react';
import axios from 'axios';

import IProduct from '../../core/types/IProduct';
import { TLapisReactElements } from '../../core/LapisType';
import LAPIS_STATICS from '../../core/LAPIS_STATICS';
import RequestFailed from '../../components/RequestFailed';
import Products from '../../components/ProductPageGroup/Products';
import Categories from '../../components/Categories';

import './ProductManagementPage.scss';


export interface IProductManagementPageProps {

}

function ProductManagementPage (props: IProductManagementPageProps) {
    const [productsElmnt, setProductsElmnt] = useState<TLapisReactElements>(undefined);

    const listProducts = useCallback(async () =>{
        try{
            const res = await axios.get(
                `${LAPIS_STATICS.API_HOST}/admin/product/list`
            );

            if(res.status !== 200){
                setProductsElmnt(<RequestFailed/>);
                return;
            }

            const products:IProduct[] = res.data;

            // check if product is array object
            if(!Array.isArray(products)){
                setProductsElmnt(<RequestFailed/>);
                return;
            }

            setProductsElmnt(<Products products={products}/>)
        }
        catch{
            setProductsElmnt(<RequestFailed/>);
        }
    }, []);

    useEffect(() => {
        listProducts();
    },[listProducts]);
    

    return (
        <div className='page product-management-page'>
            <section>
                <Categories/>
            </section>
            <section>
                {productsElmnt}
            </section>
        </div>
    );
}

export default ProductManagementPage;
