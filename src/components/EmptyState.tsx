import React, { ReactNode } from "react";
import { AntDesign } from "@expo/vector-icons";

import { Title } from "./Title";

type EmptyStateProps = {
  title: ReactNode;
};

export const EmptyState = ({ title }: EmptyStateProps) => (
  <>
    <AntDesign name="frowno" size={24} color="black" />
    <Title>{title}</Title>
  </>
);
