

export default function Events(){

const events = [
    {
      title: "Zumba",
      start:   "2023-06-02T21:48:35.857Z",
      end:  "2023-06-02T22:48:55.857Z",
    },
    {
      title: "Aerobics",
      start: getRandomDateTime().startDate,
      end: getRandomDateTime().endDate,
    },
    {
      title: "Cardio",
      start: "2023-05-31T14:30:00.857Z",
      end: "2023-05-31T15:30:00.857Z",
    },
  ];
  
  function getRandomDateTime() {
    const currentDate = new Date()
    const startDate = getRandomDate(currentDate);
    const endDate = getRandomDate(startDate)

  
    return {
      startDate : (startDate).toISOString(),
      endDate: (endDate).toISOString(),
    };
  }
    
  function getRandomDate(startDate) {
    const startTimestamp = startDate.getTime();
    const endTimestamp = Date.now(); // Current timestamp

    const randomTimestamp = getRandomNumber(startTimestamp, endTimestamp);
    const randomDate = new Date(randomTimestamp);

    return randomDate;
  }
  
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const json = JSON.stringify(events, null, 2);
  
  console.log('EventsMocks',json);
 
  return events
}