
import * as React from 'react';
import { useParams } from 'react-router-dom';
import GeneralProductInfo from '../../components/EditProductPageGroup/GeneralProductInfo';
import EditProductProvider from '../../contexts/EditProductProvider';

import './EditProductPage.scss';
export interface IEditProductPageProps {}

export default function EditProductPage(props: IEditProductPageProps) {
    const { id } = useParams();
    return (
        <div className='page edit-product-page'>
            <EditProductProvider id={id}>
                <h2 className='title'>Chỉnh sửa sản phẩm</h2>
                <GeneralProductInfo/>
            </EditProductProvider>
        </div>
    );
}
