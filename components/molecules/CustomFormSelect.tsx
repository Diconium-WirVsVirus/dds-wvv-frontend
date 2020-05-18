import { FormControl, InputLabel, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  label: {
    transform: "translate(0, -15px) scale(0.75)!important",
  },
}));

export default (props) => {
  const classes = useStyles();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    name,
    placeholder,
    children,
    type,
    multiline,
    label,
    required = false,
  } = props;

  return (
    <FormControl fullWidth={true} required={required} variant="outlined">
      <InputLabel
        htmlFor={name}
        variant="outlined"
        className={classes.label}
        shrink={true}
      >
        {label}
      </InputLabel>
      <Select
        id={name}
        name={name}
        type={type || "text"}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched[name] && Boolean(errors[name])}
        autoFocus={true}
        placeholder={placeholder}
        multiline={multiline || false}
      >
        {children}
      </Select>
    </FormControl>
  );
};
