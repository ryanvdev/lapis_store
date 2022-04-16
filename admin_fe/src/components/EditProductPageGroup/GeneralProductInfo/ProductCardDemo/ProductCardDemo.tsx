import * as React from 'react';

import './ProductCardDemo.scss';

import ProductCard from  '../../../../share/components/ProductCard';

export interface IProductCardDemoProps {}

export default function ProductCardDemo(props: IProductCardDemoProps) {
    return <div className='product-card-demo'>
        <ProductCard/>
    </div>;
}
