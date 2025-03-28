let projectCount = 0; // Initialize project count globally

function addProject() {
    const container = document.getElementById('projectsContainer');
    const index = projectCount++; // Increment projectCount for unique indexes

    const projectHtml = `
        <div class="project-item border rounded p-3 mb-3">
            <div class="mb-3">
                <label class="form-label">Tittel</label>
                <input type="text" class="form-control" name="projects[${index}][title]" placeholder="Prosjekttittel">
            </div>
            <div class="mb-3">
                <label class="form-label">Beskrivelse</label>
                <textarea class="form-control" name="projects[${index}][description]" rows="3" placeholder="Beskrivelse av prosjektet"></textarea>
            </div>
            <div class="mb-3">
                <label class="form-label">Lenke</label>
                <input type="url" class="form-control" name="projects[${index}][url]" placeholder="https://github.com/bruker/prosjekt">
            </div>
            <button type="button" class="btn btn-danger btn-sm" onclick="removeProject(this)">
                Fjern
            </button>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', projectHtml); // Add the new project HTML to the container
}

function removeProject(button) {
    button.closest('.project-item').remove(); // Remove the project item
}