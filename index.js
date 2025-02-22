const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://FlaPes85:hello123@cluster0.qybby.mongodb.net/recipe-app?retryWrites=true&w=majority';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  //iteraçao 2
  .then(() => {   
    const receita = {
      title: 'Carrot Cake',
      level: 'Easy Peasy',
      ingredients: ['Passo 1', 'Passo 2', 'Passo 3'],
      cuisine: 'Brasileira',
      dishType: 'snack',
      duration: 30,
      creator: 'Flavio',
    }
    
    return Recipe.create(receita) 
    .then((result) =>{
      console.log(result.title)    
    }) 
    .catch(error => {
      console.error('Erro na criação da receita', error)
    });  
  })

  //iteraçao 3
  .then(() =>{
    return Recipe.insertMany(data)
    .then((result) => {
      result.forEach(element => {
        console.log(element.title)        
      });      
    })    
  }) 
  //iteraçao 4
.then(() => {

})
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
