import * as React from 'react';
import { Link } from 'react-router-dom';

import './Navigation.scss';

export interface INavigationProps {
}

export default function Navigation (props: INavigationProps) {
    return (
        <div className='navigation'>
            <ul>
                <li>
                    <Link to={'/product-management'}>
                        <strong>view_in_ar</strong>
                        <span>Quản lý sản phẩm</span>
                    </Link>
                </li>
                <li>
                    <Link to={'/category-management'}>
                        <strong>category</strong>
                        <span>Quản lý danh mục</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
