// js/stories.js
import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const storiesContainer = document.getElementById("storiesContainer");
const branchFilter = document.getElementById("branchFilter");
const roleFilter = document.getElementById("roleFilter");

let allStories = [];

// Fetch stories from Firestore
async function fetchStories() {
  try {
    const q = query(collection(db, "stories"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    allStories = querySnapshot.docs.map(doc => doc.data());

    console.log("Fetched Stories:", allStories);
    renderStories(allStories);
  } catch (error) {
    console.error("Error fetching stories:", error);
    storiesContainer.innerHTML = `<p style="color:red;">⚠️ Failed to load stories. Try again later.</p>`;
  }
}

function renderStories(stories) {
  storiesContainer.innerHTML = "";
  if (stories.length === 0) {
    storiesContainer.innerHTML = "<p style='color:gray;'>No stories found.</p>";
    return;
  }

  stories.forEach(story => {
    const div = document.createElement("div");
    div.className = "story-card";
    div.innerHTML = `
      <h3>${story.name} - ${story.branch}</h3>
      <p><strong>Year:</strong> ${story.year}</p>
      <p><strong>Company:</strong> ${story.company}</p>
      <p><strong>Role Type:</strong> ${story.roleType}</p>
      <p><strong>Story:</strong> ${story.story}</p>
      <p><strong>Platforms Used:</strong> ${Array.isArray(story.platforms) ? story.platforms.join(", ") : story.platforms}</p>
    `;
    storiesContainer.appendChild(div);
  });
}

function applyFilters() {
  const branch = branchFilter.value;
  const role = roleFilter.value;

  const filtered = allStories.filter(s =>
    (branch === "" || s.branch === branch) &&
    (role === "" || s.roleType === role)
  );

  renderStories(filtered);
}

branchFilter.addEventListener("change", applyFilters);
roleFilter.addEventListener("change", applyFilters);

window.fetchStories = fetchStories; // optional manual trigger
fetchStories(); // load on page load