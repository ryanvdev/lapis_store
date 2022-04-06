import * as React from 'react';
import Header from './Header';
import LapisContent from './LapisContent';

import './MainContent.scss';

export interface IMainContentProps {
}

export default function MainContent (props: IMainContentProps) {
    return (
        <div className='main-content'>
            <Header/>
            <LapisContent/>
        </div>
    );
}
