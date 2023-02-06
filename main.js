const dashboardPage = document.getElementById('dashboard');
let currentPage = dashboardPage;

class Calculator {
    constructor() {
	this.element = document.getElementById('calculator');
	this.addNumbers();
    }

    addNumbers() {
        const form = this.element.querySelector('form');

	form.addEventListener('submit', (e) => {
	    e.preventDefault();
	    const first = this.element.querySelector('#first');
	    const second = this.element.querySelector('#second');
	    const sum = this.element.querySelector('#sum');
	    
	    sum.innerHTML = parseInt(first.value) + parseInt(second.value);

	    console.log(sum);
	});
    }
}

class Tasks {
    constructor() {
        this.element = document.getElementById('to-do');
	this.addTask();
    }

    addTask() {
	const form = this.element.querySelector('form');
	
	form.addEventListener('submit', (e) => {
	    e.preventDefault();
	    
	    const saved = this.element.querySelector('ul');
	    const task = form.querySelector('input');
	    
	    saved.innerHTML += `
	        <li>${task.value}</li>	
	    `;

             task.value = '';

	     this.archiveTask();
	});
    }

    archiveTask() {
        const saved = this.element.querySelector('ul');
	const archive = this.element.querySelector('#archived');

	for(const child of saved.children) {
	    const callback = () => {
	        child.remove();
	        child.removeEventListener('click', callback);
	        archive.append(child);
	    }
	    child.addEventListener('click', callback)
	}
    }
}

class Manager {
    constructor() {
        this.userId;
	this.userPasscode;

        this.element = document.getElementById('manager');
	this.landingForm = document.getElementById('returning-user');
	this.registrationForm = document.getElementById('new-member');
	this.loginForm = document.getElementById('login');
	this.passwords = document.getElementById('password-manager');

        this.addEvents();

	this.registrationForm.remove();
	this.loginForm.remove();
	this.passwords.remove();
    }

    addEvents() {
	console.log(this.landingForm.children);
        this.landingForm.children[0].addEventListener('click', () => {
	    this.element.replaceChild(this.loginForm, this.landingForm);
	});

        this.landingForm.children[1].addEventListener('click', (e) => {
            e.preventDefault();
	    this.element.replaceChild(this.registrationForm, this.landingForm);
	});

	this.login();
	this.register();
	this.addPassword();
    }

    login() {
        const userId = this.loginForm.querySelector('#returning-id');
	const userPasscode = this.loginForm.querySelector('#returning-passcode');

        this.loginForm.addEventListener('submit', (e) => {
	    e.preventDefault();
	    
	    console.log(userId.value, userPasscode.value);
	    this.element.replaceChild(this.passwords, this.loginForm);
	});
    }

    register() {
        this.registrationForm.addEventListener('submit', (e) => {
	    e.preventDefault();
	    const userId = this.registrationForm.querySelector('#new-id').value;
	    const userPasscode = this.registrationForm.querySelector('#new-passcode').value;
	
	    console.log(userId, userPasscode);

	    this.element.replaceChild(this.passwords, this.registrationForm);
	});
    }

    addPassword() {
        const form = this.passwords.querySelector('form');
	const saved = this.passwords.querySelector('ul');
	const site = form.querySelector('#password-site');
	const username = form.querySelector('#password-username');
	const password = form.querySelector('#password');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

	    saved.innerHTML += `
		<li>
		    <div>${site.value}.</div>
		    <div>${username.value}.</div>
		    <div>${password.value}.</div>
		</li>	
	    `;

	    site.value = '';
	    username.value = '';
	    password.value = '';
	});
    }
}

const calculatorPage = new Calculator();
const tasksPage = new Tasks();
const managerPage = new Manager();

window.addEventListener('load', () => {

    setUpLinks();
    console.log("Hello, world but from javascript");
    calculatorPage.element.remove();
    tasksPage.element.remove();
    managerPage.element.remove();
});

const changePage = (newPage, oldPage) => {
    const parentNode = oldPage.parentNode;
    parentNode.replaceChild(newPage, oldPage);
    currentPage = newPage;
}

const setUpLinks = () => {
    // const dashboardLink = document.querySelector('#');
    const managerLink = document.querySelector('#open-manager');
    const tasksLink = document.querySelector('#open-tasks');
    const calculatorLink = document.querySelector('#open-calculator');
    const dashLinks = document.getElementsByClassName('dash-link');

    for(let i = 0; i < dashLinks.length; i++) {
        dashLinks[i].addEventListener('click', () => {
	    changePage(dashboardPage, currentPage);
	});
    }

    calculatorLink.addEventListener('click', () => {
        changePage(calculatorPage.element, dashboardPage);
    });

    managerLink.addEventListener('click', () => {
        changePage(managerPage.element, dashboardPage);
    });

    tasksLink.addEventListener('click', () => {
        changePage(tasksPage.element, dashboardPage);
    });
}
