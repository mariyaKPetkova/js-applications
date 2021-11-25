import { render } from "./../node_modules/lit-html/lit-html.js";
import { allStudents, student } from "./templates/studentsTemplates.js";

let students = []
getStudentsInfo()
async function getStudentsInfo() {
   const resp = await fetch(`http://localhost:3030/jsonstore/advanced/table`)
   const r = await resp.json()

   students = Object.values(r).reduce((acc, curr) => {
      const currStudent = {
         name: `${curr.firstName} ${curr.lastName}`,
         email: curr.email,
         course: curr.course,
      }
      return [...acc, currStudent]
   }, [])

   render(allStudents(students), document.querySelector('tbody'))
}

const input = document.querySelector('#searchField')
document.querySelector('#searchBtn').addEventListener('click', onClick);

function onClick() {
   const searched = input.value.toLowerCase()
   const allSt = students.map(x => Object.assign({}, x))
   const matches = allSt.filter(x => Object.values(x).some(y => {
      return y.toLowerCase().includes(searched)
   }))
   console.log(matches);
   matches.forEach(s => s.class = 'select')
   input.value = ''
   render(allStudents(allSt), document.querySelector('tbody'))
}
