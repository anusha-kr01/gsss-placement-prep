// js/submit.js
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const form = document.getElementById("storyForm");
const msg = document.getElementById("submitMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const branch = document.getElementById("branch").value;
  const year = document.getElementById("year").value;
  const company = document.getElementById("company").value;
  const roleType = document.getElementById("roleType").value;
  const story = document.getElementById("story").value;
  const platforms = document.getElementById("platforms").value;

  try {
    await addDoc(collection(db, "stories"), {
      name,
      branch,
      year,
      company,
      roleType,
      story,
      platforms,
      timestamp: serverTimestamp()
    });

    msg.textContent = "✅ Story submitted!";
    form.reset();
  } catch (err) {
    msg.textContent = "❌ Failed to submit.";
    console.error("Firestore submission error:", err);
  }
});