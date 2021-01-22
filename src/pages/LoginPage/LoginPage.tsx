import {
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import useLogin from '../../effects/mutations/auth/useLogin';
import useAuthenticate from '../../effects/queries/auth/useAuthenticate';
import userState from '../../states/UserState';
import { eraseCookie, setCookie } from '../../utils/cookies';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FieldInfo from '../../components/Loading/FieldInfo';
import getErrorResponse from '../../utils/getErrorResponse';
import ErrorBox from '../../components/ErrorBox/ErrorBox';

interface Props {}

const initialValues = {
  email: '',
  password: '',
};

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    width: '500px',
    height: '500px',
  },
  cardContent: {
    height: '100%',
  },
  form: {
    width: '100%',
    '& > *': {
      marginBottom: theme.spacing(3),
    },
  },
  firstInput: {
    marginTop: theme.spacing(1),
  },
}));

const fields: FieldInfo = {
  email: { label: 'Email' },
  password: { label: 'Password', type: 'password' },
};

export default function LoginPage({}: Props): ReactElement {
  const classes = useStyles();

  const [login, { isLoading, error }] = useLogin({
    onError() {
      setFieldValue('password', '');
      setFieldTouched('password', false);
    },
    onSuccess(data) {
      console.log(data);
      setCookie('tkn', data.token, 7);
      setUserData({ user: data.data, token: data.token });
    },
  });

  const setUserData = useSetRecoilState(userState);

  const {
    handleSubmit,
    values,
    setFieldValue,
    getFieldProps,
    setFieldTouched,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .label('Email')
        .email('Invalid email address')
        .required(),
      password: Yup.string().label('Password').required(),
    }),
    onSubmit: (values) => {
      login(values as any);
    },
  });

  const handleLogin = (e: any) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      top={0}
      position="fixed"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center">
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Box
            height="30%"
            color="#3f51b5"
            display="flex"
            flexDirection="column"
            justifyContent="center">
            <Typography variant="h3" color="inherit">
              Login
            </Typography>
          </Box>
          <Box
            height="70%"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start">
            <form onSubmit={handleLogin} className={classes.form}>
              {Object.keys(values).map((key, idx) => (
                <TextField
                  key={key}
                  className={idx === 0 ? classes.firstInput : ''}
                  {...getFieldProps(key)}
                  size="small"
                  fullWidth
                  variant="outlined"
                  label={fields[key].label}
                  type={fields[key].type || 'text'}
                  color="primary"
                />
              ))}
              {error && (
                <ErrorBox
                  message={
                    getErrorResponse(error)?.message || 'Something went wrong'
                  }
                />
              )}

              <Box py={2} width="100%">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit">
                  Login
                </Button>
              </Box>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
