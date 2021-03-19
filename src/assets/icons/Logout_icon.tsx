import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const LogoutIcon = (props: SvgProps) => {
  return (
    <Svg width={28} height={28} fill='none' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 6a6 6 0 016-6h16a6 6 0 016 6v16a6 6 0 01-6 6H6a6 6 0 01-6-6V6z'
        fill='#785204'
      />
      <Path
        d='M9 8a1 1 0 000-2H7a1 1 0 00-1 1v14a1 1 0 001 1h2a1 1 0 000-2H8V8h1zm13.82 5.42l-2.82-4a1 1 0 10-1.63 1.16L20.09 13H12a1 1 0 000 2h8l-1.8 2.4a1 1 0 001.6 1.2l3-4a1 1 0 00.02-1.18z'
        fill='#E9ECEE'
      />
    </Svg>
  );
}

export default LogoutIcon;
