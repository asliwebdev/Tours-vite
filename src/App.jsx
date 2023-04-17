import { useEffect, useState } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = 'https://course-api.com/react-tours-project';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchTour = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const result = await response.json();
     setData(result);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
   }
 
  useEffect(() => {
     fetchTour();
  }, []);

  const removeTour = (id) => {
     setData((prevTours) => {
      return prevTours.filter((tour) => {
        return tour.id !== id;
      })
     })
  }

   
   if(isLoading) {
    return <main>
      <Loading />
    </main>
   }

   if(data.length === 0) {
    return <main>
      <div className="title">
        <h2>No Tours Left</h2>
        <button type="button" style={{marginTop: "2rem"}} className="btn" onClick={() => fetchTour()}>refresh</button>
      </div>
    </main>
   }

 return <main>
    <Tours data={data} removeTour={removeTour}/>
 </main>
};
export default App;
