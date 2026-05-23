const API_KEY = "AIzaSyCjeT5u8YdGfK-0xvIQajVS1PShqAmvkhI";

async function generateResponse(userMessage) {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: userMessage,
                                },
                            ],
                        },
                    ],
                }),
            }
        );

        const data = await response.json();
        console.log(data);

        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else {
            return "No response from AI";
        }
    } catch (error) {
        console.error(error);
        return "Error generating response";
    }
}
