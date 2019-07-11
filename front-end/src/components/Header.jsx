import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background: #2cbe4e;
  width: 100vw;
  margin-bottom: 30px;

  h1 {
    font-size: 25px;
    color: #ffffff;
    margin: 20px 10px;
  }
`;

export default () => (
  <StyledHeader>
    <h1>User Manager</h1>
  </StyledHeader>
);
