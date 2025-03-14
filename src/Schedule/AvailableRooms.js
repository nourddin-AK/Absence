export default function AvailableRooms (){
  // Original schedule data (unchanged)
  const allRooms =['Atelier PVB','Salle 1','Salle 2','Salle 3','Salle 4']
  const scheduleData = [
      { day: "Monday", start: "13:30", end: "16:00", teacher: "Mr. El-Gharrabi El-Hassan", room: "Atelier PVB" },
      { day: "Monday", start: "16:00", end: "18:30", teacher: "Mr. El-Gharrabi El-Hassan", room: "Atelier PVB" },
      { day: "Monday", start: "16:00", end: "18:30", teacher: "Mr. Ayoub Fikry", room: "Salle 1" },
      { day: "Wednesday", start: "13:30", end: "16:00", teacher: "Mr. El-Gharrabi El-Hassan", room: "Salle 1" },
      { day: "Wednesday", start: "11:00", end: "13:30", teacher: "Mr. El-Gharrabi El-Hassan", room: "Atelier PVB" },
      { day: "Thursday", start: "16:00", end: "18:30", teacher: "Mr. El-Gharrabi El-Hassan", room: "Salle 2" },
      { day: "Friday", start: "19:30", end: "21:30", teacher: "Mr. El-Gharrabi El-Hassan", room: "Salle 3" },
      { day: "Friday", start: "8:30", end: "11:00", teacher: "Mr. El-Gharrabi El-Hassan", room: "Atelier PVB" },
      { day: "Friday", start: "11:00", end: "13:30", teacher: "Mr. El-Gharrabi El-Hassan", room: "Salle 4" },
      { day: "Saturday", start: "8:30", end: "11:30", teacher: "Mr. El-Gharrabi El-Hassan", room: "Atelier PVB" },
      { day: "Saturday", start: "8:30", end: "11:30", teacher: "Mr. Teacher1", room: "Salle 1" },
      { day: "Saturday", start: "8:30", end: "11:30", teacher: "Mr. Teacher2", room: "Salle 2" },
      { day: "Saturday", start: "8:30", end: "11:30", teacher: "Mr. Teacher3", room: "Salle 3" },
      { day: "Saturday", start: "8:30", end: "11:30", teacher: "Mr. Teacher4", room: "Salle 4" },
      
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const sessions = [
      '8:30 - 11:00',
      '11:00 - 13:30',
      '13:30 - 16:00',
      '16:00 - 18:30'
  ];
  return (
      <div className="grid grid-cols-[140px_repeat(4,1fr)] grid-rows-[50px_repeat(6,auto)] mt-4 grid-flow-row-dense  auto-cols-max">

{/* Session Headers */}
<div className="col-start-1 row-start-1"></div>
{sessions.map((session, index) => (
              <div key={index} className={`col-start-${index + 2} row-start-1`}>
                  <span className={`
                  px-2 py-1 text-lg bg-gray-100 border border-gray-300 dark:bg-gray-800 dark:border-gray-500 dark:text-gray-50 text-gray-700 font-semibold text-center flex h-full items-center justify-center 
                  ${index === 0 && 'rounded-tl-lg'}
                   ${index === sessions.length - 1 && 'rounded-tr-lg'}
                   ${index === 2 && 'rounded-tl-lg'}
                   ${index === 1 && 'rounded-tr-lg mr-2'}
                  `}>
                      {session}
                  </span>
              </div>
          ))}

{/* Day Labels */}
{days.map((day, index) => (
              <div key={index} className={`col-start-1 row-start-${index + 2}`}>
                  
                  <span className={`h-full bg-gray-100 border border-gray-300 flex items-center justify-center px-4 py-1 dark:bg-gray-800 dark:border-gray-500 dark:text-gray-50 text-gray-700 font-semibold text-lg ${index === 0 && 'rounded-t-lg'} ${index === days.length - 1 && 'rounded-b-lg'} mr-2`}>
                  {day}
                  </span>
              </div>
          ))}

{/* Schedule with Available Rooms */}
{days.map((day, dayIndex) =>
  sessions.map((session, sessionIndex) => {
    const [sessionStart] = session.split(" - ");
    const occupiedRooms = scheduleData
      .filter(s => s.start === sessionStart && s.day === day)
      .map(s => s.room);

    const availableRooms = allRooms.filter(room => !occupiedRooms.includes(room));
 
    return (
      <div 
          key={`${dayIndex}-${sessionIndex}`}
           className={`
           col-start-${2} row-start-${3}
           bg-gray-50 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-500 
           cursor-pointer min-h-16  
           ${dayIndex === days.length -1 && sessionIndex === sessions.length - 1 && 'rounded-br-lg'} 
           ${dayIndex === days.length -1 && sessionIndex === 0 && 'rounded-bl-lg'} 
           ${dayIndex === days.length -1 && sessionIndex ===  1 && 'rounded-br-lg'} 
           ${dayIndex === days.length -1 && sessionIndex === 2 && 'rounded-bl-lg'} 
            ${sessionIndex === 1 && ' mr-2'}
           
           `}
      >
        
        
        {
          availableRooms.length > 0 &&
          <div className=" text-sm  text-gray-600 dark:text-gray-400 flex items-center  gap-2 flex-wrap px-1 py-1">
          {
              availableRooms.map(room => <span className="px-1.5 py-1 bg-purple-100 dark:bg-purple-700 dark:text-purple-50 dark:hover:bg-purple-600 dark:border-purple-300 hover:bg-purple-200 border border-purple-600 text-purple-700 rounded-lg text-sm font-semibold flex items-center justify-center">{room}</span>)
          }
        </div>
        
        }
        

      </div>
    );
  })
)}
</div>
  )
}




