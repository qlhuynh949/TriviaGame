let trivia = {}

const getCategories = () => {
  fetch(`https://opentdb.com/api_category.php`)
    .then(r => r.json())
    .then((response) => {
      
      console.log(response)
      let category = document.getElementById('category-dropdown')
      let { trivia_categories: categoryArray } = response
      categoryArray.forEach((e) => {
        let button = document.createElement('a')
        button.className = 'dropdown-item'
        button.text = e.name
        button.id = e.id
        button.href='#'
        button.value = e.id
        category.append(button)
        console.log(button)
      })

      console.log(category)

    })
    .catch(e => console.error(e))
}

getCategories()