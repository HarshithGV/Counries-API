import React from 'react';
import * as ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import background from "./map.jpg";


function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [q, setQ] = useState("");
    const [searchParam] = useState(["capital", "name", "numericCode"]);
    const [filterParam, setFilterParam] = useState(["All"]);

    useEffect(() => {
        fetch(
            "https://raw.githubusercontent.com/iamspruce/search-filter-painate-reactjs/main/data/countries.json"
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    const data = Object.values(items);

    function search(items) {
        return items.filter((item) => {
            if (item.region == filterParam) {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            } else if (filterParam == "All") {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }
        });
    }

    if (error) {
        return (
            <p>
                {error.message}, if you get this error, the free API I used
                might have stopped working, but I created a simple example that
                demonstrate how this works,{" "}
                <a href="https://codepen.io/Spruce_khalifa/pen/mdXEVKq">
                    {" "}
                    check it out{" "}
                </a>{" "}
            </p>
        );
    } else if (!isLoaded) {
        return <>loading...</>;
    } else {
     
        return (
            <div className="wrapper"  style={{ backgroundImage: `url(${background})`, textAlign: "center" }}>
                <div className="search-wrapper">
                    <label htmlFor="search-form">
                        <input
                            type="search"
                            name="search-form"
                            id="search-form"
                            className="search-input"
                            placeholder="Search for..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            style={{
        padding: "1rem",
        marginTop: "1rem",
        borderRadius: "0.25rem",
        width: "50%"
      }}
                        /><hr></hr>
                        <span className="sr-only" style={{
        fontFamily: 'cursive',
        fontSize: "2rem",   
        fontWeight: "600",     
        color: "#000"
        
      }}>Search countries here</span>
                    </label>

                    <div className="select">
                        <select
                            onChange={(e) => {
                                setFilterParam(e.target.value);
                            }}
                            className="custom-select"
                            aria-label="Filter Countries By Region"
                            style={{
        padding: "1rem",
        marginTop: "1rem",
        borderRadius: "0.25rem",
        width: "50%"
      }}>
                            <option value="All">Filter By Region</option>
                            <option value="Africa">Africa</option>
                            <option value="Americas">America</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                        </select>
                        <span className="focus"></span>
                    </div>
                </div>
                <table style={{margin: "1rem", border: "1px solid black", fontWeight: "700"}}>

                    {search(data).map((item) => (
                        <tr style={{marginTop: "-4px", position: "relative", display: "flex"}}>
                            <article className="card" key={item.alpha3Code} style={{marginTop: "0rem", 
                            
                            }}>
                                <td className="card-image">
                                    <img
                                        src={item.flag.large}
                                        alt={item.name}
                                        style={{width: "3rem"}}
                                    />
                                </td>
                                
                                    <td className="card-name" style={{padding: "1rem" , border: "1px solid black"}}>{item.name}</td>
                                    
                                        <td style={{padding: "1rem", border: "1px solid black"}}>
                                            population:{" "}
                                            <span>{item.population}</span>
                                        </td>
                                        <td style={{padding: "1rem", border: "1px solid black"}}>
                                            Region: <span>{item.region}</span>
                                        </td>
                                        <td style={{padding: "1rem", border: "1px solid black"}}>
                                            Capital: <span>{item.capital}</span>
                                        </td>
                                        <td style={{padding: "1rem", border: "1px solid black"}}>
                                            Official Name: <span>{item.official_name}</span>
                                        </td>
                                        <td style={{padding: "1rem", border: "1px solid black"}}>
                                            Alpha 2 Code: <span>{item.alpha2code}</span>
                                        </td>
                                        <td style={{padding: "1rem", border: "1px solid black"}}>
                                            CIOC: <span>{item.cioc}</span>
                                        </td>
                                        <td style={{padding: "1rem", border: "1px solid black"}}>
                                        Numeric Code: <span>{item.numericCode}</span>
                                        </td>
                               
                            </article>
                        </tr>
                    ))}
                </table>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;