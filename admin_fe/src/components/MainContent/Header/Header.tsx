import * as React from 'react';
import LapisSearch from '../../LapisUi/LapisSearch/LapisSearch';

import './Header.scss';

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
    return (
        <div className='header'>
            <div>
                <LapisSearch />
            </div>
            <div>
                <div></div>
            </div>
        </div>
    );
}
