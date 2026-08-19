// ==============================
// INTERACTIVE QUIZ
// ==============================

const questions = [
    {
        question: "Which language is used to structure a webpage?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: "HTML"
    },
    {
        question: "Which language is used for styling webpages?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "CSS"
    },
    {
        question: "Which language adds interactivity to webpages?",
        options: ["HTML", "CSS", "JavaScript", "XML"],
        answer: "JavaScript"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("quizResult");
const nextButton = document.getElementById("nextButton");

function showQuestion() {
    const question = questions[currentQuestion];

    questionElement.textContent = question.question;
    optionsElement.innerHTML = "";
    resultElement.textContent = "";

    question.options.forEach(function (option) {

        const button = document.createElement("button");

        button.textContent = option;
        button.className = "option-button";

        button.addEventListener("click", function () {
            checkAnswer(button, option);
        });

        optionsElement.appendChild(button);
    });
}

function checkAnswer(button, selectedAnswer) {

    const correctAnswer = questions[currentQuestion].answer;

    const allButtons = document.querySelectorAll(".option-button");

    allButtons.forEach(function (btn) {
        btn.disabled = true;
    });

    if (selectedAnswer === correctAnswer) {
        button.classList.add("correct");
        resultElement.textContent = "Correct! 🎉";
        resultElement.style.color = "green";
        score++;
    } else {
        button.classList.add("wrong");
        resultElement.textContent =
            "Wrong! Correct answer: " + correctAnswer;
        resultElement.style.color = "red";
    }
}

nextButton.addEventListener("click", function () {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;
        showQuestion();

    } else {

        questionElement.textContent =
            "Quiz Completed! 🎉";

        optionsElement.innerHTML = "";

        resultElement.textContent =
            "Your Score: " + score + " / " + questions.length;

        nextButton.textContent = "Restart Quiz";

        nextButton.onclick = function () {
            currentQuestion = 0;
            score = 0;
            nextButton.textContent = "Next Question";
            showQuestion();
        };
    }
});

showQuestion();


// ==============================
// WEATHER API
// ==============================

const cityInput = document.getElementById("cityInput");
const weatherButton = document.getElementById("weatherButton");
const weatherResult = document.getElementById("weatherResult");

weatherButton.addEventListener("click", getWeather);

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        weatherResult.textContent = "Please enter a city name.";
        return;
    }

    weatherResult.textContent = "Loading weather information...";

    try {

        // Get coordinates using Open-Meteo Geocoding API
        const geoResponse = await fetch(
            "https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(city) +
            "&count=1&language=en&format=json"
        );

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            weatherResult.textContent = "City not found.";
            return;
        }

        const location = geoData.results[0];

        // Get weather using coordinates
        const weatherResponse = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=" +
            location.latitude +
            "&longitude=" +
            location.longitude +
            "&current=temperature_2m,wind_speed_10m"
        );

        const weatherData = await weatherResponse.json();

        weatherResult.innerHTML = `
            <p><strong>City:</strong> ${location.name}</p>
            <p><strong>Temperature:</strong> ${weatherData.current.temperature_2m}°C</p>
            <p><strong>Wind Speed:</strong> ${weatherData.current.wind_speed_10m} km/h</p>
        `;

    } catch (error) {

        weatherResult.textContent =
            "Unable to fetch weather data. Please try again.";

        console.error(error);
    }
}