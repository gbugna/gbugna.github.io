import React, { useEffect, useState } from 'react';
import { BrowserRouter, Router, Route, Switch, Link } from 'react-router-dom';
import RecipeForm from './RecipeForm';
import Salty from './img/salty.jpg';
import Sweet from './img/sweet.jpg';
import { db } from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const RecipeList = () => {
  const [list, setList] = useState([]);
  const [currentId, setCurrentId] = useState('');

  const deleteRecipe = async id => {
    if (window.confirm('¿Seguro desea eliminar esta receta?'))
      await db.collection('recipeList').doc(id).delete();
    getRecipeList();
  };

  const getRecipeList = async () => {
    const querySnapshot = await db.collection('recipeList').get();
    const docs = [];
    querySnapshot.forEach(doc => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setList(docs);
    console.log(docs);
  };

  useEffect(() => {
    getRecipeList();
  }, []);

  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },

    spacing: {
      margin: 20,
    },

    alignJustifyContent: {
      display: 'flex',
      alignItems: 'end',
      justifyContent: 'flex-end',
      backgroundColor: 'lightGrey',
    },
  });

  const classes = useStyles();

  return list.map(list => (
    <div>
      <Container maxWidth="md">
        <Grid
          xs={12}
          spacing={2}
          direction="column"
          justify="flex-end"
          alignItems="stretch"
        >
          <Card key={list.id} className={`${classes.root} ${classes.spacing}`}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={list.category === 'Salado' ? Salty : Sweet}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {list.recipeName}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.alignJustifyContent}>
              <Link to={`/recipe-form/${list.id}`}>
                <IconButton
                  variant="contained"
                  color="default"
                  onClick={() => setCurrentId(list.id)}
                >
                  <EditIcon />
                </IconButton>
              </Link>
              <IconButton
                variant="contained"
                color="secondary"
                onClick={() => deleteRecipe(list.id)}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      </Container>
    </div>
  ));
};

export default RecipeList;
