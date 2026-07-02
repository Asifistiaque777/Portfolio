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
  writeBatch, // 🆕 ড্র্যাগ অ্যান্ড ড্রপ ব্যাচ আপডেটের জন্য যুক্ত করা হয়েছে
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "./firebase";

/* ---------------- 🆕 GLOBAL DRAG & DROP ORDER ACTIONS ---------------- */

// ড্র্যাগ অ্যান্ড ড্রপ করে নতুন সিকোয়েন্স বা অর্ডার একসাথে ফায়ারবেসে সেভ করার ফাংশন
export async function updateItemsOrder(collectionName, orderedItems) {
  try {
    const batch = writeBatch(db);
    orderedItems.forEach((item, index) => {
      const docRef = doc(db, collectionName, item.id);
      batch.update(docRef, { order: index }); // ফায়ারবেস ডকুমেন্টে order: 0, 1, 2... আপডেট হবে
    });
    await batch.commit();
    return true;
  } catch (err) {
    console.error("updateItemsOrder error:", err);
    throw err;
  }
}


/* ---------------- PROJECTS ---------------- */

export async function getProjects() {
  try {
    const snap = await getDocs(collection(db, "projects"));
    const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    // 🛠️ 'order' প্রপার্টি অনুযায়ী ক্রমানুসারে সাজানো (order না থাকলে সেটি সবার শেষে যাবে)
    return data.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
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
    order: 999, // 🆕 নতুন প্রজেক্ট শুরুতে যেন লিস্টের শেষে যোগ হয়
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
    order: 999, // 🆕
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

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
    const snap = await getDocs(collection(db, "certificates"));
    const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    // 🛠️ 'order' প্রপার্টি অনুযায়ী ক্রমানুসারে সাজানো
    return data.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  } catch (err) {
    console.error("getCertificates error:", err);
    return [];
  }
}

export async function addCertificate({ title, issuer, issueDate, credentialUrl, badgeIcon, image }) {
  const docRef = await addDoc(collection(db, "certificates"), {
    title,
    issuer,
    issueDate,
    credentialUrl: credentialUrl || "",
    badgeIcon: badgeIcon || "Award",
    image: image || "",
    order: 999, // 🆕 নতুন সার্টিফিকেট শুরুতে যেন লিস্টের শেষে যোগ হয়
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

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