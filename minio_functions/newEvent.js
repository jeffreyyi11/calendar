//create new object(event) for community

export default async(event) => {
    const response = await fetch('/api/minio/createobject', {
        method: 'POST',
        body: event
    })
    response ? console.log('success') : console.log('failed');
}

