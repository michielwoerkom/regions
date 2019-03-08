import axios from 'axios';

export const FETCH_DATA = 'FETCH_DATA';

export function fetchData(city) {
  //const file = JSON.parse('../data/kosten_data_vektis.json');
  //console.log(file);

  axios.get('../data/kosten_data_vektis.json')
   .then((res)=>{
     console.log(res.data);
   }).catch((err)=>{
     console.log(err);
   });


  // return {
  //   type: FETCH_DATA,
  //   payload: request
  // };
}
