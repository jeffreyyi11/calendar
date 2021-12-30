//create new object(event)
const newEvent = (event) => {
    const response = fetch('/api/Minio/createobject', {
        method: 'POST',
        body: event
    })
    return response
}

export default newEvent;