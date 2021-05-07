import React from "react";

import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

interface State {
  name: string;
}

class Modal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    this.setState({ name });
  };

  handleSubmit = () => {
    const { onSubmit } = this.props;
    const { name } = this.state;
    onSubmit && onSubmit(name);
  };

  render() {
    const { open, onClose } = this.props;
    const { name } = this.state;
    return (
      <Dialog
        data-test="component-projects-modal"
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Manage A New Project"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth={true}
            onChange={this.handleChange}
            value={name}
            placeholder="Project Name"
          />
          <DialogContentText>
            This could be the app or website name
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={this.handleSubmit}
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export { Modal };
