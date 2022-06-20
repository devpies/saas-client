import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import styled from "styled-components";
import { NewUser } from "../../../hooks/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (newUser: NewUser) => void;
}

export const Modal = ({ open, onClose, onSubmit }: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const firstName = event.target.value;
    setFirstName(firstName);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const lastName = event.target.value;
    setLastName(lastName);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setEmail(email);
  };

  const handleSubmit = () => {
    const newUser = {
      email,
      firstName,
      lastName,
    } as NewUser;
    onSubmit && onSubmit(newUser);
  };

  return (
    <StyledDialog
      data-test="component-user-modal"
      open={open}
      classes={{ paper: "modal" }}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContainer>
        <StyledDialogTitle id="responsive-dialog-title">
          Add User
        </StyledDialogTitle>
        <DialogContentText>Invite user to account.</DialogContentText>

        <DialogContent>
          <Field
            fullWidth={true}
            onChange={handleFirstNameChange}
            value={firstName}
            margin={"normal"}
            placeholder="First name"
          />
          <Field
            fullWidth={true}
            onChange={handleLastNameChange}
            value={lastName}
            margin={"normal"}
            placeholder="Last name"
          />
          <Field
            fullWidth={true}
            onChange={handleEmailChange}
            value={email}
            margin={"normal"}
            placeholder="Enter an email"
          />
        </DialogContent>

        <StyledDialogActions>
          <Button
            className="opt-out"
            variant="contained"
            onClick={onClose}
            color="secondary"
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            Create
          </Button>
        </StyledDialogActions>
      </DialogContainer>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)`
  .modal {
    border-radius: var(--p8);
    max-height: none;
    position: fixed;
    top: 15%;
  }
`;

const DialogContainer = styled.div`
  width: calc(var(--p384) - var(--p32) - var(--p32));
  padding: var(--p32);
`;

const DialogContent = styled.div`
  min-height: var(--p96);
`;

const StyledDialogTitle = styled(DialogTitle)`
  padding: 0 0 var(--p32);
  h2 {
    font-family: ProximaNova-Bold;
    font-size: var(--p24);
  }
`;

const Field = styled(TextField)`
  background: var(--secondary);
  border-radius: var(--p4);
  border: 1px solid var(--gray2);
  & fieldset {
    border: none;
  }
  & input {
    font-family: ProximaNova-Regular;
    font-size: var(--p16);
    padding: var(--p8);
  }
  & input:focus {
    outline: none;
    border: none;
    background: var(--white1);
    border-radius: var(--p4);
  }
`;

const StyledDialogActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: var(--p32);
  button {
    width: 48%;
    padding: var(--p8);
    font-family: ProximaNova-Bold;
    font-size: var(--p16);
    text-transform: capitalize;
  }
  .opt-out {
    color: var(--gray4);
    background: var(--gray1);
    &:hover {
      color: var(--gray9);
      background: var(--gray2);
    }
  }
`;
