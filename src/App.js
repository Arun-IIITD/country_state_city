import { useEffect, useState } from "react";


function App() {

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

 
  //FOR FETCHING COUNTRIES
  useEffect(() => {
    const fetchcountries = async() => {
      try{
        //const response =await fetch ("https://crio-location-selector.onrender.com/countries")
        const response = await fetch("https://crio-location-selector.onrender.com/countries");
        const data = await response.json()
        setCountries(data)
      }
      catch(error){
        console.error("error in fetching countries" + error)
        return ;
      }
    };
    fetchcountries();
  }, [])

  //FOR FETCHING STATES ACC TO COUNTRY
  useEffect(() => {
     if (!selectedCountry) return;
    const fetchstates = async() => {
      try{
       // const response = await fetch (`https://crio-location-selector.onrender.com/country/${selectedCountry}/states`)
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        );
        console.log(response)
        const data = await response.json()
        setStates(data)
        setCity([])
        // setSelectedState("")
        // setSelectedCity("")
      }
      catch(error){
        console.error("error in fetching countries" + error)
        return ;
      }
    };
    fetchstates();
  }, [selectedCountry])


  // FOR FETCHING CITIES ACC TO STATES
  useEffect(() => {
      if (!selectedCountry || !selectedState) return;
    const fetchcity = async() => {
      try{
        //const response =await fetch (`https://crio-location-selector.onrender.com/country/${selectedCountry}/state/${selectedState}/cities`)
          const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        );
        const data = await response.json()
        setCity(data)
        setSelectedCity("")
      }
      catch(error){
        console.error("error in fetching countries" + error)
        return ;
      }
    };
    fetchcity();
  }, [selectedCountry, selectedState])




  return (
    <div className="App">
      <h2> Select Location</h2>
      

      {/* FOR COUNTRY */}
       <select
        style={{ margin : "10px" }}
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        id = "country"
      >
        <option value="">Select country</option>

        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>

        ))}
      </select>

     
       {/* FOR STATES */}
       <select 
       style = {{margin : "10px"}} 
       value={selectedState}
       onChange={(e) => setSelectedState(e.target.value)}
       disabled = {!selectedCountry}
       id="state"
       >

        <option value = "" > Select states</option>
        {states.map((state,index) => (
          <option key ={index} value = {state}>
            {state}
          </option>
        ))}

      </select>
      

      {/* FOR CITIES */}
       <select  
       style = {{margin :"10px"}} 
       value={selectedCity}
       onChange={(e) => setSelectedCity(e.target.value)}
       disabled = {!selectedState}
       id = "city"
       >

        <option value = "" > Select cities</option>
          {city.map((c, index) => (
          <option key={index} value={c}>
            {c}
          </option>
        ))}

      </select>

      {selectedCountry && selectedState && selectedCity &&(
        <p>
          You selected {selectedCountry}, {selectedState}, {selectedCity}
        </p>
      )}


 
    </div>
  );
}

export default App;
