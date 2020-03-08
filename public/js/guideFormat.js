$(()=>{
    console.log("up and running")
    let formattedAnswers = []

const answersBlur = () => {
    let test = $('#answers').val()
    
    //console.log(test, test.length, test[1])
    let splitAnswers = $('#answers').val().split("\n")
    
    for (i=0; i<splitAnswers.length; i++){
        formattedAnswers.push(
            {[i]: splitAnswers[i]}
        )
    }
    console.log(splitAnswers, formattedAnswers)
    //$('#answers').val(formattedAnswers)
}


$('#answers').val("test")
   // let answersGet = $('#answers').innerHTML
    //console.log(answersGet)
//$('#answers').on("blur", answersBlur)


$('#addquestion').submit(function(){
        $.ajax({
            type: "PUT",
            url: "/studyguide/<%=guides.id%>/newquestion"
        })
    
})



})