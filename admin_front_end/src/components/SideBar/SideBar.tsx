import * as React from 'react';

import Logo from './Logo';
import Navigation from './Navigation';

import './SideBar.scss';

export interface ISideBarProps {

}

export default function SideBar (props: ISideBarProps) {
    return (
        <div className='side-bar'>
            <div className='wrap'>
                <Logo/>
                <Navigation/>
            </div>
        </div>
    );
}
