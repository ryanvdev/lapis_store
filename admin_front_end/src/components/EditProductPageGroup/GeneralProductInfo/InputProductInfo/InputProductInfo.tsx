import * as React from 'react';
import IProduct from '../../../../core/types/IProduct';
import LapisInput,{ILapisInputRef} from '../../../LapisUi/LapisInput';
import LapisSelection from '../../../LapisUi/LapisSelection';

import './InputProductInfo.scss';

export interface IInputProductInfoProps {
    data?:IProduct,
}

export default function InputProductInfo (props: IInputProductInfoProps) {
    const lapisInputRef = React.useRef<ILapisInputRef>(null);
    React.useEffect(()=>{
        if(!lapisInputRef.current) return;
    });

    return (
        <div className='input-product-info'>
            <div>

            </div>
            <LapisInput
                title="Tên sản phẩm"
                value={props.data?.title}
                
                ref={lapisInputRef}
                icon='verified'
                iconColor='rgb(255,0,255)'
                message='Ref forwarding is an opt-in feature that lets some components take '
                showIcon={true}
            />
            <LapisInput
                title="Slug"
                value={props.data?.slug}

                validator={/^[a-z0-9-]*$/}
                ref={lapisInputRef}
                icon='verified'
                iconColor='rgb(255,0,255)'
                message='Ref forwarding is an opt-in feature that lets some components take '
                showIcon={true}
            />
            <LapisInput
                title="Giá sản phẩm"
                value={String(props.data?.price)}

                type='number'
                min={0}
                ref={lapisInputRef}
                icon='verified'
                iconColor='rgb(255,0,255)'
                message='Ref forwarding is an opt-in feature that lets some components take '
                showIcon={true}
            />
            <LapisInput
                ref={lapisInputRef}
                type={'number'}
                icon='verified'
                iconColor='rgb(255,0,255)'
                message='Ref forwarding is an opt-in feature that lets some components take '
                showIcon={true}
                title="Tóm lược"
            />
            
            <LapisSelection
                options={[
                    {
                        label: 'Nguyễn Quốc Tuấn',
                        value: '1 cái gì đó',
                    },
                    {
                        label: 'Nguyễn Vũ Phi Thường',
                        value: '2 cái gì đó',
                    },
                    {
                        label: 'abcd',
                        value: '2 cái gì đó',
                    },
                    {
                        label: 'ab',
                        value: '2 cái gì đó',
                    },
                    {
                        label: 'abc',
                        value: '2 cái gì đó',
                    }
                ]}
            />

            <LapisInput
                title="Discount"
                value={String(props.data?.discount)}

                type='datetime-local'
                ref={lapisInputRef}
                icon='verified'
                iconColor='rgb(255,0,255)'
                message='Ref forwarding is an opt-in feature that lets some components take '
                showIcon={true}
            />
            <LapisInput
                ref={lapisInputRef}
                icon='verified'
                iconColor='rgb(255,0,255)'
                message='Ref forwarding is an opt-in feature that lets some components take '
                showIcon={true}
                title="Danh mục"
            />
        </div>
    );
}
