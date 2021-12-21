const Minio = require('minio');
const minio_access_key = process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY;
const minio_secret = process.env.NEXT_PUBLIC_MINIO_SECRET_KEY;
const minio_endpoint = process.env.NEXT_PUBLIC_MINIO_ENDPOINT;
const communityName = process.env.NEXT_PUBLIC_COMMUNITY;

const minioClient = new Minio.Client({
    endPoint: minio_endpoint,
    port: 2082,
    useSSL: false,
    accessKey: minio_access_key,
    secretKey: minio_secret
});


export default async(req, res) => {
    let objects = minioClient.listObjectsV2('events', communityName, false, '');
    console.log(obj);
    objects.on('data', obj => {return obj});
    objects.on('error', err => console.log(err));
};