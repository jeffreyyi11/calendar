//grab all objects(events) from bucket for community

export default async () => {
    //fetch events for community
    let data;
    fetch('/api/Minio/getobjects')
        .then(response => data = response.json())
        .then(data => {
            let filteredData = [];
            for (let i = 0; i < data.length; i++) {
                data[i]['name'] = data[i]['name'].split('/')[1]
                let date = data[i]['lastModified'].slice(0,10).split('-');
                let year = date[0];
                let month = date[1];
                let day = date[2];
                data[i]['date'] = `${month}/${day}/${year}`;
                filteredData.push(data[i]);
            };
            return filteredData;
        })
        .catch(error => console.log(error));
}