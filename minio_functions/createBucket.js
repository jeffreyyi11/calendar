import React from 'react';

export default async(bucketName) => {
    try {
        let bucketExists = await fetch('/api/minio/checkbucket.js', {
            method: 'GET',
            body: bucketName
        })
        if (!bucketExists) {
            let newBucket = await fetch('/api/minio/createbucket.js', {
                method: 'POST',
                body: bucketName,
            })
            return newBucket;
        }
    } catch (err) {
        throw err;
    }
}