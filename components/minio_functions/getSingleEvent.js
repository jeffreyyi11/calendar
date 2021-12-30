//get single object from minio storage
const getSingleEvent = async(name) => {
    let object = await fetch('/api/Minio/getobject', {
        method: 'POST',
        body: name,
    })
        .then((response) => response = response.json())
        .then((event) => {
            return event;
        })
        .catch((error) => {return error});
    return object;
}
   

export default getSingleEvent;