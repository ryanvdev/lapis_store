import * as React from 'react';

import './EditingArea.scss';

export interface IEditingAreaProps {
    title?: string
}

export default function EditingArea (props: React.PropsWithChildren<IEditingAreaProps>) {
    return (
        <div className='editing-area'>
            <h3>
                {props.title}
            </h3>
            <div>
                {props.children}
            </div>
        </div>
    );
}
