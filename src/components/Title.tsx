import React, { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

type TitleProps = {
  size?: "small" | "default" | "large";
  color?: string;
  children: ReactNode;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
};

const sizeStyles = StyleSheet.create({
  small: {
    fontSize: 14,
  },
  default: {
    fontSize: 18,
  },
  large: {
    fontSize: 24,
  },
});

export const Title = ({
  size = "default",
  textAlign,
  color,
  children,
}: TitleProps) => (
  <Text style={[sizeStyles[size], { color, textAlign }]}>{children}</Text>
);
