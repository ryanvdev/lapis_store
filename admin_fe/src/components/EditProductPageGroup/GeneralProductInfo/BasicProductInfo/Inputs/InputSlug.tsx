import * as React from 'react';
import { editProductContext } from '../../../../../contexts/EditProductProvider';
import checkSlug from '../../../../../functions/ProductGroup/checkSlug';
import LapisInput, { ILapisInputRef } from '../../../../LapisUi/LapisInput';
import {EProductValidateIconColor, EProductValidateIcon} from '../EProductValidate';

export interface IInputSlugProps {
    productId?:string,
    value?: string
}

function InputSlug (props: IInputSlugProps) {
    const {productId, value} = props;

    const {productFormData, setProductFormData} = React.useContext(editProductContext);

    // states
    const [iconState, setIconState] = React.useState<EProductValidateIcon|undefined>(undefined);
    const [iconColorState, setIconColorState] = React.useState<EProductValidateIconColor|undefined>(undefined);
    const [showIconState, setShowIconState] = React.useState<boolean>(false);
    const [messageState, setMessageState] = React.useState<string|undefined>('');

    const inputSlugRef = React.useRef<ILapisInputRef>(null);

    /**
     * @param e input value
     */
    const handlerSlugEnterAndBlur = React.useCallback(async (e:string)=>{
        setProductFormData({
            ...productFormData,
            slug: e
        });

        if(e === value){
            setMessageState('');
            setIconState(EProductValidateIcon.validate);
            setIconColorState(EProductValidateIconColor.validate);
            setShowIconState(false);
            return;
        }

        if(e === ''){
            setMessageState('Slug không được để trống !');
            setIconState(EProductValidateIcon.noValidate);
            setIconColorState(EProductValidateIconColor.noValidate);
            setShowIconState(true);
            return;
        }

        const isSlugExisted = await checkSlug(e, productId);

        if(isSlugExisted){
            setMessageState('Slug này đã tồn tại. Vui lòng nhập slug khác !');
            setIconState(EProductValidateIcon.noValidate);
            setIconColorState(EProductValidateIconColor.noValidate);
            setShowIconState(true);
            return;
        }

        setMessageState('');
        setIconState(EProductValidateIcon.validate);
        setIconColorState(EProductValidateIconColor.validate);
        setShowIconState(true);
    }, [productId, value, productFormData, setProductFormData]);

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
            title='Slug'
            ref={inputSlugRef}
            value={value}
            validator={/^[a-z0-9-]*$/}
            icon={iconState}
            iconColor={iconColorState}
            message={messageState}
            showIcon={showIconState}
            onBlur={handlerSlugEnterAndBlur}
            onEnter={handlerSlugEnterAndBlur}
        />
    );
}

export default React.memo(InputSlug);