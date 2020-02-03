fetch('https://opentdb.com/api_category.php')
  .then(r => r.json())
  .then(({
    trivia_categories,

  }) => {
    document.getElementById('movie').innerHTML = `
  <img src="${Poster}" alt="${Title}">
  <h1>${Title}</h1>
  <h2>${Director}</h2>
  <h3>${Year}</h3>
  <p>${Plot}</p>
  `
    console.log(Title)