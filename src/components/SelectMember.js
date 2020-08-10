import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects({setEmployee}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

//   const handleChange = (event) => {
//     const name = event.target.name;
//     setState({
//       ...state,
//       [name]: event.target.value,
//     });
//   };

  return (
    <div>
      
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="filled-age-native-simple">Name</InputLabel>
        <Select
          native
        //   value={state.age}
        //   onChange={handleChange}
          onChange = {(e) => setEmployee(e.target.value)}
          label="Age"
          inputProps={{
            name: 'age',
            id: 'filled-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value="Albert Einstein" >Albert Einstein</option>
          <option value="Max Plank" >Max Plank</option>
          <option value="Werner Heisenber" >Werner Heisenberg</option>
          <option value="Niels Bohr" >Niels Bohr</option>
          <option value="Enrico Fermi" >Enrico Fermi</option>
          <option value="James Maxwell" >James Maxwell</option>

        </Select>
      </FormControl>
      
    </div>
  );
}