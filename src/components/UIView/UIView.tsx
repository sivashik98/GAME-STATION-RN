import React, {FC} from "react";
import {View} from "react-native-ui-lib";

import {UIViewProps} from "./types";

export const UIView: FC<UIViewProps> = ({children, ...props}) => {

    return <View {...props}>{children}</View>;
};
