import * as React from "react";
import Svg, { G, Path, SvgProps, Defs, ClipPath } from "react-native-svg";

function ProfileIcon(props:SvgProps ) {
  return (
    <Svg width={28} height={29} fill='none' {...props}>
      <G clipPath='url(#prefix__clip0)'>
        <Path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M0 6.5a6 6 0 016-6h16a6 6 0 016 6v16a6 6 0 01-6 6H6a6 6 0 01-6-6v-16z'
          fill='#C4932D'
        />
        <Path
          d='M22.375 6.125H16.25a2.607 2.607 0 00-1.75.683 2.607 2.607 0 00-1.75-.683H6.625A.875.875 0 005.75 7v13.125a.875.875 0 00.875.875h5.038c.46 0 .912.187 1.237.513l.981.98c.008.009.019.011.027.019.075.07.159.13.257.171h.002a.871.871 0 00.666 0h.002a.895.895 0 00.257-.171c.008-.008.019-.01.027-.018l.98-.981A1.763 1.763 0 0117.337 21h5.038a.875.875 0 00.875-.875V7a.875.875 0 00-.875-.875zM11.663 19.25H7.5V7.875h5.25c.483 0 .875.393.875.875v11.103c-.58-.391-1.262-.6-1.962-.603zm9.837 0h-4.163c-.7 0-1.386.215-1.962.603V8.75c0-.482.392-.875.875-.875h5.25V19.25z'
          fill='#fff'
        />
      </G>
      <Defs>
        <ClipPath id='prefix__clip0'>
          <Path fill='#fff' transform='translate(0 .5)' d='M0 0h28v28H0z' />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default ProfileIcon;
