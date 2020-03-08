$(()=>{


    $('.quiz-question').hide()
    console.log("running")
    let randomOrderArray = []
    let quizProgress = 0
    let currentQuestion

const checkAnswers = () =>{
    $('.answer').on("click",(event)=>{
        event.stopPropagation()
        let questionClicked = event.target.id.substring(12)
        let correctAnswer = $(event.target).siblings(".correct-answer").text()
        console.log("clicked: " + questionClicked + "correct answer " + correctAnswer)
        //console.log($(event.target).siblings(".correct-answer").text())

        //create answer reveal div but keep it hidden for now:
        $answerCheck = $('<div>').text("").addClass("answer-reveal")
        $('.answer-section').append($answerCheck)

        if (questionClicked == correctAnswer) {
            $('.answer-reveal').text("Correct")
        } else {
            $('.answer-reveal').text("Incorrect")
        }
       


    })
}

const endQuiz = () =>{
    console.log("quiz is over")
    $quizResults = $('<div>').text("The quiz is over. You scored: ")
    $('.question-length').append($quizResults)
}

const presentQuestion = (num) =>{ 
    //if all the questions asked end quiz else show next question
    console.log("showing question " + num)
    if (quizProgress >= randomOrderArray.length || num == 'undefined') {
        console.log("ending quiz now")
        endQuiz()
    } else {
        
        $('#' + num).show()
        
        currentQuestion = num
        quizProgress++
    }
}


const presentQuiz = () =>{
    //hide take quiz button
    $('#take-quiz').hide()

    checkAnswers()

    let questionCount = $('.quiz-question').length;
    
    for (i=0; i<questionCount;i++){
        randomOrderArray.push(i)
    }

    const shuffle = (arr) =>{
        arr.sort(() => Math.random() -.5)
    }

    shuffle(randomOrderArray)
    console.log(randomOrderArray)
    console.log(randomOrderArray[0])
    presentQuestion(randomOrderArray[quizProgress])

    /*
    console.log(questionCount, "questions remaining")
    let randomQuestion = Math.floor(Math.random() * questionCount)
    console.log(randomQuestion)

        $newQuestion = $('<div>').text("Question " + i)
        $('body').append($newQuestion)
    */
}

$('.next-button').on('click', (event) =>{
    //hide current question
    $('#' + currentQuestion).hide()
    //remove current answer reveal
    $(".answer-reveal").remove()
    //trigger next question
    presentQuestion(randomOrderArray[quizProgress])
})


 $('#take-quiz').on('click', (event)=>{
     console.log("begin the exam")
     presentQuiz()
 })




})