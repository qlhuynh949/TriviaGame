let trivia = {}

const getCategories = () => {
  fetch(`https://opentdb.com/api_category.php`)
    .then(r => r.json())
    .then((response) => {
      //let myDiv = getElementById('categories')
      console.log(response)
      // trivia_categories.forEach(e)=>
      // {

      //   console.log(e.id, e.name)
      // }       
    })
    .catch(e => console.error(e))
}

getCategories()