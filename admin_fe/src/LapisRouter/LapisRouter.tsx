import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import LAPIS_STATICS from '../core/LAPIS_STATICS';
import EditProductPage from '../pages/EditProductPage';
import ProductManagementPage from '../pages/ProductManagementPage';

export interface ILapisRouterProps {}

export default function LapisRouter(props: ILapisRouterProps) {
    return (
        <>
            <Routes>
                <Route path='/product-management' element={<ProductManagementPage />} />
                <Route
                    path={`/${LAPIS_STATICS.EDIT_PRODUCT_PATH}/:id`}
                    element={<EditProductPage />}
                />
                <Route path='/' element={<ProductManagementPage />} />
            </Routes>
        </>
    );
}
