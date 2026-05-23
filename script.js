async function sendMessage(){

    const message =
    document.getElementById("message").value;

    const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json",

                "Authorization":
                "Bearer AIzaSyAzM8ICIRWZ0VOduj-ppYqrPm1jMy6WdTQ"
            },

            body:JSON.stringify({
                model:"gpt-4o-mini",

                messages:[
                    {
                        role:"user",
                        content:message
                    }
                ]
            })
        }
    );

    const data = await response.json();

    const reply =
    data.choices[0].message.content;

    document.getElementById("reply")
    .innerText = reply;

    speak(reply);
}

function speak(text){

    const speech =
    new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";

    speechSynthesis.speak(speech);
}

function startVoice(){

    const recognition =
    new webkitSpeechRecognition();

    recognition.start();

    recognition.onresult = function(event){

        const voiceText =
        event.results[0][0].transcript;

        document.getElementById("message")
        .value = voiceText;
    };
}
