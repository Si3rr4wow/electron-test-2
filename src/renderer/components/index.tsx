import React from 'react'

export const Button: React.FunctionComponent<{
  onClick: () => void;
  primary?: boolean;
}> = props => (
  <a
    className={`button ${props.primary && "button--primary"}`}
    href="#"
    onClick={props.onClick}
  >
    {props.children}
  </a>
);

export const GrayBox: React.FunctionComponent = props => (
  <div className="background-color--grey--1 spaced--tight padded--tight">
    {props.children}
  </div>
);

export const Centered: React.FunctionComponent = props => (
  <div
    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <div>{props.children}</div>
  </div>
);
