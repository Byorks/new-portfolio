import { db } from './firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import projects from '../projects.json' with { type: 'json'};

async function uploadProjects() {
    const projectsCollection = collection(db, 'projects');
    for( const project of projects ) {
        await addDoc(projectsCollection, project);
    }

    console.log('Upload concluído');
}

uploadProjects();
