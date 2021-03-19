import * as React from "react";
import Svg, { Path ,SvgProps} from "react-native-svg";

const  NotificationIcon = (props:SvgProps) => {
  return (
    <Svg width={28} height={28} fill='none' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 6a6 6 0 016-6h16a6 6 0 016 6v16a6 6 0 01-6 6H6a6 6 0 01-6-6V6z'
        fill='#785204'
      />
      <Path
        d='M22.732 16.956L20.875 15.1v-3.162a6.923 6.923 0 00-6.187-6.876V3.688h-1.375v1.376a6.978 6.978 0 00-6.188 6.875V15.1L5.27 16.956a.626.626 0 00-.206.482V19.5a.646.646 0 00.687.688h4.813a3.437 3.437 0 006.875 0h4.812a.646.646 0 00.688-.688v-2.063a.624.624 0 00-.206-.48zM14 22.25a2.062 2.062 0 01-2.062-2.063h4.125A2.062 2.062 0 0114 22.25z'
        fill='#E9ECEE'
      />
    </Svg>
  );
}

export default NotificationIcon;
