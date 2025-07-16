// js/resources.js
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const form = document.getElementById("resourceForm");
const msg = document.getElementById("resourceMsg");
const list = document.getElementById("resourceList");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const topic = document.getElementById("topic").value;
  const url = document.getElementById("url").value;
  const type = document.getElementById("type").value;
  const addedBy = document.getElementById("addedBy").value;

  try {
    await addDoc(collection(db, "resources"), {
      title, topic, url, type, addedBy,
      timestamp: serverTimestamp()
    });

    msg.textContent = "✅ Resource added!";
    form.reset();
    fetchResources();
  } catch (err) {
    msg.textContent = "❌ Failed to submit.";
    console.error(err);
  }
});

async function fetchResources() {
  list.innerHTML = "⏳ Loading...";
  const q = query(collection(db, "resources"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  let html = "";

  snapshot.forEach(doc => {
    const res = doc.data();
    html += `
      <div class="resource-card">
        <h3>${res.title}</h3>
        <p><strong>Topic:</strong> ${res.topic}</p>
        <p><strong>Type:</strong> ${res.type}</p>
        <p><strong>Shared by:</strong> ${res.addedBy}</p>
        <a href="${res.url}" target="_blank">🔗 Visit Resource</a>
        <hr>
      </div>
    `;
  });

  list.innerHTML = html || "<p>No resources yet.</p>";
}

fetchResources();