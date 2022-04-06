import * as React from 'react';
import { useParams } from 'react-router-dom';

import './EditProductPage.scss';

export interface IEditProductPageProps {
}

export default function EditProductPage (props: IEditProductPageProps) {
    const {id} = useParams();

    return (
        <div className='page edit-product-page'>
            {id}
        </div>
    );
}
