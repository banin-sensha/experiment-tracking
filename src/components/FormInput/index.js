import React, { useState, useEffect } from 'react';
import className from 'classnames';
import { FontAwesomeIcon, faSearch } from '@fortawesome/react-fontawesome';


export default ({
    label,
    placeholder, 
    value, 
    onChange, 
    type, 
    name, 
    containerClassName, 
    onKeyPress,
    required, 
    noTransition,
    error,
    readOnly,
    showRequired,
    id,
    search,
    maxLength,
    mobile,
    focus,
    persist91
}) => {
    
        const [ focused, setFocused ] = useState(false);

        const [ inputType, setInputType ] = useState(type || "text");

        const [ showPassword, setShowPassword ] = useState(false);

        const [inputValue, setInputValue] = useState(value);

        const passwordInput = React.createRef();

        useEffect(() => {
            if (type == "money") {
                setInputType("text");
                value = value + "";
                if (value || value.length > 0) {
                    const removedComma = value.replace(/,/, '');
                    const numValue = Number(value.replace(/(,|[^\d.-])/g, ''));
                    if (numValue && (numValue + "").length == removedComma.length) {
                        setInputValue(numValue.toLocaleString('en-IN', { currency: 'INR' }));
                    } else {
                        // avoid multiple dots
                        const dots = (value || "").match(/\./g);
                        let valueToSet = value
                        if(dots && dots.length > 1) {
                            valueToSet = value.substring(0, value.length - 1);
                        }
                        setInputValue(valueToSet);
                    }
                }
                else {
                    setInputValue("");
                }
            }
            else {
                setInputValue(value);
            }
        }, [type, value]);

    

        useEffect(() => {
            if(type == "password") {
                setInputType(showPassword ? "text": "password");
                showPassword && passwordInput.current.focus();
            }

        }, [showPassword]);

        useEffect(() => {
            const timeOut = setTimeout(() => {
                const { current } = passwordInput;
                if(current != null) {
                    const match = (current.matches ||current.msMatchesSelector);
                    setFocused(match.call(current, ":-webkit-autofill"));
                }
            });

            return () => {
                clearTimeout(timeOut);
            }

        }, []);

        return <div className={className("input-container mb-10x pb-5x" + (containerClassName || ""), {
            "password-field": type == "password"
        })}>
            <label 
                className={className("label", {
                    "input-focussed": !noTransition && ((value && value.length > 0) || focused ||(value && value != '') || value == "0"),
                    "no-transition": noTransition
                })}
                onClick={e => { 
                    e.currentTarget.nextSibling.focus(); 
                    // e.currentTarget.nextSibling.placeholder = placeholder; 
                }}
                >
                    {
                        search && <FontAwesomeIcon icon={faSearch} className="font-light search-icon mr-5x" />
                    }

                    {label || placeholder} { showRequired && <sup className="font-danger fs-10">*</sup>}
            </label>
            
            
            <input type={inputType} 
                value={inputValue}
                onChange={onChange}
                onClick={e =>  e.stopPropagation() }
                onFocus={e => {
                    setFocused(true);
                }}
                onBlur={e => {
                    setFocused(false);
                }}
                onKeyUp={e => onKeyPress && onKeyPress(e)}
                onKeyDown={e => {
                    if(inputType == "number") {
                        // + - / * . 
                        const restrictedKeys = [107, 108, 109, 110, 69];
                        if(restrictedKeys.indexOf(e.which) > -1) {
                            e.preventDefault();
                        }                
                    }
                    if(type == "money") {
                        // Enter only numbers
                        const charCode = e.which;
                        
                        if(charCode != 110 && charCode != 190 && 
                            charCode != 46 && charCode > 32 && ((charCode < 48 || charCode > 57))) {
                            e.preventDefault();
                        } 
                       
                    }
                }}
                name= {name || ""}
                required={required}
                autoComplete="off"
                className={className("pb-5x fs-14 form-control", {
                    "has-error": error && error != '',
                    "pl-30x" : mobile && (value != "" || persist91),
                })}
                readOnly={readOnly}
                ref={passwordInput}
                id={id || label || placeholder || "" }
                maxLength={maxLength || 1000}
                autoFocus={focus}
            />
            {
                type == "password" && 
                <div className="position-absolute eye font-light" onClick={(e) => {
                    setShowPassword(!showPassword);
                }} >
                    <span className="fs-12">{showPassword ? 'HIDE' : 'SHOW' }</span>
                </div> 
            }

            {
                mobile && (value != "" || persist91) &&
                <span className="fs-14 lh-20 font-medium font-light-grey position-absolute plus-91">
                    +91
                </span>
            }
            
            <span className="font-danger fs-10">{error}</span>
        </div>
}
