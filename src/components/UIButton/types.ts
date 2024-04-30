import { ButtonProps, TextProps } from "react-native-ui-lib";

export type UIButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  titleProps?: TextProps;
} & ButtonProps;
