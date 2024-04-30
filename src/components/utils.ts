import { Typography } from "react-native-ui-lib";

export const initUiTheme = () => {
  Typography.loadTypographies({
    h1: { fontSize: 24, fontWeight: "700", lineHeight: 24, color: "#181818FF" },
    h2: { fontSize: 20, fontWeight: "700", lineHeight: 24, color: "#181818FF" },
    h3: { fontSize: 16, fontWeight: "700", lineHeight: 22, color: "#181818FF" },
    bodyB1: {
      fontSize: 18,
      fontWeight: "700",
      lineHeight: 25,
      color: "#181818FF",
    },
    bodyR1: {
      fontSize: 18,
      fontWeight: "400",
      lineHeight: 25,
      color: "#181818FF",
    },
    bodyB2: {
      fontSize: 16,
      fontWeight: "700",
      lineHeight: 22,
      color: "#181818FF",
    },
    bodyM2: {
      fontSize: 16,
      fontWeight: "500",
      lineHeight: 22,
      color: "#181818FF",
    },
    bodyR2: {
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 22,
      color: "#181818FF",
    },
    bodyB3: {
      fontSize: 14,
      fontWeight: "700",
      lineHeight: 19,
      color: "#181818FF",
    },
    bodyR3: {
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 19,
      color: "#181818FF",
    },
    bodyM3: {
      fontSize: 14,
      fontWeight: "500",
      lineHeight: 19,
      color: "#181818FF",
    },
  });
};
