//grab all objects(events) from bucket for community

export default async () => {
    const response = await fetch('/api/minio/getobjects');
    let data = await response.json();
    return data;
}