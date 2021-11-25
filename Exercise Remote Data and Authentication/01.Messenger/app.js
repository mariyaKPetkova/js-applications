const btnSubmit = document.querySelector('#submit')
btnSubmit.addEventListener('click', getMessages)
const btnRefresh = document.querySelector('#refresh')
btnRefresh.addEventListener('click', refreshMesseges)
const textArea = document.querySelector('#messages')
const url = `http://localhost:3030/jsonstore/messenger`
async function getMessages() {
    const messagesRes = await fetch(url)
    const messages = await messagesRes.json()
    const messagesR = Object.values(messages).reduce((acc, curr) => {
        const message = `${curr.author}: ${curr.content}`
        return [...acc, message]
    }, []).join('\n')
    textArea.value = messagesR
}
async function refreshMesseges() {
    const inputAuthor = document.querySelector('#aut')
    const inputContent = document.querySelector('#cont')
    if (!inputAuthor.value || !inputContent.value) return;
    const newMessage = {
        author: inputAuthor.value,
        content: inputContent.value
    }
    inputAuthor.value = ''
    inputContent.value = ''
    const createResponse = await fetch(url,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'Post',
            body: JSON.stringify(newMessage)
        })
    const createdMessage = await createResponse.json()
    //await getMessages()
    textArea.value = textArea.value + `\n${createdMessage.author}: ${createdMessage.content}`
}