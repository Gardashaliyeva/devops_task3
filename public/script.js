function addStudent() {
    const name = document.getElementById('name').value;
    const className = document.getElementById('class').value;

    fetch('/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, class: className }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        loadStudents(); // Refresh the list
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function loadStudents() {
    fetch('/students')
        .then(response => response.json())
        .then(students => {
            const list = students.map(student =>
                `<li>${student.name} - ${student.class} 
                 <button onclick="deleteStudent('${student.id}')">Delete</button>
                 </li>`
            ).join('');
            document.getElementById('students').innerHTML = `<ul>${list}</ul>`;
        });
}

function deleteStudent(studentId) {
    fetch(`/students/${studentId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Deletion failed');
        }
        return response.json();
    })
    .then(() => {
        console.log('Student deleted successfully');
        loadStudents(); // Reload the student list
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


window.onload = loadStudents;