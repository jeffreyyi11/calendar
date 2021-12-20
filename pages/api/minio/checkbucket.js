const Minio = require('minio');
const minio_access_key = process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY;
const minio_secret = process.env.NEXT_PUBLIC_MINIO_SECRETE_KEY;
const minio_endpoint = process.env.NEXT_PUBLIC_MINIO_ENDPOINT

const minioClient = new Minio.Client({
    endPoint: minio_endpoint,
    port: 2096,
    useSSL: true,
    accessKey: minio_access_key,
    secretKey: minio_secret
});

export default async(req, res) => {
    let data = req.body;
    console.log(data);
    try {
        minioClient.bucketExists(bucketName, (err, exists) => {
            if (err) throw err;
            if (exists) {
                console.log('bucket exists');
                res.status(200).json('true');
            }
        })
    }
    catch (err) {
        console.log(err);
        res.json('error');
    }
}