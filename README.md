# To-Do-List Application

## Demo
[Try the live app here!](https://brendonthedev.github.io/to-do-list/)
![Preview of my To-Do App](../to-do-list/public/to-doPreview.png)

## About this project
The objective of this project was to create a project/task management application. The user is able to switch between multiple projects,
each containing their own to-do/task list. 

## Project Overview and Explanation of Functionality

- Using OOP principles, take in user input, store this data in objects, and dynamically render UI with DOM manipulation. 

1. Take in user text input and store this data in objects on submit.
2. Access HTML elements in JS with query-selectors. -Data attributes were implemented for ease of use.
3. Create event listeners and functions to dynamically create and render DOM elements.
4. On a triggering event "click", pass the data that is stored in objects as arguments to the aforementioned functions.
5. The combination of these functions and event listeners is used to implement DOM manipulation.
6. Local storage is used to allow the stored object data and UI to remain after refreshing the page or reopening the browser.
7. Local storage is implemented with .setItem(key) and JSON parse/stringify.
8. Element container is cleared before every render.
9. To be able to access the dynamically created projects and tasks, ids are generated with date.now().tostring() for each element. 
10. Projects List is rendered by calling forEach() on the stored projects and assigning the associated props to every created <li> element.
11. Conditional logic and ids are used to select the active project and render the corresponding tasks.
12. HTML Templates are used to generate tasks because of their complexity - "They require a combination of multiple elements".
13. Task count is dynamically rendered by getting the length of the filtered tasks and by using Template Literals and string interpolation.
14. The "delete project button" filters projects to return all projects that are not selected.
15. The "clear complete tasks button" filters tasks within selected project to return the tasks that are not complete - "not checked".

## Problems/Bugs that I had to Overcome

-Assigning Unique Ids to Dynamically created elements

During my brainstorming and planning phase I was able to comprehend the majority of the logic for the application. When it came time to individually access/target the dynamically created DOM elements
I could not figure out how to go about it. 
I understood that conventional HTML elements can be targeted individually by assigning ids or data-attributes, but in this project the DOM elements are created on the fly with user input. 
After some time googleing, checking stack overflow and YouTube, I found a solution. 
I could assign unique Ids using Date.now().toString() passed in as a default value to the Id property on the Factory Functions. Ta-Da!

-Deploying a working Application to GitHub Pages

This was my first time deploying a finished project. 
When I first deployed the project on GitHub Pages the starting UI of the application loaded as planned, but none of the dynamic functionality worked as intended. 
I browsed GitHub's documentation on Staging and Production Server and Configuring A Public Source.
I also  found a blog post that was more concise and specific to deploying a build with Vite. - "I created the project with Vite from the beginning but did not know how to deploy it until now."
A few commands in the terminal and some basic config of my package.json and vite.config.js file and the application worked as intended on GitHub Pages. 
To ensure everything works as itended for other users, I had my wife try the App from her MacBook on both Safari and Chrome and it worked!

## What I Learned

-Deepening my understanding of OOP and functional programming principles 

-Thinking about and understanding the bigger picture of how objects, functions, event listeners work together to dynamically render the UI

-User input => Data Structures =>  Events => Funtions => User Output

-Comments and Documentation

-Event Listeners

-More advanced DOM manipulation

-Local Storage

-HTML Templates

-Deploying a finished Application to GitHub Pages
