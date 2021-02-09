import React from 'react';
import styled from "styled-components";

const SearchBoxcontainer = styled.div`
    display: flex;
    padding: 20px;
    padding-bottom: 0px;
    justify-content: space-between;
`;

const SearchInput = styled.input`
    font-size: 17px;
    outline: none;
    border: none;
    border-bottom: 1px solid rgba(128, 128, 128, .5);
    float: left;
    
    ::-webkit-input-placeholder  {
        opacity: 0.5;
    }
`;

const SearchBox = ({onTextChange, onCheckboxClick, searchPlaceholder, checkboxText}) => {
    return (
        <SearchBoxcontainer>
            <SearchInput onChange={onTextChange} placeholder={searchPlaceholder} />
            <div>
                <input type="checkbox" onClick={onCheckboxClick} />
                <label> {checkboxText} </label>
            </div>
        </SearchBoxcontainer>
    )
}

export default SearchBox;