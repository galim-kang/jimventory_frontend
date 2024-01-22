import React from "react";
import styled from "styled-components";

const SearchBarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  background-color: rgb(253, 106, 2);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.6);
`;
const SearchBarInput = styled.input`
  // 스타일 정의...
`;

const SearchBar = ({ searchValue, setSearchValue, onSearchLocation }) => {
  return (
    <SearchBarWrapper>
      <div>
        <SearchBarInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={onSearchLocation}>search</button>
      </div>
    </SearchBarWrapper>
  );
};

export default SearchBar;
