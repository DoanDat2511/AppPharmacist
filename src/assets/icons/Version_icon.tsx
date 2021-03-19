import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const VersionIcon = (props: SvgProps) => {
  return (
    <Svg width={28} height={28} fill='none' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 6a6 6 0 016-6h16a6 6 0 016 6v16a6 6 0 01-6 6H6a6 6 0 01-6-6V6z'
        fill='#C4932D'
      />
      <Path
        d='M14.813 18.875v-7.313h-3.25v1.626h1.624v5.687H10.75V20.5h6.5v-1.625h-2.438zM14 6.688a1.219 1.219 0 100 2.437 1.219 1.219 0 000-2.438z'
        fill='#E9ECEE'
      />
      <Path
        d='M14 25.375a11.375 11.375 0 110-22.75 11.375 11.375 0 010 22.75zM14 4.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z'
        fill='#E9ECEE'
      />
    </Svg>
  );
};

export default VersionIcon;
