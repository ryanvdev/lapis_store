import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import GeneralProductInfo from '../../components/EditProductPageGroup/GeneralProductInfo';
import EditProductProvider from '../../contexts/EditProductProvider';
import LAPIS_STATICS from '../../core/LAPIS_STATICS';
import IProduct from '../../core/types/IProduct';

import './EditProductPage.scss';

export interface IEditProductPageProps {}

export default function EditProductPage(props: IEditProductPageProps) {
    const { id } = useParams();

    const [product, setProduct] = React.useState<IProduct | undefined>(undefined);

    const getProduct = React.useCallback(async () => {
        if (!id) return undefined;

        const res = await axios.get(`${LAPIS_STATICS.API_HOST}/admin/product/find/${id}`);
        if (res.status !== 200) {
            console.log('request failed !');
            return undefined;
        }

        setProduct(res.data);
    }, [id]);

    React.useEffect(() => {
        getProduct();
    }, [getProduct]);

    return (
        <div className='page edit-product-page'>
            <EditProductProvider id={id}>
                <h2 className='title'>Chỉnh sửa sản phẩm</h2>
                <GeneralProductInfo data={product} />
            </EditProductProvider>
        </div>
    );
}