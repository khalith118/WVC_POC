import React, { useEffect, useRef, useState } from "react"
import '../styles/_autocomplete.scss';

interface IAutoComplete {
    title: string;
    options: any;
    value: string;
    onChange: any;
    onSelect: any;
    type: any;
    filterkeyName: string;
    showLabel: any;
}

export default function AutoComplete({
    title,
    options = [],
    value,
    onChange,
    onSelect,
    type,
    filterkeyName,
    showLabel
}: IAutoComplete) {

    const [showOptions, setShowOptions] = useState(false)
    const [cursor, setCursor] = useState(-1)
    const [filteredOptions, setFilteredOptions] = useState<any[]>([])
    const ref = useRef<HTMLDivElement>(null)

    const select = (option: any) => {
        // const res = type == 'string' ? option : option[filterkeyName];
        onSelect(option)
        setShowOptions(false)
    }

    const handleChange = (text: string) => {
        onChange(text);
        setCursor(-1);
        if (!showOptions) {
            setShowOptions(true)
        }
    }

    const getData = () => options.filter((option: any) => type === 'string' ?
        option.toLowerCase().indexOf(value.toLowerCase()) > -1
        : option[filterkeyName].toLowerCase().indexOf(value.toLowerCase()) > -1)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { setFilteredOptions(getData()); }, [value, options])

    const getLable = (option: any) => {
        let label = '';
        showLabel.forEach((el: string | number, i: number) => { label += option[el] + (i === (showLabel.length - 1) ? '' : ', '); })
        return label;
    }
    const moveCursorDown = () => {
        if (cursor < filteredOptions.length - 1) {
            setCursor(c => c + 1)
        }
    }

    const moveCursorUp = () => {
        if (cursor > 0) {
            setCursor(c => c - 1)
        }
    }

    const handleNav = (e: any) => {
        switch (e.key) {
            case "ArrowUp":
                moveCursorUp();
                break;
            case "ArrowDown":
                moveCursorDown();
                break;
            case "Enter":
                if (cursor >= 0 && cursor < filteredOptions.length) {
                    select(filteredOptions[cursor]);
                }
                break;
        }
    }

    useEffect(() => {
        const listener = (e: any) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setShowOptions(false)
                setCursor(-1)
            }
        };

        document.addEventListener('click', listener)
        document.addEventListener('focusin', listener)
        return () => {
            document.removeEventListener('click', listener);
            document.removeEventListener('focusin', listener);
        }
    }, []);

    return (<div className="autocompletebox " ref={ref} >
        <input type="text" value={value}
            onChange={e => handleChange(e.target.value)}
            onFocus={() => setShowOptions(true)}
            onKeyDown={handleNav}
        />

        <ul className={showOptions ? '' : 'hidden'}>
            {filteredOptions.length > 0 ? filteredOptions.map((option, i, arr) => {
                let className = ""
                if (i === 0)
                    className += " first"
                else if (i === arr.length)
                    className += " last"
                else if (i === 0 && arr.length === 1)
                    className += " same"
                else
                    className += " "

                if (cursor === i) {
                    className += " cursor"
                }

                return <li className={className}
                    key={i}
                    onClick={() => select(option)}
                >{type === 'string' ? option : getLable(option)} </li>
            }) : <li className="noresult">No results</li>}

        </ul>
    </div>)
}