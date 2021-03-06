import Add from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Layout } from "components/Layout";
import { useCreateProject } from "hooks/project";
import React, { useState } from "react";

import { List } from "./List";
import { Modal } from "./Modal";

export const Projects = () => {
  const [isOpen, setOpen] = useState(false);
  const [createProject] = useCreateProject();

  const toggleModal = () => {
    setOpen(!isOpen);
  };

  return (
    <Layout>
      <Grid container={true} spacing={10}>
        <Grid item={true} xs={12}>
          <Header>
            <h1>Projects</h1>
            <Fab onClick={toggleModal} color="primary" aria-label="Add">
              <Add />
            </Fab>
          </Header>
          <List />
          <Grid item={true} xs={12}>
            <Modal
              open={isOpen}
              onClose={toggleModal}
              onSubmit={createProject}
            />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

const Header = styled("header")`
  display: flex;
  justify-content: space-between;
`;
