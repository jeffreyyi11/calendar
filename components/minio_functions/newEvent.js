//create new object(event) for community

export default async(event) => {
    const response = fetch('/api/Minio/createobject', {
        method: 'POST',
        body: event
    })
    return response
}

