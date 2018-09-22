
//on start up only the start button is visible
function startup() {
    $(".gameQuestions").css("display", "none");
    $("#results").css("display", "none");
    $(".gameStart").css("display", "block");
    correct = 0;
    incorrect = 0;
    timer = 60;
}

//clicking the start button
$("#start").on("click", function () {
    $(".gameStart").css("display", "none");
    $("#results").css("display", "none");
    $(".gameQuestions").css("display", "block");
    $("#timer").html("<h5 class=card-title > Time Left: " + timer + " Seconds </h5>");
    run();
    displayQuiz();

})

correct = 0;
incorrect = 0;
timer = 60;
unanswered = 0;

var questions =
    [
        {
            question: "What is the state sport?",
            choices: ["Lacrosse", "Jousting", "Fishing", "Field Hockey"],
            answer: 1
        },
        {
            question: "What is the state flower?",
            choices: ["Sun Flower", "Daisy", "Rose", "Black-eyed Susan"],
            answer: 3
        },
        {
            question: "Where in Maryland was the 'Star Spangled Banner' Written?",
            choices: ["Baltimore", "Annapolis", "Gaithersburg", "Cumberland"],
            answer: 0
        },
        {
            question: "What is the capital?",
            choices: ["Baltimore", "Annapolis", "Washington D.C", "St. Mary's City"],
            answer: 1
        },
        {
            question: "What is the state fish?",
            choices: ["Trout", "Spotted Fish", "Striped Bass", "Catfish"],
            answer: 2
        },


    ];




function displayQuiz() {
    var quiz = $("#quiz");

    for (var i = 0; i < questions.length; i++) {
        var questionContainer = document.createElement("DIV");
        var questionClass = (questions.indexOf(questions[i]));
        questionContainer.setAttribute("class", questionClass);

        //add questions to div 
        questionContainer.innerHTML += ("<div class=title>" + questions[i].question + "</div>");

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
    $("#timer").html("<h5 class=card-title> Time Left: " + timer + " Seconds </h5>");
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

    for (i = 0; i < 5; i++) {
        //if returns undefined then a question is missed/not answered.
        if ($("input[name=" + i + "]:checked").val() === undefined) {
            unanswered++;
        } else if ($("input[name=" + i + "]:checked").attr("id") == questions[i].answer) {
            correct++;
        } else {
            incorrect++;
            console.log($("input[name=" + i + "]:checked").attr("id"));
        }
    };
};

//show results on screen
function results() {
    $(".gameQuestions").css("display", "none");
    $("#results").css("display", "block");
    $("#results").html("<h5 class=card-title> All Done!</h5> <br> Correct Answers: " + correct + "<br> Incorrect Answers: " + incorrect + "<br> Unanswered: " + unanswered + "<br><br> <button onClick=window.location.reload() class = button> Restart Quiz </button>");
}

startup();


