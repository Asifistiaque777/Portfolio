// src/lib/firestoreActions.js
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc,
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

// 🆕 প্রজেক্ট ডিলিট করার ফাংশন
export async function deleteProject(id) {
  try {
    const docRef = doc(db, "projects", id);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error("deleteProject error:", err);
    throw err;
  }
}

// 🆕 প্রজেক্ট আপডেট/এডিট করার ফাংশন
export async function updateProject(id, updatedData) {
  try {
    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, updatedData);
    return true;
  } catch (err) {
    console.error("updateProject error:", err);
    throw err;
  }
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

// 🛠️ ইমেজ URL রিসিভ এবং সেভ করার জন্য এই ফাংশনটি আপডেট করা হয়েছে
export async function addCertificate({ title, issuer, issueDate, credentialUrl, badgeIcon, image }) {
  const docRef = await addDoc(collection(db, "certificates"), {
    title,
    issuer,
    issueDate,
    credentialUrl: credentialUrl || "",
    badgeIcon: badgeIcon || "Award",
    image: image || "", // 🆕 ডেটাবেজে সার্টিফিকেটের ছবির লিংক সেভ হবে
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

// 🆕 সার্টিফিকেট ডিলিট করার ফাংশন
export async function deleteCertificate(id) {
  try {
    const docRef = doc(db, "certificates", id);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error("deleteCertificate error:", err);
    throw err;
  }
}

// 🆕 সার্টিফিকেট আপডেট/এডিট করার ফাংশন
export async function updateCertificate(id, updatedData) {
  try {
    const docRef = doc(db, "certificates", id);
    await updateDoc(docRef, updatedData);
    return true;
  } catch (err) {
    console.error("updateCertificate error:", err);
    throw err;
  }
}