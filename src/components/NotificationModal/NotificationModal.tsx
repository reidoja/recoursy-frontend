import React, { ReactElement } from 'react';
import CustomModal from '../CustomModal/CustomModal';
import { Grid, Typography, Theme, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    width: '150px',
    height: '150px',
    '& > *': {
      width: '100%',
      height: '100%',
    },
  },
  button: {
    margin: `0 ${theme.spacing(1)}px`,
  },
}));

export interface NotificationModalProps {
  icon: JSX.Element;
  open: boolean;
  title: string;
  desc: string;
  buttonText: string;
  onButtonClickOrClose: () => void;
  cancelButtonText?: string;
  onCancelClick?: () => void;
  handleClose?: () => void;
}

export default function NotificationModal({
  icon,
  open,
  handleClose,
  title,
  desc,
  cancelButtonText,
  onCancelClick,
  buttonText,
  onButtonClickOrClose,
}: NotificationModalProps): ReactElement {
  const classes = useStyles();

  return (
    <CustomModal
      open={open}
      handleClose={handleClose || onCancelClick || onButtonClickOrClose}>
      <Grid container>
        <Grid container item xs={12} justify="center">
          <Box className={classes.icon}>{icon}</Box>
        </Grid>
        <Grid container item xs={12} justify="center">
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              {title}
            </Typography>
          </Grid>
          <Grid item container xs={12} justify="center">
            <Box py={1}>
              <Typography variant="body1" align="center">
                {desc}
              </Typography>
            </Box>
          </Grid>
          <Grid item container xs={12} justify="center">
            <Box
              py={2}
              display="flex"
              alignItems="center"
              justifyContent="center">
              {cancelButtonText ? (
                <Button
                  size="small"
                  className={classes.button}
                  variant="outlined"
                  color="secondary"
                  onClick={onCancelClick}>
                  {cancelButtonText}
                </Button>
              ) : null}
              <Button
                size="small"
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={onButtonClickOrClose}>
                {buttonText}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </CustomModal>
  );
}
