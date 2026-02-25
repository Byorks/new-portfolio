// upload-projects.js
import { collection, doc, setDoc, } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../config/firebase.js"; // ajuste o caminho do seu firebase.js
import projects from "../projects.json" with { type: "json" }; // seu JSON mockado



async function uploadAllProjects() {
  try {
    // 1. Faça login com sua conta admin
    const userCredential = await signInWithEmailAndPassword(
      auth,
      process.env.EMAIL, // ← sua conta admin
      process.env.SENHA, // ← senha
    );

    console.log("Autenticado como:", userCredential.user.uid);

    const projectsCollection = collection(db, "projects");

    for (const project of projects) {
      // Gera um ID automático primeiro
      const newDocRef = doc(projectsCollection);

      // Salva o documento usando o ID gerado + adiciona o campo "id"
      await setDoc(newDocRef, {
        ...project, // todos os campos originais
        id: newDocRef.id, // ← adiciona o ID como campo
        createdAt: new Date(), // opcional: data de criação
      });

      console.log(`Projeto "${project.title}" salvo com ID: ${newDocRef.id}`);
    }
  } catch (error) {
    console.error("Erro:", error.code, error.message);
  } finally {
    // Opcional: logout
    await auth.signOut();
  }
  console.log("Upload concluído! Todos os projetos foram migrados.");
}

uploadAllProjects().catch(console.error);
