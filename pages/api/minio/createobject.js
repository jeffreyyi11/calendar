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
    const event = JSON.stringify(req.body);
    minioClient.putObject(
        `events/${communityName}`,
        event.name,
        event,
        (err, etag) => {
            if (err) {return console.log(err)}
            res.status(200).json('event created');
        }
    );
};