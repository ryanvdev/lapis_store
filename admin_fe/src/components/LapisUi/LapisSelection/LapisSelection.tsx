import * as React from 'react';
import { TLapisReactElements } from '../../../core/LapisType';
import optimizeSearchInput from '../../../core/optimizeSearchInput';

import './LapisSelection.scss';

export interface IOption {
    label: string;
    value: string | undefined;
}

export interface ISelectedEventData {
    index: number;
    option: IOption|undefined;
}

export interface ILapisSelectionProps {
    title?: string;
    options: IOption[];
    maxLength?: number;
    selectedValue?: string;
    message?: string;
    
    icon?:string;
    iconColor?:string;
    showIcon?:boolean;

    onSelected?: (option: ISelectedEventData) => any;
    onBlur?: (option: ISelectedEventData) => any | Promise<any>;
}

interface ICurrentOption extends IOption {
    index: number;
}

function LapisSelection(props: ILapisSelectionProps) {
    console.log('LapisSelection rerender');
    const { onSelected, options, selectedValue, maxLength, onBlur } = props;
    //
    // STATE
    const [classSelecting, setClassSelecting] = React.useState<'selecting' | ''>('');
    const [classSelected, setClassSelected] = React.useState<'selected' | ''>('');
    const [classInputEmpty, setClassInputEmpty] = React.useState<'input-empty' | ''>('');

    const [indexMark, setIndexMark] = React.useState<number>(-1);
    const [currentOptions, setCurrentOptions] = React.useState<ICurrentOption[]>([]);

    // REF
    const selectedIndexRef = React.useRef<number>(-1);
    const inputElmntRef = React.useRef<HTMLInputElement>(null);

    //
    const optionsSorted: ICurrentOption[] = React.useMemo(() => {
        const optionsCloned: ICurrentOption[] = [];

        options.forEach((option, i) => {
            optionsCloned.push({
                ...option,
                index: i,
            });
        });

        // sort by option label
        optionsCloned.sort((optionA, optionB) => {
            const labelA: string = optimizeSearchInput(optionA.label);
            const labelB: string = optimizeSearchInput(optionB.label);

            if (labelA === labelB) return 0;
            if (labelA > labelB) return 1;
            return -1;
        });

        return optionsCloned;
    },
    [options]
    );

    //
    //
    // METHOD

    const makeSelectedEventData = React.useCallback(()=>({
        index: selectedIndexRef.current,
        option: selectedIndexRef.current >= 0 ? options[selectedIndexRef.current] : undefined
    }),
    [options]
    );

    const makeLabelSelectedContent = () => {
        if (options.length === 0) {
            return '';
        }

        if (selectedIndexRef.current < 0) {
            return '';
        }

        if (!options[selectedIndexRef.current]) {
            return '';
        }

        return options[selectedIndexRef.current].label;
    };

    const standardizeOptionLabel = React.useCallback(
        (label: string) => {
            if (!maxLength) return label;

            if (label.length > maxLength) {
                return `...${label.slice((maxLength - 3) * -1)}`;
            }

            return label;
        },
        [maxLength],
    );

    const filterOptions = React.useCallback(
        (v?: string) => {
            const newCurrentOptions: ICurrentOption[] = [];
            newCurrentOptions.push({
                value: undefined,
                label: 'Remove selected',
                index: -1,
            });

            optionsSorted.forEach((option) => {
                if (v && v !== '') {
                    const optionLabel = optimizeSearchInput(option.label);
                    const inputValue = optimizeSearchInput(v);

                    if (!optionLabel.includes(inputValue)) {
                        return;
                    }
                }
                newCurrentOptions.push({ ...option });
            });

            return newCurrentOptions;
        },
        [optionsSorted],
    );

    const inputValue = React.useCallback(
        (v?: string) => {
            if (!inputElmntRef.current) return undefined;
            // get
            if (v === undefined) {
                return inputElmntRef.current.value;
            }
            // set
            inputElmntRef.current.value = v;
            //
            if (v === '') {
                setClassInputEmpty('input-empty');
            } else {
                setClassInputEmpty('');
            }
        },
        [inputElmntRef],
    );

    const updateCurrentOptions = React.useCallback(
        (v?: string) => {
            setCurrentOptions(filterOptions(v));
            //
        },
        [filterOptions],
    );

    // EVENT HANDLER

    const handlerInputFocus = React.useCallback(() => {
        inputValue('');
        setClassSelecting('selecting');
    },
    [inputValue]
    );

    const handlerCoverClick = React.useCallback(() => {
        if (selectedIndexRef.current < 0) {
            setClassSelected('');
        } else {
            setClassSelected('selected');
        }

        updateCurrentOptions();

        // update state
        setIndexMark(-1);
        setClassSelecting('');

        // dispatch event
        if(onBlur){
            onBlur(makeSelectedEventData());
        }
    },
    [updateCurrentOptions, onBlur, makeSelectedEventData]
    );

    const handlerInputKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            switch (e.key) {
                case 'ArrowDown': {
                    e.preventDefault();

                    const nextIndex: number = indexMark + 1;
                    if (nextIndex >= currentOptions.length) return;

                    inputValue(currentOptions[nextIndex].label);
                    setIndexMark(nextIndex);
                    break;
                }
                case 'ArrowUp': {
                    e.preventDefault();

                    const prevIndex: number = indexMark - 1;
                    if (prevIndex < 0) return;

                    inputValue(currentOptions[prevIndex].label);
                    setIndexMark(prevIndex);

                    break;
                }
                case 'Enter': {
                    if (indexMark < 0) return;

                    const { label, index } = currentOptions[indexMark];

                    selectedIndexRef.current = index;
                    setIndexMark(-1);

                    if (index === -1) {
                        inputValue('');
                        updateCurrentOptions();
                    } else {
                        inputValue(label);
                        updateCurrentOptions(label);
                    }

                    // dispatch event
                    if(onSelected) onSelected(makeSelectedEventData())

                    break;
                }
                case 'Tab': {
                    handlerCoverClick();
                    break;
                }
                default: {
                    setIndexMark(-1); // remove mark of option when press arrow up or arrow down key
                    updateCurrentOptions(e.currentTarget.value);
                }
            }
        },
        [
            updateCurrentOptions,
            indexMark,
            inputValue,
            currentOptions,
            handlerCoverClick,
            onSelected,
            makeSelectedEventData,
        ],
    );

    const handlerInputKeyUp = React.useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            switch (e.key) {
                case 'Backspace': {
                    if (inputValue() === '') {
                        setClassInputEmpty('input-empty');
                    }
                    break;
                }
                default: {
                    if (inputValue() !== '') {
                        setClassInputEmpty('');
                    }
                }
            }
        },
        [inputValue],
    );

    const handlerOptionClick = React.useCallback(
        (index: number) => () => {
            selectedIndexRef.current = index;
            handlerCoverClick();

            // dispatch event
            if (onSelected) onSelected(makeSelectedEventData());
        },
        [onSelected, handlerCoverClick, makeSelectedEventData],
    );

    // Update options when options of props change
    React.useEffect(() => {
        setCurrentOptions(filterOptions(''));
    },
    [filterOptions]);

    React.useEffect(() => {
        if (!selectedValue) {
            return;
        }

        const optionSelected = optionsSorted.find((option) => {
            return option.value === selectedValue;
        });

        if (!optionSelected) {
            return;
        }

        selectedIndexRef.current = optionSelected.index;
        setClassSelected('selected');
    },
    [selectedValue, optionsSorted]);

    const renderOption = (): TLapisReactElements => {
        if (currentOptions.length === 0) return undefined;

        const optionElmnts: TLapisReactElements = currentOptions.map(
            (currentOption, i) => {
                const liClassName: string =
                    selectedIndexRef.current === currentOption.index ? 'selected' : '';
                const optionClassName = indexMark === i ? ' mark' : '';
                //
                return (
                    <li key={`${i}-${currentOption.value}`} className={liClassName}>
                        <div>
                            <div
                                onClick={handlerOptionClick(currentOption.index)}
                                className={optionClassName}
                            >
                                {standardizeOptionLabel(currentOption.label)}
                            </div>
                        </div>
                    </li>
                );
            },
        );

        return optionElmnts;
    };

    return (
        <div className={`lapis-ui lapis-selection ${classSelecting} ${classSelected}`}>
            <div className='cover' onClick={handlerCoverClick}></div>
            <div className='container'>
                <div className='title'>
                    <div>{props.title}</div>
                </div>
                <div className='input-wrap'>
                    <div className={`label-selected ${classInputEmpty}`}>
                        <div>{makeLabelSelectedContent()}</div>
                    </div>
                    <input
                        ref={inputElmntRef}
                        type='text'
                        onFocus={handlerInputFocus}
                        onKeyDown={handlerInputKeyDown}
                        onKeyUp={handlerInputKeyUp}
                    />
                    <div className={`icon-wrap ${props.showIcon ? 'show-icon' : ''}`}>
                        <div
                            className='icon'
                            style={{ color: props.iconColor }}
                        >
                            {props.icon || ''}
                        </div>
                        <div
                            className={`message ${props.message && 'show-message' }`}
                        >
                            {props.message || ''}
                        </div>
                    </div>
                </div>
                <div className='line'>
                    <div />
                </div>
                <div className='option'>
                    <ul>{renderOption()}</ul>
                </div>
            </div>
        </div>
    );
}

export default React.memo(LapisSelection);
