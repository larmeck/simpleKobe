
export function delay(milliseconds) {
    return new Promise(resolve => { 
        setTimeout(resolve, milliseconds);
    });
}


export function displayEmployees(filteredEmployees,employeeTable,count){

    employeeTable.innerHTML = "";

    filteredEmployees.forEach(function(item){

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.theName}</td>
            <td>${item.department}</td>
            <td>${item.role}</td>
            <td>${item.isActive}</td>
        `;

        employeeTable.appendChild(row);

    });

    count.textContent = "No of Employees: " + filteredEmployees.length;
}