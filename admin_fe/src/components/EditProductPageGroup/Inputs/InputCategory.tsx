import * as React from 'react';
import { editProductContext } from '../../../contexts/EditProductProvider';
import getCategories from '../../../core/CategoriesGroup/getCategories';
import makeCategoriesOptions from '../../../core/CategoriesGroup/makeCategoriesOptions';
import LapisSelection, { ILapisSelectionOption, ILapisSelectionEventData } from '../../LapisUi/LapisSelection';
import {EValidateIconColor, EValidateIcon} from '../../../core/types/EValidate';

export interface IInputCategoryProps {
    value?: string
}

function InputCategory (props: IInputCategoryProps) {
    // const {value} = props;

    const {product, productFormData, setProductFormData} = React.useContext(editProductContext);

    // states
    const [options, setOptions] = React.useState<ILapisSelectionOption[]>([]);

    const [iconState, setIconState] = React.useState<EValidateIcon|undefined>(undefined);
    const [iconColorState, setIconColorState] = React.useState<EValidateIconColor|undefined>(undefined);
    const [showIconState, setShowIconState] = React.useState<boolean>(false);
    const [messageState, setMessageState] = React.useState<string|undefined>('');

    const value:string|undefined = productFormData.categoryId;
    const rootValue:string|undefined = product?.categoryId;
    // console.log(value);
    //

    const loadOptions = async () => {
        const categories = await getCategories();
        if (!categories) {
            return;
        }
        const options = makeCategoriesOptions(categories);
        setOptions(options);
    };


    const updateFormData = React.useCallback((v:string|undefined)=>{
        setProductFormData({
            ...productFormData,
            categoryId: v
        });
    }, [setProductFormData, productFormData]);

    const setInputStateIsDefault = React.useCallback(()=>{
        setMessageState('');
        setIconState(EValidateIcon.validate);
        setIconColorState(EValidateIconColor.validate);
        setShowIconState(false);
        //
    }, []);

    const setInputStateIsValidate = React.useCallback(()=>{
        setMessageState('');
        setIconState(EValidateIcon.validate);
        setIconColorState(EValidateIconColor.validate);
        setShowIconState(true);
    }, []);

    const setInputStateIsWarning = React.useCallback(()=>{
        setMessageState('Danh mục sản phẩm không nên để trống');
        setIconState(EValidateIcon.warning);
        setIconColorState(EValidateIconColor.warning);
        setShowIconState(true);
    }, []);

    /**
     * @param e input value
     */
    const handlerSelected = React.useCallback((e:ILapisSelectionEventData)=>{
        // if not select
        if(e.index < 0 || !e.option){
            updateFormData(undefined);
            return;
        }

        // if select
        const newCategoryId = e.option.value;
        updateFormData(newCategoryId);
    }, [updateFormData]);

    // Load option
    React.useEffect(()=>{
        loadOptions();
    }, []);

    // update icon and message status
    React.useEffect(()=>{
        if(!value ){
            setInputStateIsWarning();
            return;
        }
        if(value === rootValue){
            setInputStateIsDefault();
            return;
        }
        
        setInputStateIsValidate();
    }, [value, rootValue, setInputStateIsWarning, setInputStateIsDefault, setInputStateIsValidate]);

    return (
        <LapisSelection
            title='Danh mục'
            icon={iconState}
            message={messageState}
            showIcon={showIconState}
            iconColor={iconColorState}
            maxLength={44}
            options={options}
            selectedValue={value}
            onSelected={handlerSelected}
        />
    );
}

export default InputCategory;