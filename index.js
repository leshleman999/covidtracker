// import {zingchart, ZC} from './zingchart/es6.js';
// import './zingchart/modules-es6/zingchart-bar.min.js';
const myform = document.getElementById("myForm");
let month1Label = "Aug";
let month2Label = "Sep";
let month3Label = "Oct";
let month4Label = "Nov";
let month5Label = "Dec";
let month6Label = "Jan";
var monthValues = [0,0,0,0,0,0];
var myConfig = {};

// myform.addEventListener("submit",(e)=>{

   // console.log(e.target.value);
async function getCovidData(){
   spinner=document.getElementsByClassName('spin');
   spinner.display
   await fetch("https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/us_only?state=Oregon&min_date=2021-08-01T00:00:00.000Z&max_date=2022-01-15T00:00:00.000Z")
   
    // Converting received data to JSON
    .then(response => response.json())
    .then(json => {
  
        // Create a variable to store HTML
        let liDD = `<tr><th>State</th><th>County</th></tr>`;
        let liCC = `<tr><th>State</th><th>County</th></tr>`;

        // Loop through each data and add a table row
        let stateDeathTotal = 0;
        let countyDeathTotal = 0;
        let stateCCTotal = 0;
        let countyCCTotal = 0;
        let month = ""

        json.forEach(stat => {
            stateDeathTotal += stat.deaths_daily;
            stateCCTotal += stat.confirmed_daily;
            if (stat.county == "Washington"){
               countyDeathTotal += stat.deaths_daily;
               countyCCTotal += stat.confirmed_daily;
            }
            const s = stat.date;
            const d = new Date(s);
            month = d.toLocaleString('default',{ month: 'short'});

            switch (month) {
            case "Aug":
               monthValues[0] += stat.deaths_daily;
            case "Sep":
               monthValues[1] += stat.deaths_daily;
            case "Oct":
               monthValues[2] += stat.deaths_daily;
            case "Nov":
               monthValues[3] += stat.deaths_daily;
            case "Dec":
               monthValues[4] += stat.deaths_daily;
            case "Jan":
               monthValues[5] += stat.deaths_daily;
            default:

            }
        });

        liDD += `<tr>
        <td>${stateDeathTotal} </td>
        <td>${countyDeathTotal}</td>        
    </tr>`;
      liCC += `<tr>
         <td>${stateCCTotal} </td>
         <td>${countyCCTotal}</td>        
      </tr>`;
    // Display result
   //  console.log("MonthValues:",monthValues)
    document.getElementById("covidDDData").innerHTML = liDD;
    document.getElementById("covidCCData").innerHTML = liCC;
   });
};
    myConfig = {
      type: 'bar',
      title: {
        text: 'Past 6-Months',
        fontSize: 24,
      },
      scaleX: {
        // Set scale label
        label: { text: 'Months' },
        // Convert text on scale indices
        labels: [ month1Label, month2Label, month3Label, month4Label, month5Label, month6Label]
      },
      scaleY: {
        // Scale label with unicode character
        label: { text: 'Deaths' }
      },
      plot: {
        // Animation docs here:
        // https://www.zingchart.com/docs/tutorials/styling/animation#effect
        animation: {
          effect: 'ANIMATION_EXPAND_BOTTOM',
          method: 'ANIMATION_STRONG_EASE_OUT',
          sequence: 'ANIMATION_BY_SERIES',
          speed: 15,
        }
      },
      series: [
        {
          // plot 1 values, linear data
          values: monthValues,
          text: 'Months',
        },
        
      ]
    };
// });



// })
