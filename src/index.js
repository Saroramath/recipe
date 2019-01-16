import React from 'react';
import ReactDOM from 'react-dom';

const DirectoryView = (props) => (
    <div className="col">
        <SearchForm
            handleSearchInput={props.handleSearchInput}
            searchVal={props.searchVal}
            selectRecipes={props.selectRecipes}
        />
        {props.recipes.map(e => <RecipeCard handleRecipeChange={props.handleRecipeChange} name={e.name} id={e.id} key={e.id} />)}
    </div>
);

const SearchForm = (props) => (
    <div className="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search for a recipe" value={props.searchVal} onChange={props.handleSearchInput} />
        <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={props.selectRecipes}>Search</button>
        </div>
    </div>
);

const RecipeCard = (props) => (
    <div>
        <div className="card mb-2">
            <div className="card-body">
                <h5 className="card-title" onClick={() => props.handleRecipeChange(props.id)}>{props.name}</h5>
            </div>
        </div>
    </div>
);

const DetailView = (props) => (
    <div className="col">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.selectedRecipe.name}</h5>
                <div className="row">
                    <div className="col">
                        <strong>INGREDIENTS</strong>
                        <ul>
                            {props.selectedRecipe.ingredients.map((e, i) => <li key={i}>{e}</li>)}
                        </ul>
                    </div>
                    <div className="col">
                        <strong>INSTRUCTIONS</strong>
                        <ul>
                            {props.selectedRecipe.instructions.map((e, i) => <li key={i}>{e}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

class App extends React.Component {
    state = {
        recipes: [
            {
                id: 1,
                name: 'Turkey Mayhem',
                ingredients: ['Turkey', 'Mustard', 'Greens', 'Celery', 'Potato'],
                instructions: ['Pre-heat over to 350 degrees', 'Tickle the turkey', 'Cut some celery']
            },
            {
                id: 2,
                name: 'Mac and Cheese',
                ingredients: ['Mac', 'Cheese'],
                instructions: ['Put the mac in the cheese', 'Swish it around', 'Bake for 15 minutes at 350 degrees']
            },
            {
                id: 3,
                name: 'Spanakopita',
                ingredients: ['Olive oil', 'Onion', 'Garlic', 'Spinach'],
                instructions: ['Put the stuff in a bowl', 'Cook the stuff']
            },
            {
                id: 4,
                name: 'Vasilopita',
                ingredients: ['Flower', 'Baking Soda', 'Butter', 'Sugar', 'Eggs'],
                instructions: ['Throw everything in the air and hope it comes together', 'Knead the bread', 'Show the bread some love', 'Bake it at 400 degrees']
            }
        ],
        searchVal: '',
        selectedRecipes: [],
        selectedRecipe: ''
    }

    handleSearchInput = (event) => {
        this.setState({ searchVal: event.target.value })
    }

    selectRecipes = (event) => {
        event.preventDefault();
        const selectedRecipes = this.state.recipes.filter(e => e.name.toLowerCase().includes(this.state.searchVal.toLowerCase()));
        this.setState({ selectedRecipes: selectedRecipes });
    }

    handleRecipeChange = (id) => {
        const selectedRecipe = this.state.recipes.filter(e => e.id === id);
        this.setState({ selectedRecipe: selectedRecipe[0] });
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-primary">
                    <span className="navbar-brand mb-0 h1">RecipeApp</span>
                </nav>
                <div className="container mt-5">

                    <div className="row">
                        <DirectoryView
                            recipes={this.state.selectedRecipes}
                            searchVal={this.state.searchVal}
                            handleSearchInput={this.handleSearchInput}
                            selectRecipes={this.selectRecipes}
                            handleRecipeChange={this.handleRecipeChange}
                        />
                        {this.state.selectedRecipe ? <DetailView
                            selectedRecipe={this.state.selectedRecipe}
                        /> : ''}
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));