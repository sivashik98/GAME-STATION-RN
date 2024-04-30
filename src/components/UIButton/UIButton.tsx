import { FC } from "react";
import { Button } from "react-native-ui-lib";
import { ActivityIndicator, StyleSheet } from "react-native";

import { UIView } from "../UIView";
import { UIButtonProps } from "./types";
import { UIText } from "../UIText";

export const UIButton: FC<UIButtonProps> = ({
  loading,
  title,
  disabled,
  titleProps,
  ...props
}) => {
  return (
    <UIView>
      <Button
        disabled={disabled}
        style={styles.button}
        backgroundColor={"#181818"}
        color={disabled ? "#7D8287" : "#fff"}
        disabledBackgroundColor={"#D5D6D8"}
        labelStyle={styles.buttonText}
        {...props}
      >
        <UIText color={"#fff"} body2M {...titleProps}>
          {title}
        </UIText>
      </Button>
    </UIView>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
  },
  buttonText: {
    fontSize: 16,
  },
});
