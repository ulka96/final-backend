import mongoose from "mongoose";

const FaqSchema = mongoose.Schema({
    question: {
        type: String
    },
    answer: {
        type: String
    }
})

const FaqModel = mongoose.model("Faq", FaqSchema)

export default FaqModel