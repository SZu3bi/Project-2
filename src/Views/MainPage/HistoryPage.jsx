
import React, { useEffect, useState, useCallback } from 'react';
// import { showSuccess } from '../../Helper/Tostify.Helper';

import { GetMainhistory } from '../../Services/APIServices';

import CircularProgress from '@material-ui/core/CircularProgress';

import psi from '../../Views/sales.png'





export const HistoryPage = () => {
  
 

const [result, setResult] = useState();

const [loading, setLoading] = useState(true);


/////////////////////////////////  API`s  ///////////////////////////////////////

/////  Get API
const GetAllData = useCallback(async () => {
  setLoading(true);
  const result = await GetMainhistory();
  if (result) {
    const sortedResult = result.data.sort((a, b) =>
      a.Id.localeCompare(b.Id)
    );
    setResult(sortedResult);
    console.log('item ', result.data.length);
  } else setResult(null);
  setLoading(false);
}, []);


    var mybutton = document.getElementById("myBtn");
    window.onscroll = function() {scroll()};

    const  scroll =() => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
 
    const top = () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      console.log("sssss");
    }

/////////////////////////////////  API`s  ///////////////////////////////////////
useEffect(() => {
    GetAllData()
 
    }, [GetAllData ]);





//   const info  = (id , name) =>{
//     showSuccess(`${id}` + "\n" +`${name}` );

//   }


return (
  <div className='Agents-wrapper view-wrapper'>


    {/* <button onClick={top} id="myBtn" title="Go to top">Top</button> */}

    {loading ? <CircularProgress /> : <div>

<div style={{display: 'inline-block'}}>

 
  
    </div>
<div className="cards">

{result && result.map((s ,index ) => ( 
<div class="card-container">
    <span class="pro"> {s.User__c}</span>
    <img id="avatar" src={psi} alt="lead"></img>
    <h3>{s.New_Value__c}</h3>
    <h3>{s.Old_Value__c}</h3>
    <h6>{s.Last_Modified_Date__c}</h6>
    {/* <p>{s.Last_Modified_By__c}</p> */}
    <p>{s.Created_DateTime__c}</p>
    <div class="buttons">

    </div>
    <div class="skills">
  
    </div>
    <div>
 
      </div>
</div>))}
</div>

    </div>}
</div>
);
};
