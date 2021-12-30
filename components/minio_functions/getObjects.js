import getSingleEvent from "./getSingleEvent";

//get all events for community
const getEvents = async (month) => {
  //use current passed month to filter out events for the month
    let selectedMonth = String(month + 1);
  //fetch events for community and filter by month
    let events = await fetch("/api/Minio/getobjects")
        .then((data) => {
            data = data.json();
            return data;
        })
        .catch((error) => console.log(error));
    console.log(events);
    let filteredData = [];
    for (let i = 0; i < events.length; i++) {
        //Use name from file to get all community events
        let name = events[i]['name'].split('/')[1];
        let event = await getSingleEvent(name);
        //Get the date from event and compare against month param
        //if matching push to array
        let eventMonth = event['date'].split('/')[0];
        if (eventMonth === selectedMonth) {
            filteredData.push(event);
        }
    }
    return filteredData;
};

export default getEvents;
