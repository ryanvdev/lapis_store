import * as React from 'react';
import { editProductContext } from '../../../../../contexts/EditProductProvider';
import LapisInput, { ILapisInputRef } from '../../../../LapisUi/LapisInput';
import {EProductValidateIconColor, EProductValidateIcon} from '../EProductValidate';

export interface IInputTitleProps {
    productId?:string,
    value?: string
}

function InputTitle (props: IInputTitleProps) {
    const {value} = props;

    const {productFormData, setProductFormData} = React.useContext(editProductContext);

    // states
    const [iconState, setIconState] = React.useState<EProductValidateIcon|undefined>(undefined);
    const [iconColorState, setIconColorState] = React.useState<EProductValidateIconColor|undefined>(undefined);
    const [showIconState, setShowIconState] = React.useState<boolean>(false);
    const [messageState, setMessageState] = React.useState<string|undefined>('');

    // ref
    const inputRef = React.useRef<ILapisInputRef>(null);

    const updateFormData = React.useCallback((value:string|undefined)=>{
        setProductFormData({
            ...productFormData,
            title: value
        });
    }, [setProductFormData, productFormData]);

    const setInputStateIsDefault = React.useCallback(()=>{
        setMessageState('');
        setIconState(EProductValidateIcon.validate);
        setIconColorState(EProductValidateIconColor.validate);
        setShowIconState(false);
        //
        updateFormData(undefined);
    }, [updateFormData]);

    const setInputStateIsValidate = React.useCallback(()=>{
        setMessageState('');
        setIconState(EProductValidateIcon.validate);
        setIconColorState(EProductValidateIconColor.validate);
        setShowIconState(true);
    }, [])

    const setInputStateIsWarning = ()=>{
        setIconState(EProductValidateIcon.warning);
        setIconColorState(EProductValidateIconColor.warning);
        setShowIconState(true);
    }

    /**
     * @param e input value
     */
    const handlerEnterAndBlur = React.useCallback(async (e:string)=>{
        if(e === value){
            setInputStateIsDefault();
            return;
        }

        updateFormData(e);

        if(e === ''){
            setMessageState('Tên sản phẩm không nên để trống');
            setInputStateIsWarning();
            return;
        }
        
        setInputStateIsValidate();
    }, [
        value,
        setInputStateIsDefault,
        setInputStateIsValidate,
        updateFormData
    ]);

    React.useEffect(()=>{
        if(!value || value.length === 0){
            setMessageState('Slug không được để trống !');
            setIconState(EProductValidateIcon.noValidate);
            setIconColorState(EProductValidateIconColor.noValidate);
            setShowIconState(true);
            return;
        }
        setMessageState('');
        setIconState(EProductValidateIcon.validate);
        setIconColorState(EProductValidateIconColor.validate);
        setShowIconState(false);
    }, [value]);

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

export default React.memo(InputTitle);