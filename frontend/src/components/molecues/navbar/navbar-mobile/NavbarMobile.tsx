import React, { useState } from 'react';
import styled from 'styled-components';
import { BiMenu, BiPlus } from 'react-icons/bi';
import { NavbarData } from 'data/NavabarData';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Heading } from 'components/atoms/heading/Heading';

const Wrapper = styled.nav`
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.backgroundColor};
  z-index: 999;
  height: 6vh;
  position: fixed;
  top: 0;

  > svg {
    position: absolute;
    top: 0;
    font-weight: 300;
    right: 0;
    margin: 40px;
    font-size: 70px;

    padding-bottom: 2px;
    margin: 0 20px;
    cursor: pointer;
    z-index: 999;
  }

  > span {
    font-weight: 100;
  }
`;

const StyledBiMenu = styled(BiMenu)`
  transition: color 200ms linear;
  color: white;
  &:hover {
    color: #585858;
  }
`;

const StyledBiPlus = styled(BiPlus)`
  transition: color 200ms linear;
  &:hover {
    color: #585858;
  }
  color: black;
  transform: rotate(45deg);
`;

const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: 400;
  color: black;
  cursor: pointer;
  user-select: none;
`;

const StyledHeading = styled(Heading)`
  margin-top: 20vh;
  color: black;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: 400;
`;

const MainWrapper = styled.div`
  background-color: white;
  width: 100%;
  height: 100vh;
`;

const Menu = styled.div`
  height: 70vh;
  margin: 40% 20% 0% 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      {!isOpen ? (
        <StyledBiMenu onClick={() => setIsOpen(!isOpen)} />
      ) : (
        <StyledBiPlus onClick={() => setIsOpen(!isOpen)} />
      )}

      <MainWrapper style={isOpen ? { display: 'flex' } : { display: 'none' }}>
        <Menu>
          {NavbarData.map((item) => (
            <StyledLink
              onClick={() => setIsOpen(!isOpen)}
              activeClass="active"
              to={item.link}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              {item.name.toUpperCase()}
            </StyledLink>
          ))}
          <StyledHeading>PL</StyledHeading>
        </Menu>
      </MainWrapper>
    </Wrapper>
  );
};
