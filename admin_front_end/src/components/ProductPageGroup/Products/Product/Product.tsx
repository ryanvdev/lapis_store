import React,{} from 'react';
import { Link } from 'react-router-dom';

import LAPIS_STATICS from '../../../../core/LAPIS_STATICS';
import IProduct from '../../../../core/types/IProduct';

import './Product.scss';

export interface IProductProps {
    product:IProduct
}

function Product (props: IProductProps) {

    // get first image in images
    const productImage:string = props.product.images.length > 0 ? props.product.images[0] : LAPIS_STATICS.DEFAULT_PRODUCT_IMAGE;
    const productAddress: string = `${LAPIS_STATICS.PRODUCT_PATH}/${props.product.slug}`;

    return (
        <div className='product'>
            <div
                className='img'
                style={{
                    backgroundImage: `url("${productImage}")`
                }}
            ></div>
            <div className='title'>
                <div>{props.product.title}</div>
                <div>
                    <strong>ID: </strong>
                    {props.product._id}
                </div>
            </div>
            <div className='tool'>
                <Link className='edit' to={`/${LAPIS_STATICS.EDIT_PRODUCT_PATH}/${props.product._id}`}>
                    edit
                </Link>
                <a href={productAddress} target='_bland'>
                    visibility
                </a>
            </div>
        </div>
    );
}

export default Product;
// export default React.memo(ProductItem);