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
    const event = JSON.parse(req.body);
    console.log("🚀 ~ file: createobject.js ~ line 17 ~ async ~ event", event)
    const name = `${event['name']}`;
    const data = JSON.stringify(event);
    try {
        minioClient.putObject(
            'events',
            communityName + '/' + name,
            data,
            (err, etag) => {
                if (err) throw err;
                else res.status(200).json('event created');
            }
        )
    } catch (err) {
        if (err) throw err;
    }
};