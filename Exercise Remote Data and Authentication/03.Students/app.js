const tbody = document.querySelector('#body')
async function loadStudents() {
    const res = await fetch(`http://localhost:3030/jsonstore/collections/students`)
    const students = await res.json()
    Object.values(students).map(student => addStudent(student._id, student.firstName, student.lastName, student.facultyNumber, student.grade))
}
loadStudents()
const formEl = document.querySelector('#form')
formEl.addEventListener('submit', (e) => {
    e.preventDefault()
    const form = new FormData(formEl)
    const firstName = form.get('firstName')
    const lastName = form.get('lastName')
    const fN = form.get('facultyNumber')
    const grade = form.get('grade')
    if (!firstName || !lastName || !fN || !grade) return;
    submitStudent(firstName, lastName, fN, grade)
})
async function submitStudent(firstName, lastName, fN, grade) {
    const newStudent = {
        facultyNumber: fN,
        firstName: firstName,
        lastName: lastName,
        grade: grade
    }
    const createRes = await fetch(`http://localhost:3030/jsonstore/collections/students`,
        {
            headers: {
                "Content-type": "application/json"
            },
            method: 'Post',
            body: JSON.stringify(newStudent)
        })
    const createdStudent = await createRes.json()
    addStudent(createdStudent._id, createdStudent.firstName, createdStudent.lastName, createdStudent.facultyNumber, createdStudent.grade)
}
function addStudent(id, firstName, lastName, fN, grade) {
    const trEl = createElements('tr')
    trEl.dataset.id = id
    const thFName = createElements('th', firstName)
    const thLN = createElements('th', lastName)
    const facN = createElements('th', fN)
    const thgrade = createElements('th', grade)
    trEl.appendChild(thFName)
    trEl.appendChild(thLN)
    trEl.appendChild(facN)
    trEl.appendChild(thgrade)
    tbody.appendChild(trEl)
}
function createElements(type, text) {
    const el = document.createElement(type)
    if (text != undefined) {
        el.textContent = text
    }
    return el
}