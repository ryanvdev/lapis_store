import * as React from 'react';
import { editProductContext } from '../../../../../contexts/EditProductProvider';
import getCategories from '../../../../../core/CategoriesGroup/getCategories';
import makeCategoriesOptions from '../../../../../core/CategoriesGroup/makeCategoriesOptions';
import LapisInput, { ILapisInputRef } from '../../../../LapisUi/LapisInput';
import LapisSelection, { IOption } from '../../../../LapisUi/LapisSelection';
import { ISelectedEventData } from '../../../../LapisUi/LapisSelection/LapisSelection';
import {EProductValidateIconColor, EProductValidateIcon} from '../EProductValidate';

export interface IInputCategoryProps {
    value?: string
}

function InputCategory (props: IInputCategoryProps) {
    const {value} = props;

    const {productFormData, setProductFormData} = React.useContext(editProductContext);

    // states
    const [options, setOptions] = React.useState<IOption[]>([]);

    const [iconState, setIconState] = React.useState<EProductValidateIcon|undefined>(undefined);
    const [iconColorState, setIconColorState] = React.useState<EProductValidateIconColor|undefined>(undefined);
    const [showIconState, setShowIconState] = React.useState<boolean>(false);
    const [messageState, setMessageState] = React.useState<string|undefined>('');

    // ref
    const inputRef = React.useRef<ILapisInputRef>(null);


    const loadOptions = async () => {
        setOptions([{ label: 'loading', value: '' }]);
        const categories = await getCategories();
        if (!categories) {
            return;
        }
        const options = makeCategoriesOptions(categories);
        setOptions(options);
    };


    const updateFormData = React.useCallback((value:string|undefined)=>{
        setProductFormData({
            ...productFormData,
            title: value
        });
    }, [setProductFormData, productFormData]);

    const setInputStateIsDefault = React.useCallback(()=>{
        setIconState(EProductValidateIcon.validate);
        setIconColorState(EProductValidateIconColor.validate);
        setShowIconState(false);
        //
    }, []);

    const setInputStateIsValidate = React.useCallback(()=>{
        setIconState(EProductValidateIcon.validate);
        setIconColorState(EProductValidateIconColor.validate);
        setShowIconState(true);
    }, []);

    const setInputStateIsWarning = React.useCallback(()=>{
        setIconState(EProductValidateIcon.warning);
        setIconColorState(EProductValidateIconColor.warning);
        setShowIconState(true);
    }, []);

    /**
     * @param e input value
     */
    const handlerBlur = React.useCallback(async (e:ISelectedEventData|undefined)=>{
        if(!e) return;

        // not select
        if(e.index < 0 || !e.option){
            setMessageState('Bạn không nên để trống danh mục sản phẩm');
            setInputStateIsWarning();
            updateFormData('undefined');
            return;
        }

        // not change
        if(e.option.value === value){
            setMessageState(undefined);
            setInputStateIsDefault();
            updateFormData(undefined);
            return;
        }

        setMessageState(undefined);
        setInputStateIsValidate();
        updateFormData(e.option.value);
    }, [
        value,
        setInputStateIsDefault,
        setInputStateIsValidate,
        updateFormData,
        setInputStateIsWarning,
    ]);

    React.useEffect(()=>{
        loadOptions();
    }, []);

    React.useEffect(()=>{
        //loadOptions();
        //
        if(!value){
            setMessageState('Danh mục sản phẩm không nên để trống');
            setInputStateIsWarning();
            return;
        }
        else{
            setMessageState(undefined);
            setInputStateIsDefault();
        }
        
    }, [value, setInputStateIsWarning, setInputStateIsDefault]);

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
            onBlur={handlerBlur}
        />
    );
}

export default React.memo(InputCategory);