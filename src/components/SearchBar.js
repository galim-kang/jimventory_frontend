import React from "react";
import styled from "styled-components";
import MyLocationIcon from "../image/MyLocation .png";
import SearchIcon from '../image/searchIcon.png';
const SearchBarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom : 109px;
z-index: 2;

`;
const SearchBarBox = styled.div`
width: 350px;
height : 80px;
background-color: rgb(255,55,55);
border-radius: 50px;
display : flex;
justify-content: center;
align-items: center;
position : relative;
`
const SearchBarInput = styled.input`
all : unset;
background-color: rgb(223, 225, 226);
  border-radius: 50px;
  width : 271px;
  height: 60px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
`;
const SearchButton = styled.button`
all : unset;
background-image: url(${SearchIcon});
background-repeat: no-repeat;
  background-position: center;
    width: 40px;
    height: 40px;
    font-weight: lighter;
    background-color : rgba(255,255,255,0);
    position : absolute;
    right: 83px;
    top : 18px;
`
const CurrentLocationButton = styled.button`

  padding: 30px;
  border: none;
  /* border-radius: 50px; */
  background-image: url(${MyLocationIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 70px;
  background-color: rgba(255,255,255,0);
  /* width: 40px; */
  &:hover {
    transform: translateY(1px);
  }
  &:hover:before {
    width: 0;
  }
`;
const SearchBar = ({ searchValue, setSearchValue, onSearchLocation, handleCenterToCurrentLocation }) => {
  return (
    <SearchBarWrapper>
      <SearchBarBox>
        <div>
        <SearchBarInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <SearchButton className="search-bar-btn" onClick={onSearchLocation}></SearchButton>
        </div>
        <CurrentLocationButton onClick={handleCenterToCurrentLocation}/>
      </SearchBarBox>
    </SearchBarWrapper>
  );
};

export default SearchBar;
