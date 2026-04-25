let projects = [];
let currentProjectId = null;
let draggedTask = null;

// Load data from localStorage
function loadData() {
    const saved = localStorage.getItem('trackerData');
    if (saved) {
        try {
            projects = JSON.parse(saved);
        } catch (e) {
            console.error('Error loading data:', e);
            projects = [];
        }
    }
    renderProjects();
}

// Save data to localStorage
function saveData() {
    try {
        localStorage.setItem('trackerData', JSON.stringify(projects));
    } catch (e) {
        console.error('Error saving data:', e);
        alert('Failed to save data. Please check your browser settings.');
    }
}

// Project Modal Functions
function openProjectModal() {
    document.getElementById('projectModal').classList.add('active');
    document.getElementById('projectNameInput').value = '';
    document.getElementById('projectNameInput').focus();
}

function closeProjectModal() {
    document.getElementById('projectModal').classList.remove('active');
}

function addProject() {
    const name = document.getElementById('projectNameInput').value.trim();
    if (!name) {
        alert('Please enter a project name');
        return;
    }

    const project = {
        id: Date.now(),
        name: name,
        tasks: {
            todo: [],
            progress: [],
            done: []
        }
    };

    projects.push(project);
    saveData();
    renderProjects();
    closeProjectModal();
}

function deleteProject(projectId) {
    if (confirm('Are you sure you want to delete this project and all its tasks?')) {
        projects = projects.filter(p => p.id !== projectId);
        saveData();
        renderProjects();
    }
}

// Task Modal Functions
function openTaskModal(projectId) {
    currentProjectId = projectId;
    document.getElementById('taskModal').classList.add('active');
    document.getElementById('taskNameInput').value = '';
    document.getElementById('taskDeadlineInput').value = '';
    document.getElementById('taskStatusInput').value = 'todo';
    document.getElementById('taskPriorityInput').value = 'medium';
    document.getElementById('taskCategoryInput').value = '';
    document.getElementById('taskNotesInput').value = '';
    document.getElementById('taskNameInput').focus();
}

function closeTaskModal() {
    document.getElementById('taskModal').classList.remove('active');
    currentProjectId = null;
}

function addTask() {
    const name = document.getElementById('taskNameInput').value.trim();
    if (!name) {
        alert('Please enter a task name');
        return;
    }

    const task = {
        id: Date.now(),
        name: name,
        deadline: document.getElementById('taskDeadlineInput').value,
        priority: document.getElementById('taskPriorityInput').value,
        category: document.getElementById('taskCategoryInput').value.trim(),
        notes: document.getElementById('taskNotesInput').value.trim()
    };

    const status = document.getElementById('taskStatusInput').value;
    const project = projects.find(p => p.id === currentProjectId);
    if (project) {
        project.tasks[status].push(task);
        saveData();
        renderProjects();
        closeTaskModal();
    }
}

function deleteTask(projectId, status, taskId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        project.tasks[status] = project.tasks[status].filter(t => t.id !== taskId);
        saveData();
        renderProjects();
    }
}

// Move task between statuses
function moveTask(projectId, fromStatus, taskId, toStatus) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const taskIndex = project.tasks[fromStatus].findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const task = project.tasks[fromStatus].splice(taskIndex, 1)[0];
    project.tasks[toStatus].push(task);

    saveData();
    renderProjects();
}

// Drag and Drop Functions
function handleDragStart(e, projectId, status, taskId) {
    draggedTask = { projectId, status, taskId };
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e, projectId, newStatus) {
    e.preventDefault();
    
    if (!draggedTask || draggedTask.projectId !== projectId) return;

    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const taskIndex = project.tasks[draggedTask.status].findIndex(t => t.id === draggedTask.taskId);
    if (taskIndex === -1) return;

    const task = project.tasks[draggedTask.status].splice(taskIndex, 1)[0];
    project.tasks[newStatus].push(task);

    saveData();
    renderProjects();
    draggedTask = null;
}

