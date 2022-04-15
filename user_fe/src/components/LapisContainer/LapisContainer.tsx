import React, {} from 'react';

export interface ILapisContainerProps {
}

export default function LapisContainer (props: React.PropsWithChildren<ILapisContainerProps>) {
  return (
    <div className='lapis-container'>
        {props.children}
    </div>
  );
}
