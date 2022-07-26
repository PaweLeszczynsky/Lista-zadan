{
    let tasks = [];
    let hideDoneTasks = false;
    const render = () => {
        renderTaskList();
        renderButtons();
        bindEvents();
    };

    const renderTaskList = () => {
        let newPosition = "";
        for (const task of tasks) {
            newPosition +=
                `
                <li class="section__taskListItem ${hideDoneTasks && task.status ? "section__taskListItem--hidden" : ""} ${task.status ? "section__taskListItem--done" : ""}">
                    <button class="section__taskList__checkedButton js-section__taskList__checkedButton">
                        ${task.status ? `<ion-icon class="section__taskList__icon" name="checkmark-outline"></ion-icon>` : ""}
                    </button>
                        ${task.content}
                    <button class="section__taskList__deleteTask js-section__taskList__deleteTask"><ion-icon class="section__taskList__icon" name="trash-outline"></ion-icon>
                    </button>
                </li>
                `;
        }
        document.querySelector(".js-section__taskList").innerHTML = newPosition;
    }

    const renderButtons = () => {
        let arrayEmpty = isArrayEmpty(tasks);
        let allTasksDone = checkAllTasksDone(tasks);
        let tasksInteractionButtons = "";
        if (!arrayEmpty) {
            tasksInteractionButtons =
                `
        <button class="js-section__toggleTasksViewButton section__tasksInteractionButton">
        ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
        </button>
        <button ${allTasksDone === true ? "disabled" : ""} class="js-section__setTasksDoneButton section__tasksInteractionButton">
        Ukończ wszystkie
        </button>
        `;
        };
        document.querySelector(".js-section__interactionButtonsContainer").innerHTML = tasksInteractionButtons;
    };

    const isArrayEmpty = (array) => {
        return array.length === 0 ? true : false;
    };

    const checkAllTasksDone = (array) => {
        const filtrDoneTasks = tasks.filter(({ status }) => status);
        return array.length === filtrDoneTasks.length ? true : false;
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const changeStatusTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            { ...tasks[index], status: !tasks[index].status },
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const setAllTasksDone = () => {
        tasks = tasks.map(array => ({
            ...array,
            status: true,
        }));
        render();
    };

    const changeHideDoneTasksValue = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-section__taskList__deleteTask");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
        const statusTaskButtons = document.querySelectorAll(".js-section__taskList__checkedButton");
        statusTaskButtons.forEach((statusTaskButton, index) => {
            statusTaskButton.addEventListener("click", () => {
                changeStatusTask(index);
            });
        });
        const setTasksDoneButton = document.querySelector(".js-section__setTasksDoneButton");
        if (setTasksDoneButton !== null) {
            setTasksDoneButton.addEventListener("click", () => {
                setAllTasksDone();
            });
        };
        const toggleTasksViewButton = document.querySelector(".js-section__toggleTasksViewButton");
        if ((tasks.some(({ status }) => status)) === true) {
            toggleTasksViewButton.addEventListener("click", () => {
                changeHideDoneTasksValue();
            });
        };
    }

    const addNewTask = (newTask) => {
        tasks = [
            ...tasks,
            {
                content: newTask,
                status: false,
            },
        ];
        render();
        resetformfield();
    }

    const focusTaskInput = () => {
        const focusNewTask = document.querySelector(".js-addTaskForm__addTaskInput");
        focusNewTask.focus();
    }

    const resetformfield = () => {
        const form = document.querySelector(".js-addTaskForm");
        form.reset();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        render();
        const newTask = document.querySelector(".js-addTaskForm__addTaskInput").value.trim();
        if (newTask === "") {
            focusTaskInput();
            return
        }
        addNewTask(newTask);
    }

    const init = () => {
        const form = document.querySelector(".js-addTaskForm");
        form.addEventListener("submit", onFormSubmit);
    };
    init();

}