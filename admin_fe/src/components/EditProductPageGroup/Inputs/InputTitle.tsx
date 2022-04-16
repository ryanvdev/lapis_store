import * as React from 'react';
import { editProductContext } from '../../../contexts/EditProductProvider';
import { EValidateIcon, EValidateIconColor } from '../../../core/types/EValidate';
import LapisInput, { ILapisInputRef } from '../../LapisUi/LapisInput';
// import {EValidateIconColor, EValidateIcon} from ;

export interface IInputTitleProps {
    productId?:string,
    value?: string
}

function InputTitle (props: IInputTitleProps) {
    const {product, productFormData, setProductFormData} = React.useContext(editProductContext);

    // states
    const [iconState, setIconState] = React.useState<EValidateIcon|undefined>(undefined);
    const [iconColorState, setIconColorState] = React.useState<EValidateIconColor|undefined>(undefined);
    const [showIconState, setShowIconState] = React.useState<boolean>(false);
    const [messageState, setMessageState] = React.useState<string|undefined>('');

    // ref
    const inputRef = React.useRef<ILapisInputRef>(null);

    // 
    const value:string|undefined = productFormData?.title;
    const rootValue:string|undefined = product?.title;


    // functions
    const updateFormData = React.useCallback((value:string|undefined)=>{
        setProductFormData({
            ...productFormData,
            title: value
        });
    }, [setProductFormData, productFormData]);

    const setInputStateIsDefault = React.useCallback(()=>{
        setMessageState('');
        setShowIconState(false);
        setIconState(EValidateIcon.validate);
        setIconColorState(EValidateIconColor.validate);
        //
    }, []);

    const setInputStateIsValidate = React.useCallback(()=>{
        setMessageState('');
        setIconState(EValidateIcon.validate);
        setIconColorState(EValidateIconColor.validate);
        setShowIconState(true);
    }, [])

    const setInputStateIsWarning = React.useCallback(()=>{
        setMessageState('Tên sản phẩm không nên để trống');
        setIconState(EValidateIcon.warning);
        setIconColorState(EValidateIconColor.warning);
        setShowIconState(true);
    }, []);

    /**
     * @param e input value
     */
    const handlerEnterAndBlur = React.useCallback(async (e:string)=>{
        updateFormData(e);
    }, [
        updateFormData,
    ]);

    // check if value is empty
    React.useEffect(()=>{
        if(!value || value.length === 0){
            setInputStateIsWarning();
            return;
        }

        if(value === rootValue){
            setInputStateIsDefault()
            return;
        }

        setInputStateIsValidate();
    }, [
        value,
        rootValue,
        setInputStateIsValidate,
        setInputStateIsDefault,
        setInputStateIsWarning]
    );

    return (
        <LapisInput
            title='Tên sản phẩm'
            ref={inputRef}
            value={value}
            icon={iconState}
            iconColor={iconColorState}
            message={messageState}
            showIcon={showIconState}
            onBlur={handlerEnterAndBlur}
            onEnter={handlerEnterAndBlur}
        />
    );
}

export default InputTitle;