const Minio = require('minio');
const minio_access_key = process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY;
const minio_secret = process.env.NEXT_PUBLIC_MINIO_SECRETE_KEY;
const minio_endpoint = process.env.NEXT_PUBLIC_MINIO_ENDPOINT;

const minioClient = new Minio.Client({
    endPoint: minio_endpoint,
    port: 2096,
    useSSL: true,
    accessKey: minio_access_key,
    secretKey: minio_secret
});

export default async (req, res) => {
    let bucketName = req.body
    try {
        minioClient.makeBucket(bucketName, (err) => {
            let response = err ? 
                `${bucketName} already exists` : 
                `${bucketName} created`;
            return res.status(200).json(response);
        })
    } catch (err) {
        throw err;
    }
};