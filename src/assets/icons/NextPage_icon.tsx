import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";
const   NextPageIcon = (props: SvgProps) =>{
  return (
    <Svg
      width={23}
      height={22}
      fill='none'
      //   xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <Circle cx={11} cy={11} r={10.5} fill='#F1F2FC' stroke='#5C74C7' />
      <Path d='M8.8 6.6l4.766 4.767L8.8 16.133' stroke='#5C74C7' />
    </Svg>
  );
}
export default NextPageIcon;
