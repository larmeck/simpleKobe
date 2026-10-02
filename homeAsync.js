import { delay, displayEmployees } from "./utils.js";

class Employee{
    constructor(id,theName,department,role,isActive){
        this.id = id;
        this.theName = theName;
        this.department = department;
        this.role = role;
        this.isActive = isActive;
        this.employeeList = [];

    }

    filterEmployees(selectedDepartment, showActiveEmployee){

        let filteredEmployees = this.employeeList;

        if(selectedDepartment !== "all"){

            filteredEmployees = filteredEmployees.filter( (item) => item.department === selectedDepartment
            );
            
        }

        if(showActiveEmployee){

            filteredEmployees = filteredEmployees.filter((item) => item.isActive === true
            );
           
        }

        return filteredEmployees;
    }
}

let loadButton = document.getElementById("loadEmployees");
let status = document.getElementById("status");
let employeeTable = document.getElementById("employeeTable");
let count = document.getElementById("count");
let department = document.getElementById("department");
let activeEmployee = document.getElementById("active");


let employee = new Employee();


loadButton.addEventListener("click", async function(){

    status.textContent = "Wait for employees to load...";

    loadButton.disabled = true;

    try {
        await delay(2000);
        let response = await fetch("employees.json");

        if(!response.ok){

            throw new Error("Loading employees cannot be processed!.");

        }

        let data = await response.json();

        employee.employeeList = [];

        console.log("confirm data");


        console.log(data);

        data.forEach(function(item){

            let newEmployee = new Employee(
                item.id,
                item.name,
                item.department,
                item.role,
                item.active
            );

            employee.employeeList.push(newEmployee);

        });

        let filteredEmployees = employee.filterEmployees(
            department.value,
            activeEmployee.checked
        );

        displayEmployees(filteredEmployees,employeeTable,count );

    }
    catch(error){
        status.textContent = "Error: " + error.message;
        console.log(status.textContent);

    }

    finally{
        loadButton.disabled = false;

        console.log(loadButton.disabled)

    }

});


department.addEventListener("change", function(){

    let filteredEmployees = employee.filterEmployees(
        department.value,
        activeEmployee.checked
    );

    console.log(filteredEmployees)

    displayEmployees(filteredEmployees, employeeTable, count);

});


activeEmployee.addEventListener("change", function(){

    console.log(department.value)

    console.log(activeEmployee.checked)

    let filteredEmployees = employee.filterEmployees(
        department.value,

        activeEmployee.checked
    );

    displayEmployees(filteredEmployees, employeeTable, count);

});

