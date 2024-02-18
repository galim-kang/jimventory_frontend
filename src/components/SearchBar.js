import React from 'react';
import styled from 'styled-components';
import SearchIcon from '../image/SearchLocIcon.png';
// import SearchIcon from '../image/searchIcon.png';
const SearchBarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 57px;
  z-index: 2;
`;
const SearchBarBox = styled.div`
  width: 306px;
  height: 46px;
  background-color: rgb(255, 255, 255);
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const SearchBarInput = styled.input`
  all: unset;
  box-sizing: border-box;
  padding: 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 50px;
  width: 306px;
  height: 46px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
`;
const SearchButton = styled.button`
  all: unset;
  background-image: url(${SearchIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 33px;
  height: 33px;
  font-weight: lighter;
  background-color: rgba(255, 255, 255, 0);
  position: absolute;
  right: 12px;
  top: 6px;
`;

const SearchBar = ({ searchValue, setSearchValue, onSearchLocation }) => {
  return (
    <SearchBarWrapper>
      <SearchBarBox>
        <div>
          <SearchBarInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <SearchButton
            className="search-bar-btn"
            onClick={onSearchLocation}
          ></SearchButton>
        </div>
      </SearchBarBox>
    </SearchBarWrapper>
  );
};

export default SearchBar;
