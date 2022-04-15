import React from 'react';
import MainContent from '../components/MainContent';
import SideBar from '../components/SideBar';
import './App.scss';

function App() {
    return (
        <div className='app'>
            <SideBar />
            <MainContent />
        </div>
    );
}

export default App;
