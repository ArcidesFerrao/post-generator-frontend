import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import { summarizeQuote } from "./generate";

export async function saveQuote(quote: string, prompt: string) {
    try {
        const title = await summarizeQuote(quote);
        await addDoc(collection(db, "quoteBag"), {
            quote,
            title,
            prompt,
            createdAt: Timestamp.now(),
        });
    } catch (err) {
        console.error("Error saving quote: ", err);
    }
}
