// 1. Access html and store and ad vars to use in JS
const projectListContainer = document.querySelector('[data-project-container]');
const newProjectForm = document.querySelector('[data-new-project-form]');
const newProjectInput = document.querySelector('[data-new-project-input]');

// 1. Project Input Data is stored as an obj with Id and name properties
const LOCAL_STORAGE_PROJECT_KEY = "task.projects"
// 1. Get the info from local storage using key 2. If any projects exist parse from string into object
// 3. Or if it doesn't exist give us an empty array of projects to begin with. 
let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || []


// 1. Prevents default submit         2. Assigns input value to projectName 
// 3. If no name is given do nothing  4. Call createProject() and assign to project Var
// 5. Clear the input value           6. Push created Project obj to be stored in Projects Array
// 7. Save to local Storage and Render Project to the DOM
newProjectForm.addEventListener('submit', e => {
    e.preventDefault()
    const projectName = newProjectInput.value
    if (projectName == null || projectName === '') return
    const project = createProject(projectName)
    newProjectInput.value = null
    projects.push(project)
    saveAndRender()
})

// 1. Takes in projectName from input and creates obj 2. Project ID is randomly generated
// 3. Name prop tasks are assigned from input
function createProject(name) {
  return { id: Date.now().toString(), name: name, tasks: [] }
}

// 1. Calls save and Render functions
function saveAndRender() {
  save()
  renderProject()
}

// 1. Using local storage key , passes value of key and saves projects to local storage as JSON string. 
function save() {
  localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects))
}


// 1. Clears the ulContainer                         2. ForEach project in Projects array create a list DOM elem
// 2. Acceess and add id to the elem using .notation 3. Add class to Elem
// 4. Add project name from prop.value to innerText  5. Append newly created <li> to the ul ProjectListContainer
function renderProject() {
  clearElement(projectListContainer)  
  projects.forEach(project => {
    const listElement = document.createElement('li')
    // check if projectId needs to be listId
    listElement.dataset.projectId = project.id  
    listElement.classList.add('project-name')
    listElement.innerText = project.name
    projectListContainer.appendChild(listElement)
  })
}

// 1. While there exists a first child element remove the first child elem. (effectively clears all elems from node)
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

// 1. call renderProject function 
renderProject()








//modal logic

const modal = document.querySelector('.modal');
const openModal = document.querySelector('.add-task-btn');
const closeModal = document.querySelector('.submit-task-btn');

openModal.addEventListener('click', () => {
    modal.style.display = "flex";
})

closeModal.addEventListener('click', () => {
    modal.style.display = "none";
})

