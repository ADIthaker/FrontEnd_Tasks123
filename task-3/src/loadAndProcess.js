import { feature } from 'topojson';
import makeCompat from './transformation';
import {tsv,json} from 'd3';

export const loadAndProcess =() =>

Promise.all([
	tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'),
	json('https://unpkg.com/world-atlas@1.1.4/world/50m.json'),
	fetch("https://corona-virus-world-and-india-data.p.rapidapi.com/api", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
		"x-rapidapi-key": "635e003000msh9a466ac8fc1d9d7p134328jsna88369670c99"
	}
}).then(res=>res.json())
])
.then(([tsvData,jsonData,Data])=>{
	let apiData = makeCompat(Data.countries_stat);
    const rowById= {};
    let maxCases = 0;
	tsvData.forEach(d=>{
		rowById[d.iso_n3]=d;
	})
    const countries = feature(jsonData,jsonData.objects.countries);
    countries.features.forEach(d=>{
        Object.assign(d.properties,rowById[d.id]);
    });
    
    countries.features.forEach(d=>{
        let cases = 0;
        let numericalCases=0;
        let currIndex = apiData.findIndex((c)=>c.country_name===d.properties.name);
        if(currIndex!==-1){
            cases = apiData[currIndex].cases;  
            if(cases!==0 && cases.indexOf(',')!==-1){
                cases = cases.replace(/,/g,'');
            }
        }

        d.properties.cases = +cases;
        if(d.properties.cases>maxCases){
            maxCases=d.properties.cases;
        }
       
       
    });
    countries.features.forEach(d=>{
        let normalizedCases = d.properties.cases/maxCases;
        d.properties.normalizedCases = parseFloat(normalizedCases);
    })

    return countries;
});