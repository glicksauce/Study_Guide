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


        
        
        let guideID = $("#finish-guide").attr("guideid")
        var data = $('form').serialize();

        //posts question then redirects
        if ( $('#correct-answer').val() != ""){
            $.ajax({
                type: "POST",
                url: "/studyguide/"+guideID+"/newquestion/?_method=PUT",
                data: data,
            }).then(
                window.location.href = '/'
            )
        } else {
            window.location.href = '/'
            console.log("empty")
        }
        
        
    })


})