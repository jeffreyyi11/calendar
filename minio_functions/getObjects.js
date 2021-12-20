import React, {useState} from 'react';

export default async (communityName) => {
    const bucketParams = {
        bucket: 'Events',
        site: communityName
    }
    try {
        let response = await fetch('api/minio/checkbucket.js', {
            method: 'POST',
            body: bucketParams, //body to include bucket name and community name
        })
        let data = response.status === 200 ? await fetch('api/minio/getEvents.js', {
            method: 'GET'
        }) : 'No events found';
        return data;
    } catch (err) {
        throw err;
    }
}