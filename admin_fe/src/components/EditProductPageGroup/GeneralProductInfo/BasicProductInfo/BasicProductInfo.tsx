import * as React from 'react';
import { editProductContext } from '../../../../contexts/EditProductProvider';

import IProduct from '../../../../core/types/IProduct';
import LapisInput from '../../../LapisUi/LapisInput';

import './BasicProductInfo.scss';
import InputCategory from './Inputs/InputCategory';
import InputSlug from './Inputs/InputSlug';
import InputTitle from './Inputs/InputTitle';

export interface IBasicProductInfoProps {
    data?: IProduct;
}

export interface IBasicProductInfoRef{
    getData: () => IProduct
}

function BasicProductInfo(props: IBasicProductInfoProps, ref: React.RefObject<IBasicProductInfoRef> & any) {

    const {product} =  React.useContext(editProductContext);
    console.log(product);

    const convertToStringDate = (v?: string) => {
        if (!v) return undefined;
        return v.slice(0, 16);
    };

    return (
        <div className='basic-product-info'>
            <InputTitle
                productId={product?._id}
                value={product?.title}
            />

            <InputSlug
                productId={product?._id}
                value={product?.slug}
            />

            <InputCategory
                value={product?.categoryId}
            />

            <LapisInput
                title='Số lượng'
                value={String(props.data?.quantity || 0)}
                validator={/^[a-z0-9-]*$/}
                icon='verified'
                iconColor='rgb(255,0,255)'
                message='Ref forwarding is an opt-in feature that lets some components take '
                showIcon={true}
            />

            <LapisInput
                title='Giá sản phẩm'
                type='number'
                value={String(props.data?.price)}
                min={0}
                icon='verified'
                iconColor='rgb(255,0,255)'
                message='Ref forwarding is an opt-in feature that lets some components take '
                showIcon={true}
            />
            
            <LapisInput
                title='Discount'
                className='discount'
                type={'number'}
                value={String(props.data?.discount)}
                icon='verified'
                iconColor='rgb(255,0,255)'
                message='Ref forwarding is an opt-in feature that lets some components take '
                showIcon={true}
            />

            <LapisInput
                title='Giá hiện tại'
                className='current-price'
                type={'number'}
                value={'0'}
                icon='verified'
                iconColor='rgb(255,0,255)'
                message='Ref forwarding is an opt-in feature that lets some components take '
                showIcon={true}
            />

            <LapisInput
                title='Discount start at'
                className='discount-start-at'
                value={convertToStringDate(props.data?.discountStartAt)}
                type='datetime-local'
                icon='verified'
                iconColor='rgb(255,0,255)'
                message='Ref forwarding is an opt-in feature that lets some components take '
                showIcon={true}
            />

            <LapisInput
                title='Discount end at'
                className='discount-end-at'
                value={convertToStringDate(props.data?.discountStartAt)}
                type='datetime-local'
                icon='verified'
                iconColor='rgb(255,0,255)'
                message='Ref forwarding is an opt-in feature that lets some components take '
                showIcon={true}
            />

            <LapisInput
                title='Tóm lược'
                type='text'
                value={String(props.data?.summary || '')}
                min={0}
                icon='verified'
                iconColor='rgb(255,0,255)'
                message='Ref forwarding is an opt-in feature that lets some components take '
                showIcon={true}
            />
        </div>
    );
}

export default React.forwardRef<IBasicProductInfoRef, IBasicProductInfoProps>(BasicProductInfo);