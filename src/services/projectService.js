export async function getProjects() {
    const response = await fetch("/projects.json");

    if (!response.ok) {
        throw new 
    }
}
 
export default getProjects;