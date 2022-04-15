import * as React from 'react';
import { TLapisReactElements } from '../../../core/LapisType';
import IProduct from '../../../core/types/IProduct';
import Product from './Product';

import './Products.scss';

export interface IProductsProps {
    products: IProduct[];
}

function Products(props: IProductsProps) {
    const renderProducts = React.useCallback((): TLapisReactElements => {
        return props.products.map((elmnt, index) => {
            return <Product key={index} product={elmnt} />;
        });
    }, [props.products]);

    return (
        <div className='products'>
            <div className='head'>
                <div className='title'>Tên sản phẩm</div>
                <div className='quantity'>Số lượng</div>
            </div>
            <div className='list'>{renderProducts()}</div>
        </div>
    );
}

export default React.memo(Products);
