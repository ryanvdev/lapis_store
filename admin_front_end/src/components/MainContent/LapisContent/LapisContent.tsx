import * as React from 'react';
import LapisRouter from '../../../LapisRouter';

import './LapisContent.scss';

export interface ILapisContentProps {
}

export default function LapisContent (props: ILapisContentProps) {
    return (
        <div className='lapis-content'>
            <LapisRouter/>
        </div>
    );
}
