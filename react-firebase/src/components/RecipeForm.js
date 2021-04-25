import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { blue, green } from '@material-ui/core/colors';

const RecipeForm = ({ match }) => {
  const initialStateValues = {
    recipeName: '',
    category: '',
    rating: '',
    method: '',
  };

  const [currentId, setCurrentId] = useState(match.params.id);

  const addEditRecipe = async recipe => {
    if (currentId === '' || !currentId) {
      await db.collection('recipeList').doc().set(recipe);
      console.log('Receta Guardada');
    } else {
      await db.collection('recipeList').doc(currentId).update(recipe);
      setCurrentId('');
    }
  };
  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(addEditRecipe(values));
    setValues({ ...initialStateValues });
  };

  const getRecipeById = async id => {
    const doc = await db.collection('recipeList').doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (currentId === '' || !currentId) {
      setValues({ ...initialStateValues });
    } else {
      getRecipeById(currentId);
    }
  }, [currentId]);

  const useStyles = makeStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: '50%',
      backgroundColor: 'white',
    },

    card: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      backgroundColor: 'green',
      margin: '10px',
    },

    input: {
      backgroundColor: 'white',
    },
  });
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        variant="outlined"
        onSubmit={handleSubmit}
      >
        <TextField
          variant="outlined"
          className={classes.input}
          name="recipeName"
          id="recipeName"
          placeholder="Nombre de la receta"
          onChange={handleInputChange}
          value={values.recipeName}
        />

        <TextField
          variant="outlined"
          className={classes.input}
          name="category"
          id="category"
          placeholder="Categoria"
          onChange={handleInputChange}
          value={values.category}
        />

        <TextField
          variant="outlined"
          type="number"
          className={classes.input}
          min="1"
          max="10"
          name="rating"
          id="rating"
          placeholder="Puntaje"
          onChange={handleInputChange}
          value={values.rating}
        />

        <textarea
          className={classes.input}
          name="method"
          id="method"
          placeholder="Preparacion"
          onChange={handleInputChange}
          value={values.method}
        />

        <Button type="submit" variant="contained" color="primary">
          {match.params.id === '' || !match.params.id ? 'Guardar' : 'Editar'}
        </Button>
      </form>
    </Card>
  );
};

export default RecipeForm;
