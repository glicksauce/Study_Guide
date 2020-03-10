$(()=>{
    console.log("up and running")

    //if question is already populated goes into edit mode
    console.log($('#question-input').val())
    if ($('#question-input').val() != "undefined"){
            console.log("something")      
    }


    //submits question to db
    $('#addquestion').submit(function(){
            $.ajax({
                type: "PUT",
                url: "/studyguide/<%=guides.id%>/newquestion?_method=PUT"
            })
        
    })

    //if correct answers is populated, subits answer then goes to index otherwise right to index
    $('#finish-guide').on('click', (event)=>{

        console.log($('#correct-answer').val())
        
        /*
        if ( $('#correct-answer').val() != ""){
            $.ajax({
                type: "POST",
                url: "/studyguide/<%=guides.id%>/newquestion?_method=PUT"
            })
        } else {
            window.location.href = '/'
            console.log("empty")
        }
        */
        
    })


})