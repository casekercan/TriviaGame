
//on start up only the start button is visible
function startup() {
    $(".gameQuestions").css("display", "none");
    $("#results").css("display", "none");
    $(".gameStart").css("display", "block");
    correct = 0;
    incorrect = 0;
    timer = 10;
}

//clicking the start button
$("#start").on("click", function () {
    $(".gameStart").css("display", "none");
    $("#results").css("display", "none");
    $(".gameQuestions").css("display", "block");
    $("#timer").html("<h2> Time Left: " + timer + " Seconds </h2>");
    run();
    displayQuiz();

})

correct = 0;
incorrect = 0;
timer = 10;
unanswered = 0;

var questions =
    [
        {
            question: "What is the capital of United Kingdom?",
            choices: ["Manchester", "Birmingham", "London", "Sacramento"],
            answer: 2
        },

        {
            question: "What is the best state of United States?",
            choices: ["California", "New York", "Miami", "Florida"],
            answer: 1
        }
    ];




function displayQuiz() {
    var quiz = $("#quiz");

    for (var i = 0; i < questions.length; i++) {
        var questionContainer = document.createElement("DIV");
        var questionClass = (questions.indexOf(questions[i]));
        questionContainer.setAttribute("class", questionClass);
        //add questions to div 
        questionContainer.innerHTML += ("<br>" + questions[i].question + "<br>");

        //loop through choices to create radio buttons
        var options = questions[i].choices;
        options.forEach(function (choice) {
            var label = document.createElement("label");
            var theInput = document.createElement('input');
            var id = (options.indexOf(choice));
            label.innerHTML = "<br>" + choice;
            theInput.setAttribute("type", "radio");
            theInput.setAttribute("name", questionClass);
            theInput.setAttribute("id", id);
            questionContainer.append(theInput);
            questionContainer.appendChild(label);
            questionContainer.appendChild(theInput);

        });
        //append radio buttons to screen
        quiz.append(questionContainer);
    }

}
//timer functions
function run() {
    intervalId = setInterval(decrement, 1000);
};

function decrement() {
    if (timer === 0) {
        returnScore();
        results();
    } else {
        timer--;
    }
    $("#timer").html("<h2> Time Left: " + timer + " Seconds </h2>");
};


//clicking submit button
$("#submit").on("click", function (e) {
    e.preventDefault();
    returnScore();
    results();
});

//checking selected buttons for score! 
function returnScore() {
    clearTimeout(intervalId);
    for (i = 0; i < 2; i++) {
        var questionGroup = $("input[name=" + i + "]");
        //if returns undefined then a question is missed/not answered.
        if ($("input[name=" + i + "]:checked").val() === undefined) {
            unanswered++;
        } else {
            checkGroup();
        }
    };
    //if answered it checks to find the clicked button
    function checkGroup() {
        for (z = 0; z < questionGroup.length; z++) {
            if (questionGroup[z].checked) {
                checkAnswer(z);
            }
        }
    };
    //compaires clicked button with answer
    function checkAnswer(z) {
        if (z === questions[i].answer) {
            correct++;
        } else {
            incorrect++;
        }
    };
};

//show results on screen
function results() {
    $(".gameQuestions").css("display", "none");
    $("#results").css("display", "block");
    $("#results").html("<strong>All Done!</strong> <br> Correct Answers: " + correct + "<br> Incorrect Answers: " + incorrect + "<br> Unanswered: " + unanswered + "<br><br> <button onClick=window.location.reload()> Restart Quiz </button>");
}


startup();


