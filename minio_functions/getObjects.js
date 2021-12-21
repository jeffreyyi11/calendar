//grab all objects(events) from bucket for community

export default async () => {
    const response = await fetch('/api/minio/getobjects');
    response ? console.log('success') : console.log('failed');
}