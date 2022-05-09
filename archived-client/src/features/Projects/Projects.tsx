import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Add from "@material-ui/icons/Add";
import { List } from "./List";
import { Modal } from "./Modal";
import { useCreateProject, useProjects } from "../../hooks/project";
import styled from "styled-components";

export const Projects = () => {
  const [isOpen, setOpen] = useState(false);
  const projects = useProjects();

  const [createProject] = useCreateProject();

  const toggleModal = () => {
    setOpen(!isOpen);
  };

  return (
    <Grid container={true} spacing={10}>
      <Grid item={true} xs={12}>
        <Header>
          <div>
            <h1>Projects</h1>
          </div>
          <Fab onClick={toggleModal} color="primary" aria-label="Add">
            <Add />
          </Fab>
        </Header>
        <List isLoading={projects.isLoading} projects={projects.data} />
        <Grid item={true} xs={12}>
          <Modal open={isOpen} onClose={toggleModal} onSubmit={createProject} />
        </Grid>
      </Grid>
    </Grid>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;
