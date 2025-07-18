import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "./firebase";


type MemoryItem = {
  id: string;
  title: string;
  quote: string;
  createdAt: Timestamp;
};
export async function getQuotePosts() {
  const q = query(collection(db, "quoteBag"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  const data: MemoryItem[] = snapshot.docs.map(doc => {
    return {
        id: doc.id,
        title: doc.data().title,
        quote: doc.data().quote,
        createdAt: doc.data().createdAt,
    }
  });
   return data;
}
