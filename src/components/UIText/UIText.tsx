import React, { FC } from "react";
import { Text } from "react-native-ui-lib";

import { UITextProps } from "./types";

export const UIText: FC<UITextProps> = ({ children, ...props }) => {
  return (
    <Text flexS {...props}>
      {children}
    </Text>
  );
};
