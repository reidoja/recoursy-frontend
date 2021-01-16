import React, { ReactElement } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  makeStyles,
  Theme
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  dense: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    fontSize: theme.typography.subtitle2.fontSize
  },
  disabled: {
    backgroundColor: theme.palette.grey[200]
  }
}));

export interface Option {
  value: string | number;
  text?: string | number;
  disabled?: boolean;
}

interface Props {
  value?: string | number;
  className?: string;
  label?: string;
  options: Option[];
  loading?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  helperText?: string;
  noEmptyOption?: boolean;
  dense?: boolean;
  onChange?: (e: any) => void;
  onBlur?: () => void;
}

export default function SelectInput({
  className,
  label,
  options,
  value,
  onChange,
  loading,
  error,
  noEmptyOption,
  helperText,
  fullWidth,
  disabled,
  dense,
  onBlur
}: Props): ReactElement {
  const id = label && `select-${label.replace(/\s/g, "")}`;

  const classes = useStyles();

  const displayedOptions = noEmptyOption
    ? options
    : [{ value: "", disabled: true, text: "None" }, ...options];

  return (
    <FormControl
      error={error}
      variant="outlined"
      className={className || ""}
      size="small"
      fullWidth={fullWidth}
      disabled={disabled}
    >
      {label && <InputLabel id={id}>{label}</InputLabel>}
      <Select
        fullWidth={fullWidth}
        onBlur={onBlur}
        labelId={id}
        label={label}
        value={value || ""}
        onChange={onChange}
        className={disabled ? classes.disabled : ""}
        inputProps={{ className: dense ? classes.dense : "" }}
      >
        {loading ? (
          <MenuItem value="" disabled>
            <em>Loading...</em>
          </MenuItem>
        ) : (
          displayedOptions.map(({ text, value, disabled }) => {
            return (
              <MenuItem value={value} key={value} disabled={disabled}>
                {disabled ? <em>{text || value}</em> : text || value}
              </MenuItem>
            );
          })
        )}
      </Select>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  );
}
