<template>
    <div>
        <h1>To-Do List Application</h1>
        <ul>
            <li v-for="task in tasks" :key="task._id">
                {{ task.text }}
                <button @click="updateTask(task)">Update</button>
                <button @click="deleteTask(task._id)">Delete</button>
            </li>
        </ul>
        <input v-model="newTaskText" placeholder="Enter task text">
        <button @click="saveTask">Add Task</button>
        <div>
            <input v-model="userNumber" placeholder="Enter a number">
            <button @click="updateNumbers">Update Numbers</button>
            <p>Array of Numbers: {{ numbers }}</p>
            <p>Most Valuable Number: {{ mostValuableNumber }}</p>
            <p>Updated Array: {{ updatedArray }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tasks: [],
            newTaskText: '',
            selectedTask: null,
            numbers: [1, 2, 3, 4, 5],
            mostValuableNumber: null,
            updatedArray: null,
            userNumber: ''
        };
    },
    mounted() {
        this.getTasks();
        this.findMostValuableNumber();
        this.updateArray();
    },
    methods: {
        async getTasks() {
            const response = await fetch('http://localhost:5000/');
            const data = await response.json();
            this.tasks = data;
        },
        async saveTask() {
            const response = await fetch('http://localhost:5000/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: this.newTaskText })
            });
            const data = await response.json();
            this.tasks.push(data);
            this.newTaskText = '';
        },
        updateTask(task) {
            this.selectedTask = task;
            const updatedText = prompt('Enter updated text:', task.text);
            if (updatedText !== null) {
                this.updateTaskInDatabase(task._id, updatedText);
            }
        },
        async updateTaskInDatabase(id, newText) {
            await fetch('http://localhost:5000/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: id, text: newText })
            });
            this.getTasks();
        },
        async deleteTask(id) {
            await fetch('http://localhost:5000/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: id })
            });
            this.getTasks();
        },
        findMostValuableNumber() {
            this.mostValuableNumber = Math.max(...this.numbers);
        },
        updateNumbers() {
            const userEnteredNumber = parseInt(this.userNumber);
            if (!isNaN(userEnteredNumber)) {
                this.numbers.push(userEnteredNumber);
                this.updateArray();
            } else {
                alert('Please enter a valid number.');
            }
        },
        updateArray() {
            this.updatedArray = this.numbers.map((number) => {
                if (number % 5 === 0 && number % 3 === 0) {
                    return 'three-five';
                } else if (number % 5 === 0) {
                    return 'five';
                } else if (number % 3 === 0) {
                    return 'three';
                } else {
                    return number;
                }
            });
        }
    }
};
</script>
