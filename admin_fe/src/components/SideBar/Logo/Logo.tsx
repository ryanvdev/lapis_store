import * as React from 'react';

import './Logo.scss';

export interface ILogoProps {}

export default function Logo(props: ILogoProps) {
    return (
        <div className='logo'>
            <span>Lapis</span>
            <span>Store</span>
        </div>
    );
}
