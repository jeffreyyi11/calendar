//create new object(event) for community

export default async(event) => {
    try {
        let response = await fetch('/api/minio/createobject', {
            method: 'POST',
            body: event
    } )
        console.log(response.json());
    }
    catch (err) {
        if (err) throw err;
    }
}

