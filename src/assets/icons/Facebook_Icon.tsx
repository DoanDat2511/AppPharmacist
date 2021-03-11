import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const FaceBookIcon = (props: SvgProps) => {
  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        d="M13.396 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684v-2.86c-.82-.089-1.643-.131-2.467-.128-2.444 0-4.122 1.492-4.122 4.231v2.355H7.331v3.21h2.753v8.201h3.312z"
        fill="#5496FF"
      />
    </Svg>
  );
}

export default FaceBookIcon