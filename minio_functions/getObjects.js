//grab all objects(events) from bucket for community

export default async () => {

    try {
        let data = await fetch('/api/minio/getobjects.js')
        if (data) {
            return data;
        } else {
            return 'No events found';
        }
    } catch (err) {
        throw err;
    }
}