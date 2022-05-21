import React from "react";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";

export const Loader = () => (
  <Container>
    <StyledCircularProgress />
  </Container>
);

const Container = styled.div`
  text-align: center;
  margin-top: 50vh;
`;

const StyledCircularProgress = styled(CircularProgress)`
  color: var(--blue7);
`;
