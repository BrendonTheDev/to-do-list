// 1. Access html from Project section
const projectContainer = document.querySelector('[data-project-container]');
const newProjectForm = document.querySelector('[data-new-project-form]');
const newProjectInput = document.querySelector('[data-new-project-input]');
const deleteProjectButton = document.querySelector('[data-delete-project-button]');

// 1. Access html from Tasks section
const taskDisplayContainer = document.querySelector('[data-task-display-container]');
const taskTitle = document.querySelector('[data-task-title]');
const taskCount = document.querySelector('[data-task-count]');
const tasksContainer = document.querySelector('[data-tasks]');
const taskTemplate = document.querySelector('#task-template');
const taskForm = document.querySelector('[data-new-task-form]');
const taskInput = document.querySelector('[data-new-task-input]')

// 1. Local Storage keys
const LOCAL_STORAGE_PROJECT_KEY = "task.projects"
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = "task.selectedProjectId"

// 1. Get the info from local storage using key 2. If any projects exist parse from string into object
// 3. Or if it doesn't exist give us an empty array of projects to begin with. 
let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || []

let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY)

// 1. If tag is an <li> assign the clicked li project.id to the selectedProjectId variable
// 2. Call save and Render
projectContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedProjectId = e.target.dataset.projectId
        saveAndRender()
    }
})

// 1. OnClick Filter to return all projects that are not selected
// 2. Set selectedID to null because it no longer exists  3. Save To Local and rerender page/DOM
deleteProjectButton.addEventListener('click', e => {
    projects = projects.filter(project => project.id !== selectedProjectId)
    selectedProjectId = null
    saveAndRender()
})

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

// <-- NEEDS COMMENT -->
taskForm.addEventListener('submit', e => {
  e.preventDefault()
  const taskName = taskInput.value
  if (taskName == null || taskName === '') return
  const task = createTask(taskName)
  taskInput.value = null
  const selectedProject = projects.find(project => project.id === selectedProjectId)
  selectedProject.tasks.push(task)
  saveAndRender()
})

// 1. Takes in projectName from input and creates obj 2. Project ID is randomly generated
// 3. Name prop tasks are assigned from input
function createProject(name) {
  return { id: Date.now().toString(), name: name, tasks: [] }
}

function createTask(name) {
  return { id: Date.now().toString(), name: name, complete: false }
}

// 1. Calls save and Render functions
function saveAndRender() {
  save()
  render()
}

// 1. Using local storage key , passes value of key and saves projects to local storage as JSON string. 
function save() {
  localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects))
  localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProjectId)
}


// 1. Clear project Container 2. Call function to Render the Projects List with select functionality
// 3. If no project is selected display no tasks section 4. If a project is selected, display the project and
// assign the innerText of the taskTitle to the selected Project name. 
function render() {
  clearElement(projectContainer)  
  renderProjects()
  const selectedProject = projects.find(project => project.id === selectedProjectId)
  if (selectedProjectId == null) {
    taskDisplayContainer.style.display = 'none'
  } else {
    taskDisplayContainer.style.display = ''
    taskTitle.innerText = selectedProject.name
    renderTaskCount(selectedProject)
    clearElement(tasksContainer)
    renderTasks(selectedProject)
  }
}

// <--- Uses template to render task --->

// 1. For each task in the selected project 2. import the content of the template
// 3. Get a checkbox with querySeletor 4. Assign task id to checkbox 
//5. Assign checked from task complete  6. get labal with query assign the for to task.id.
//7. Append the task.name to the label name 
// 8.append the created task element "checkbox and label" to tasks Container
  function renderTasks(selectedProject) {
    selectedProject.tasks.forEach(task => {
      const taskElement = document.importNode(taskTemplate.content, true)
      const checkbox = taskElement.querySelector('input')
      checkbox.id = task.id
      checkbox.checked = task.complete
      const label = taskElement.querySelector('label')
      label.htmlFor = task.id
      label.append(task.name)
      tasksContainer.appendChild(taskElement)
    })
  }

  // 1. Take in selected project as argument
  // 2. Filter the selectedProject tasks for incomplete tasks and count how many are incomplete
  // 3. If 1 incomplete task string is "task" else is "tasks"
  // 4. Assign inner text of taskcount to number of incomplete + task/tasks + "remaining"
 function renderTaskCount(selectedProject) {
    const incompleteTaskCount = selectedProject.tasks.filter(task => !task.complete).length
    const taskString = incompleteTaskCount === 1 ? "task" : "tasks"
    taskCount.innerText = `${incompleteTaskCount} ${taskString} remaining`
 }



//For each projects in project 1. create an li elem 2. assign it a project.id, 3. add a class of project-name
// 4. set the inner text to the project name 5. If it is the selected project add the class of active-project
// 6. append to the project container. 
function renderProjects() {
  projects.forEach(project => {
    const listElement = document.createElement('li')
    // check if projectId needs to be listId
    listElement.dataset.projectId = project.id  
    listElement.classList.add('project-name')
    listElement.innerText = project.name
    if (project.id === selectedProjectId) {
        listElement.classList.add('active-project')
    }
    projectContainer.appendChild(listElement)
  })
}

// 1. While there exists a first child element remove the first child elem. (effectively clears all elems from node)
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

// 1. call render function 
render()








//modal logic

// const modal = document.querySelector('.modal');
// const openModal = document.querySelector('.add-task-btn');
// const closeModal = document.querySelector('.submit-task-btn');

// openModal.addEventListener('click', () => {
//     modal.style.display = "flex";
// })

// closeModal.addEventListener('click', () => {
//     modal.style.display = "none";
// })

