import React from "react";
import styled from "styled-components";
import {  Button } from 'flowbite-react';
const Switcharrow = ({ isChecked, onToggle }) => {
    return (
        <StyledWrapper>
            <Button>

                <label htmlFor="burger" className="buttons__burger">
                    <input
                        id="burger"
                        type="checkbox"
                        checked={isChecked}
                        onChange={onToggle}
                    />
                    <span />
                    <span />
                    <span />
                </label>
            </Button>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .buttons__burger {
    --size: 2rem;
    --clr: #f0f0f0;
    width: var(--size);
    height: calc(0.7 * var(--size));
    cursor: pointer;
    position: relative;
    display: block;
  }

  .buttons__burger #burger {
    display: none;
    width: 100%;
    height: 100%;
  }

  .buttons__burger span {
    display: block;
    position: absolute;
    width: 100%;
    border-radius: 0.5rem;
    border: 2px solid var(--clr);
    background-color: var(--clr);
    transition: 0.15s ease-in-out;
  }

  .buttons__burger span:nth-of-type(1) {
    transform: translateX(108%) rotate(40deg);
    width: 50%;
    top: 20%;
  }

  .buttons__burger span:nth-of-type(2) {
    top: 50%;
    transform: translateY(-50%);
  }

  .buttons__burger span:nth-of-type(3) {
    transform: translateX(-1%) rotate(-40deg);
    width: 50%;
    top: 64%;
    right: 0;
  }

  .buttons__burger #burger:checked ~ span:nth-of-type(1) {

    transform: translateY(-62%) translateX(-11%) rotate(-40deg);
    width: 50%;
    top: 30%;
  }

  .buttons__burger #burger:checked ~ span:nth-of-type(3) {

    transform: translateY(-43%) translateX(-99%) rotate(40deg);
    width: 50%;
    top: 70%;
  }
`;

export default Switcharrow;
