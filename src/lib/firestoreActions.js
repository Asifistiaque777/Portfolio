// src/lib/firestoreActions.js
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "./firebase";

/* ---------------- PROJECTS ---------------- */

export async function getProjects() {
  try {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("getProjects error:", err);
    return [];
  }
}

export async function addProject({ title, description, tags, liveLink, githubLink, imageFile }) {
  let imageUrl = "";

  if (imageFile) {
    const storageRef = ref(storage, `projects/${Date.now()}-${imageFile.name}`);
    const uploadSnap = await uploadBytes(storageRef, imageFile);
    imageUrl = await getDownloadURL(uploadSnap.ref);
  }

  const docRef = await addDoc(collection(db, "projects"), {
    title,
    description,
    tags,
    liveLink: liveLink || "",
    githubLink: githubLink || "",
    image: imageUrl,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

// ইমেজ URL সরাসরি দিলে Firebase Storage ছাড়াই সেভ হয়
export async function addProjectWithUrl({ title, description, tags, liveLink, githubLink, image }) {
  const docRef = await addDoc(collection(db, "projects"), {
    title,
    description,
    tags,
    liveLink: liveLink || "",
    githubLink: githubLink || "",
    image: image || "",
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

/* ---------------- CERTIFICATES ---------------- */

export async function getCertificates() {
  try {
    const q = query(collection(db, "certificates"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("getCertificates error:", err);
    return [];
  }
}

export async function addCertificate({ title, issuer, issueDate, credentialUrl, badgeIcon }) {
  const docRef = await addDoc(collection(db, "certificates"), {
    title,
    issuer,
    issueDate,
    credentialUrl: credentialUrl || "",
    badgeIcon: badgeIcon || "Award",
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}