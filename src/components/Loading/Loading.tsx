import React from 'react';

interface Props {
  size?: string;
  noPadding?: boolean;
  noMargin?: boolean;
  lightColor?: boolean;
  className?: string;
}

export default function Loading({
  size = '100',
  noPadding,
  noMargin,
  lightColor,
  className,
}: Props) {
  return (
    <svg
      style={{
        margin: noMargin ? '0' : 'auto',
        padding: noPadding ? '0' : '24px',
        background: 'transparent',
        display: 'block',
        shapeRendering: 'auto',
      }}
      className={className || ''}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid">
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke={lightColor ? '#a3d4dd' : '#035d74'}
        strokeWidth="10"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138">
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"></animateTransform>
      </circle>
    </svg>
    // <svg
    //   style={{
    //     margin: 'auto',
    //     padding: noPadding ? '0' : '24px',
    //     background: 'none',
    //     display: 'block',
    //     shapeRendering: 'auto',
    //   }}
    //   width={size}
    //   height={size}
    //   viewBox="0 0 100 100"
    //   preserveAspectRatio="xMidYMid">
    //   <path
    //     d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
    //     fill="#1b998b"
    //     stroke="none">
    //     <animateTransform
    //       attributeName="transform"
    //       type="rotate"
    //       dur="1s"
    //       repeatCount="indefinite"
    //       keyTimes="0;1"
    //       values="0 50 51;360 50 51"></animateTransform>
    //   </path>
    // </svg>
  );
}
