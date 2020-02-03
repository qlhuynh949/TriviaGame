let trivia = []
let score = 0
let categoryId = 0

const getQuestions = (id) => {
  fetch(`https://opentdb.com/api.php?amount=10&category=${id}&type=multiple`)
    .then(r => r.json())
    .then((response) => {

      let questionResults = document.getElementById('questionResults')
      questionResults.innerHTML = ""
      let { results: resultArray } = response
      let card = document.createElement('div')
      card.className = "card"
      resultArray.forEach((question) => {

        let cardBody = document.createElement('div')
        cardBody.className = "card-body"
        let cardTitle = document.createElement('h4')
        cardTitle.class = "card-title"
        cardTitle.innerHTML = question.question
        let choice = []
        choice.push(question.correct_answer)
        let currentTriviaLength = trivia.length
        let questionAnswer = { question: question.question, answer: question.correct_answer }
        trivia.push(questionAnswer)
        let { incorrect_answers: wrongAnswer } = question
        wrongAnswer.forEach((wrongChoice) => {
          choice.push(wrongChoice)
        })
        let tempChoice = choice.slice(0, choice.length)
        card.append(cardBody)
        card.append(cardTitle)
        for (let i = 0; i < choice.length; i++) {
          let rand = Math.floor(Math.random() * tempChoice.length)
          let randElement = tempChoice[rand]
          let newButton = document.createElement('button')
          newButton.id = currentTriviaLength + '-' + i
          newButton.classList.add('choiceButton')
          newButton.innerHTML = randElement
          card.append(newButton)
          let newLine = document.createElement('br')
          card.append(newLine)
          tempChoice.splice(rand, 1)
        }


        let horizontalRule = document.createElement('hr')
        card.append(horizontalRule)
      })
      questionResults.append(card)
      let finishButton = document.createElement('button')
      finishButton.classList.add('btn')
      finishButton.classList.add('btn-success')
      finishButton.classList.add('finishButton')
      finishButton.id = "finishQuestions"
      finishButton.dataset.toggle = "modal"
      finishButton.dataset.target = "finishModal"
      finishButton.innerHTML = "<h3>Finish</h3>"
      questionResults.append(finishButton)
    })
    .catch(e => console.error(e))

}


const beginTrivia = () => {
  getQuestions(categoryId)
}

const getCategories = () => {
  fetch(`https://opentdb.com/api_category.php`)
    .then(r => r.json())
    .then((response) => {

      let category = document.getElementById('category-dropdown')

      let { trivia_categories: categoryArray } = response
      categoryArray.forEach((e) => {
        let button = document.createElement('a')
        button.className = 'dropdown-item'
        button.text = e.name
        button.id = e.id
        button.href = '#'
        button.value = e.id
        category.append(button)
      })

    })
    .catch(e => console.error(e))
}


getCategories()

document.addEventListener('click', event => {
  event.preventDefault()
  if (event.target.className === 'dropdown-item') {
    categoryId = event.target.id
    let categoryLabel = document.getElementById('dropdownMenuButton')
    categoryLabel.textContent = event.target.text
    getCategories()

  }
  if (event.target.classList.contains('choiceButton')) {
    let choiceItem = event.target.id
    let triviaArray = choiceItem.split('-')
    let questionIndex = triviaArray[0]
    let questionAnswerItem = trivia[questionIndex]
    event.target.classList.add('btn-primary')
    if (questionAnswerItem.answer === event.target.innerHTML) {
      score++
    }
  }
  if (event.target.textContent === 'Finish') {
    {
      let messageDiv = document.getElementById('finishResults')
      let message = `You got ${score} out of 10.`
      messageDiv.textContent = message
      $('#finishModal').modal('show');
      console.log(message)
    }
  }

})

document.getElementById('beginTrivia').addEventListener('click', () => {
  beginTrivia()

})

