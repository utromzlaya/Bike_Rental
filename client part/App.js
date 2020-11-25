import React, {
  Fragment,
  useEffect,
  useState
} from 'react';
import './App.css';
//components
import CreateForm from './components/CreateForm';
import RentList from './components/RentList';
import AvailableList from './components/AvailableList';

const App = () => {

  const [bikes, setBikes] = useState([]);
  const [rentedBikes, setRentedBikes] = useState([]);

  //delete bike from available list and server
  const deleteBike = async (id) => {
    try {
      await fetch(`http://localhost:5000/bikes/${id}`, {
        method: "DELETE"
      });
      setBikes(bikes.filter(bike => bike.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }
  //delete from rent list
  const deleteBikeFromRent = async (id) => {
    try {
      await fetch(`http://localhost:5001/rented/${id}`, {
        method: "DELETE"
      });
      setRentedBikes(rentedBikes.filter(bike => bike.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  //delete from rent list and return to available
  const cancelRent = async (id, name, type, price) => {
    try {
      const body = {
        name,
        type,
        price
      };
      await fetch("http://localhost:5000/bikes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
    } catch (err) {
      console.error(err.message)
    }
    getBikes();
    deleteBikeFromRent(id);

  }

  //get all rented bikes
  const getRentedBikes = async () => {
    try {
      const responseRent = await fetch("http://localhost:5001/rented");
      const jsonData = await responseRent.json();
      setRentedBikes(jsonData.rows);
    } catch (err) {
      console.error(err.message);
    }
  }

  //put item from available list to rent
  const rentBike = async (id, name, type, price) => {
    try {
      const body = {
        name,
        type,
        price
      };
      await fetch("http://localhost:5001/rented", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });


    } catch (err) {
      console.error(err.message);
    }
    getRentedBikes();
    deleteBike(id);
  }

  //get all bikes to available list
  const getBikes = async () => {
    try {
      const response = await fetch("http://localhost:5000/bikes");
      const jsonData = await response.json();
      setBikes(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(
    () => {
      getBikes();
      getRentedBikes();
    }, []);

  return <Fragment >
            <div className = "wrapper container-fluid" >
              <CreateForm
                getBikes = {getBikes}/> 
              <RentList
                rentedBikes = {rentedBikes}
                getRentedBikes = {getRentedBikes}
                cancelRent = {cancelRent}/>  
              <AvailableList 
                bikes = {bikes}
                getBikes = {getBikes}
                deleteBike = {deleteBike}
                rentBike = {rentBike}/>
            </div> 
          </Fragment>;
}

export default App;