// Render Functions
function renderProjects() {
    const container = document.getElementById('projectsContainer');
    
    if (projects.length === 0) {
        container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: 40px;">No projects yet. Click "+ NEW PROJECT" to get started.</div>';
        return;
    }

    container.innerHTML = projects.map(project => `
        <div class="project">
            <div class="project-header">
                <div class="project-name">${escapeHtml(project.name)}</div>
                <div class="project-controls">
                    <button class="add-task-btn" onclick="openTaskModal(${project.id})">+ ADD TASK</button>
                    <button class="delete-project-btn" onclick="deleteProject(${project.id})">DELETE</button>
                </div>
            </div>
            <div class="kanban-board">
                <div class="kanban-column todo-column" 
                     ondragover="handleDragOver(event)" 
                     ondrop="handleDrop(event, ${project.id}, 'todo')">
                    <div class="column-header">To Do (${project.tasks.todo.length})</div>
                    ${renderTasks(project.id, 'todo', project.tasks.todo)}
                </div>
                <div class="kanban-column progress-column" 
                     ondragover="handleDragOver(event)" 
                     ondrop="handleDrop(event, ${project.id}, 'progress')">
                    <div class="column-header">In Progress (${project.tasks.progress.length})</div>
                    ${renderTasks(project.id, 'progress', project.tasks.progress)}
                </div>
                <div class="kanban-column done-column" 
                     ondragover="handleDragOver(event)" 
                     ondrop="handleDrop(event, ${project.id}, 'done')">
                    <div class="column-header">Done (${project.tasks.done.length})</div>
                    ${renderTasks(project.id, 'done', project.tasks.done)}
                </div>
            </div>
        </div>
    `).join('');
}

function renderTasks(projectId, status, tasks) {
    if (tasks.length === 0) {
        return '<div style="color: var(--text-secondary); font-size: 0.85rem; text-align: center; padding: 20px;">No tasks</div>';
    }

    return tasks.map(task => {
        // Determine which move buttons to show
        let moveButtons = '';
        if (status === 'todo') {
            moveButtons = `
                <button class="move-btn" onclick="moveTask(${projectId}, '${status}', ${task.id}, 'progress')">→ In Progress</button>
                <button class="move-btn" onclick="moveTask(${projectId}, '${status}', ${task.id}, 'done')">→ Done</button>
            `;
        } else if (status === 'progress') {
            moveButtons = `
                <button class="move-btn" onclick="moveTask(${projectId}, '${status}', ${task.id}, 'todo')">← To Do</button>
                <button class="move-btn" onclick="moveTask(${projectId}, '${status}', ${task.id}, 'done')">→ Done</button>
            `;
        } else if (status === 'done') {
            moveButtons = `
                <button class="move-btn" onclick="moveTask(${projectId}, '${status}', ${task.id}, 'todo')">← To Do</button>
                <button class="move-btn" onclick="moveTask(${projectId}, '${status}', ${task.id}, 'progress')">← In Progress</button>
            `;
        }

        return `
        <div class="task-card" 
             draggable="true"
             ondragstart="handleDragStart(event, ${projectId}, '${status}', ${task.id})"
             ondragend="handleDragEnd(event)">
            <button class="task-delete" onclick="deleteTask(${projectId}, '${status}', ${task.id})">×</button>
            <div class="task-name">${escapeHtml(task.name)}</div>
            ${task.category ? `<span class="task-category">${escapeHtml(task.category)}</span>` : ''}
            <span class="task-priority priority-${task.priority}">${task.priority.toUpperCase()}</span>
            ${task.deadline ? `<div class="task-meta">Due: ${new Date(task.deadline).toLocaleDateString()}</div>` : ''}
            ${task.notes ? `<div class="task-notes">${escapeHtml(task.notes)}</div>` : ''}
            <div class="task-actions">
                ${moveButtons}
            </div>
        </div>
    `;
    }).join('');
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadData);