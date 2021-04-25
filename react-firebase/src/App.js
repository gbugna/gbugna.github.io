import React from "react";
import "./App.css";
import "./firebase";
import ReactDom from "react-dom";
import { BrowserRouter, Router, Route, Switch, Link } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import ButtonNewRecipe from "./components/ButtonNew";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Link to="/recipe-form">
            <ButtonNewRecipe />
          </Link>
          <Switch>
            <Route exact path="/" component={RecipeList} />
            <Route path="/recipe-form/:id" component={RecipeForm} />
            <Route path="/recipe-form/" component={RecipeForm} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
