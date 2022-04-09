import * as React from 'react';
import {TLapisReactElements} from '../../../core/LapisType';
import optimizeSearchInput from '../../../core/optimizeSearchInput';

import './LapisSelection.scss';

export interface IOption{
    label: string,
    value: string|undefined,
}

export interface ISelectedEventData{
    index: number,
    option: IOption,
}



export interface ILapisSelectionProps {
    title?: string,
    options: IOption[],
    onSelected?: (option?: ISelectedEventData) => void
}

interface ICurrentOption extends IOption{
    index: number,
}

export default function LapisSelection (props: ILapisSelectionProps) {
    const {onSelected, options} = props;

    const optionsSorted:ICurrentOption[] = React.useMemo(()=>{
        console.log('update option sorted');
        const optionsCloned:ICurrentOption[] = [];

        options.forEach((option, i)=>{
            optionsCloned.push({
                ...option,
                index: i,
            });
        });

        // sort by option label
        optionsCloned.sort((optionA, optionB)=>{
            const labelA:string = optimizeSearchInput(optionA.label);
            const labelB:string = optimizeSearchInput(optionB.label);

            if(labelA === labelB) return 0;
            if(labelA > labelB) return 1;
            return -1;
        });

        return optionsCloned;
    }, [options]);

    //
    //
    // func prev state
    const filterOptions = React.useCallback((v?:string) =>{
        const newCurrentOptions:ICurrentOption[] = [];
        newCurrentOptions.push({
           value: undefined,
           label: 'Remove selected',
           index: -1,
        });

        optionsSorted.forEach((option)=>{
            if(v && v !== ''){
                const optionLabel = optimizeSearchInput(option.label);
                const inputValue = optimizeSearchInput(v);

                if(!optionLabel.includes(inputValue)){
                    return;
                }
            }
            newCurrentOptions.push({...option});
        });

        return newCurrentOptions;

    }, [optionsSorted]);

    //
    //
    // states 
    const [classSelecting, setClassSelecting] = React.useState<'selecting'|''>('');
    const [classSelected, setClassSelected] = React.useState<'selected'|''>('');
    const [classInputEmpty, setClassInputEmpty] = React.useState<'input-empty'|''>('');

    const [indexMark, setIndexMark] = React.useState<number>(-1);
    const [currentOptions, setCurrentOptions] = React.useState<ICurrentOption[]>(filterOptions());
    
    // Ref
    const selectedIndexRef = React.useRef<number>(-1);
    const inputElmntRef = React.useRef<HTMLInputElement>(null);
    
    //
    //
    // Func after state
    const inputValue = React.useCallback((v?:string)=>{
        if(!inputElmntRef.current) return undefined;
        // get
        if(v===undefined){
            return inputElmntRef.current.value;
        }
        // set
        inputElmntRef.current.value = v;
        //
        if(v === ''){
            setClassInputEmpty('input-empty');
        }
        else{
            setClassInputEmpty('');
        }
    }, [inputElmntRef]);

    

    const updateCurrentOptions = React.useCallback((v?:string)=>{
        setCurrentOptions(filterOptions(v));
        //
    }, [filterOptions]);

    //
    //
    // event handler

    const handlerInputFocus = React.useCallback(()=>{
        setClassSelecting('selecting');
    }, []);

    const handlerCoverClick = React.useCallback(()=>{
        if(selectedIndexRef.current < 0){
            setClassSelected('');
        }
        else{
            setClassSelected('selected');
        }
        
        inputValue("");
        updateCurrentOptions();

        // update state
        setIndexMark(-1);
        setClassSelecting('');

    }, [inputValue, updateCurrentOptions]);





    const handlerInputKeyDown = React.useCallback((e:React.KeyboardEvent<HTMLInputElement>)=>{
        switch(e.key){
            case 'ArrowDown': {
                e.preventDefault();

                const nextIndex:number = indexMark + 1;
                if(nextIndex >= currentOptions.length) return;
                
                inputValue(currentOptions[nextIndex].label);
                setIndexMark(nextIndex);
                break;
            }
            case 'ArrowUp': {
                e.preventDefault();

                const prevIndex:number = indexMark - 1;
                if(prevIndex < 0) return;

                inputValue(currentOptions[prevIndex].label);
                setIndexMark(prevIndex);

                break;
            }
            case 'Enter': {
                if(indexMark < 0) return;

                const {label, index} = currentOptions[indexMark];

                // dispatch event
                if(onSelected){
                    onSelected({
                        index,
                        option: options[index]
                    });
                }
                
                selectedIndexRef.current = index;
                setIndexMark(-1);

                if(index === -1){
                    inputValue('');
                    updateCurrentOptions();
                }
                else{
                    inputValue(label);
                    updateCurrentOptions(label);
                }


                break;
            }
            case 'Tab': {
                handlerCoverClick();

                break;
            }
            default: {
                setIndexMark(-1);
                updateCurrentOptions(e.currentTarget.value);
                //
            }
        }
    }, [updateCurrentOptions, indexMark, inputValue, currentOptions, handlerCoverClick, onSelected, options]);





    const handlerInputKeyUp = React.useCallback((e:React.KeyboardEvent<HTMLInputElement>)=>{
        switch(e.key){
            case 'Backspace':{
                if(inputValue() === ''){
                    setClassInputEmpty('input-empty');
                }
                break;
            }
            default: {
                if(inputValue() !== ''){
                    setClassInputEmpty('');
                }
            }
        }
    }, [inputValue]);





    const handlerOptionClick = React.useCallback((index:number)=>{
        // v: is option value
        return () => {
            // dispatch event
            if(onSelected){
                onSelected({
                    index,
                    option: options[index]
                });
            }
            //
            selectedIndexRef.current = index;
            handlerCoverClick();
        }
    }, [options, onSelected, handlerCoverClick]);


    // Component did mount
    React.useEffect(()=>{

    },[]);

    const renderOption = ():TLapisReactElements => {
        if(currentOptions.length === 0) return undefined;

        const optionElmnts:TLapisReactElements = currentOptions.map((currentOption, i)=>{
            const liClassName:string = selectedIndexRef.current === currentOption.index ? 'selected' : '';
            const optionClassName = indexMark === i ? ' mark' : '';
            //
            return ((
                <li
                    key={`${i}-${currentOption.value}`}
                    className={liClassName}
                >
                    <div>
                        <div
                            onClick={handlerOptionClick(currentOption.index)}
                            className={optionClassName}
                        >
                            {currentOption.label}
                        </div>
                    </div>
                </li>
            ));
        });

        return optionElmnts;
    }

    const labelSelectedContent = selectedIndexRef.current >= 0 ? options[selectedIndexRef.current].label : '';

    return (
        <div className={`lapis-ui lapis-selection ${classSelecting} ${classSelected}`}>
            <div className='cover' onClick={handlerCoverClick}></div>
            <div className='container'>
                <div className='title'>
                    <div>
                        this is title
                    </div>
                </div>
                <div className='input-wrap'>
                    <div className={`label-selected ${classInputEmpty}`}>
                        <div>
                            {labelSelectedContent}
                        </div>
                    </div>
                    <input
                        ref={inputElmntRef}
                        type="text"
                        onFocus={handlerInputFocus}
                        onKeyDown={handlerInputKeyDown}
                        onKeyUp={handlerInputKeyUp}
                    />
                    <div className='icon-wrap show-icon'>
                        <div className='icon'>
                            view_in_ar
                        </div>
                        <div className='message'>
                            message
                        </div>
                    </div>
                </div>
                <div className='line'>
                    <div/>
                </div>
                <div className='option'>
                    <ul>
                        {renderOption()}
                    </ul>
                </div>
            </div>
        </div>
    );
}
