const Minio = require('minio');
const minio_access_key = process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY;
const minio_secret = process.env.NEXT_PUBLIC_MINIO_SECRET_KEY;
const minio_endpoint = process.env.NEXT_PUBLIC_MINIO_ENDPOINT;

const minioClient = new Minio.Client({
    endPoint: minio_endpoint,
    port: 2082,
    useSSL: false,
    accessKey: minio_access_key,
    secretKey: minio_secret
});

export default async(req, res) => {
    //check for bucket
    minioClient.bucketExists('events', function(err, exists) {
        console.log('checking');
        if (err) throw err;
        console.log(exists);
        exists ? res.status(200).json('bucket exists') : res.status(200).json('no bucket');
    })
}