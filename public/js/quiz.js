$(()=>{

    //Hide all questions before starting
    $('.quiz-question').hide()

    //global variables
    let randomOrderArray = []
    let quizProgress = 0
    let currentQuestion = 0;
    let correctAnswerCount = 0;

    const showAnswers = (guessAnswer,correctAnswer, questionNumber, sequenceNumber) =>{
        //create answer reveal div but keep it hidden for now:
        $answerCheck = $('<div>').text("").addClass("answer-reveal")
        $('.answer-section').append($answerCheck)

        //checks if the correct answer was clicked
        if (guessAnswer == correctAnswer) {
            $('.answer-reveal').text("Correct")
                correctAnswerCount++
        } else {
            $('.answer-reveal').text("Incorrect")
        }
        
        //remove click listener so question can't be answered again:
        $(event.target).siblings().unbind("click")
        $(event.target).unbind("click")

        //highlight correct answer
        let hightlightID = "#set" + currentQuestion + "-answer-" + correctAnswer
        //console.log("current question check", questionNumber, currentQuestion)
        $(hightlightID).css("background", "green")
        console.log(hightlightID)
    }

    const answerEventListener = (currentQuestion) =>{
        //'.answer' are the available answers. Setup the event listener
        //$('.answer').on("click",(event)=>{
        $('.question:visible').children().on("click",(event)=>{
            event.stopPropagation()

            //gets last digit of id of clicked answer.
            let questionClicked = event.target.id.substring(12)

            //correct answer is stored in DOM as sibling to to the available answers
            let correctAnswer = $(event.target).siblings(".correct-answer").text()

            console.log("clicked: " + questionClicked + "correct answer " + correctAnswer)

            showAnswers(questionClicked, correctAnswer, randomOrderArray[currentQuestion], currentQuestion)
        
        })
    }

    const endQuiz = () =>{
        console.log("quiz is over")

        //move decimal over 2 spaces too many than floor the number then move it back
        let quizScore = Math.floor((correctAnswerCount/randomOrderArray.length) * 10000)
        quizScore = quizScore / 100
        $quizResults = $('<div>').text("The quiz is over. You scored: " + correctAnswerCount + " out of " + randomOrderArray.length + ", " + quizScore + "%")
        $('.question-length').append($quizResults)
    }

        
    const presentQuestion = (questionNumber, sequenceNumber) =>{ 
        //if all the questions asked end quiz else show next question
        if (quizProgress >= randomOrderArray.length || questionNumber == 'undefined') {
            console.log("ending quiz now")
            endQuiz()
        //otherwise show question# numb
        } else {
            
            $('#' + questionNumber).show()
            
            //track which question we are on
            currentQuestion = questionNumber
            console.log("current question", currentQuestion)

            //setup event listeners on potential answers
            answerEventListener(currentQuestion)

            //increment quiz progress. quizprogress indicates the number of questions completed
            quizProgress++
        }
    }

    //prepare to take quiz
    const presentQuiz = () =>{
        //hide take quiz button
        $('.quiz-button-options').hide()

        let questionCount = $('.quiz-question').length;
        
        //reset highlighting on all questions
        $('.answer').css("background", '')

        //create array to present questions in random order
        for (i=0; i<questionCount;i++){
            randomOrderArray.push(i)
        }

        
        const shuffle = (arr) =>{
            arr.sort(() => Math.random() -.5)
        }

        //array is now shuffled
        shuffle(randomOrderArray)

        //questions will be presented in this order
        console.log(randomOrderArray)

        
        //setup event listeners on potential answers
        //answerEventListener()

        //present queestion (starting with question 0)
        presentQuestion(randomOrderArray[quizProgress], quizProgress)

        //show quiz status box
        $quizStatus = $('<div>').text("Question 1 of " + questionCount).addClass("quiz-status")
        $('.quiz-title').append($quizStatus)        
    }

    //event listener for 'next question' button
    $('.next-button').on('click', (event) =>{
        //hide current question
        $('#' + currentQuestion).hide()
        //remove current answer reveal
        $(".answer-reveal").remove()
        //trigger next question
        presentQuestion(randomOrderArray[quizProgress], quizProgress)
        //update quiz progress
        $('.quiz-status').text("Question " + quizProgress + " of " + randomOrderArray.length)
    })

    //triggers the quiz to begin
    $('#take-quiz').on('click', (event)=>{
        console.log("begin the exam")
        presentQuiz()
    })



})