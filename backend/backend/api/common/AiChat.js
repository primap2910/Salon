const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const AiChat = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).send({
                success: false,
                message: "Message is required"
            });
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const prompt = `
        You are a helpful Salon Assistant.
        Answer the customer's questions about hair and beauty services.
        Reply in the same language the customer uses (Gujarati, Hindi, or English).
        Keep answers helpful and professional.
        Customer question: ${message}
        `;
        
        const result = await model.generateContent(prompt);
        const response = result.response.text();

        return res.status(200).send({
            success: true,
            message: response
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

module.exports = { AiChat };