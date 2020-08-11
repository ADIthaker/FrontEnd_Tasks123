

import {loadAndProcess} from './loadAndProcess';
import { 
		geoNaturalEarth1,
		geoPath,
		select,
		zoom,
		event,
		scaleSequential,
		interpolateRdYlGn,
	} from 'd3';

const svg = select('svg');
const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);
const g = svg.append('g');


g.append('path')
	.attr('class','sphere')
	.attr('d',pathGenerator({type:"Sphere"}));

svg.call(zoom().on('zoom',()=>{
	g.attr('transform',event.transform);
}))
const colorScheme = scaleSequential(interpolateRdYlGn);
loadAndProcess().then(countries=>{
	g.selectAll('path').data(countries.features)
	.enter().append('path')
		.attr('class','country')
		.attr('d',pathGenerator)
		.attr('fill',d=>colorScheme((1-d.properties.normalizedCases)/3.5))
	.append('title')
		.text(d=>{
			return d.properties.name + ' : ' + d.properties.cases.toString();
		})
});
// numeric sorting

let sortNumericTable = (apiData,field)=>{
 
    switch (field){
        case 'activeCases':
                apiData.sort((a,b)=>{
					if(a.active_cases==='N/A' && b.active_cases==='N/A' ){
						return 0;
					}else if(a.active_cases==='N/A'){
						return 1;
					}else if( b.active_cases==='N/A'){
						return -1;
					}
                    let i = parseFloat(a.active_cases.replace(/,/g,''));
                    let j = parseFloat(b.active_cases.replace(/,/g,''));
                  return asc.active_cases ? i-j : j-i  ;       
                });
            asc.active_cases = !asc.active_cases;
            break;
        case "deaths" :
                 apiData.sort((a,b)=>{
                    let i = parseFloat(a.deaths.replace(/,/g,''));
                    let j = parseFloat(b.deaths.replace(/,/g,''));
                  return asc.deaths ? i-j : j-i ;       
                })
            
            asc.deaths = !asc.deaths;
            break;
        case "recovered":
                apiData.sort((a,b)=>{
					if(a.total_recovered==='N/A' && b.total_recovered==='N/A' ){
						return 0;
					}else if(a.total_recovered==='N/A'){
						return 1;
					}else if( b.total_recovered==='N/A'){
						return -1;
					}
                    let i = parseFloat(a.total_recovered.replace(/,/g,''));
                    let j = parseFloat(b.total_recovered.replace(/,/g,''));
                  return asc.recovered ? i-j : j-i ;       
                })
            asc.recovered = !asc.recovered;
            break;

    }
    
    emptyTable();
    makeTable(apiData);
}
//string sorting
let sortStringTable = (apiData)=>{
    apiData.sort((a,b)=>{
        return a.country_name.localeCompare(b.country_name);
    })
    if(!asc.country_name){
        apiData.reverse();
    }
    asc.country_name = !asc.country_name;
    emptyTable();
    makeTable(apiData);
}

let asc = {
    active_cases:true,
    deaths:true,
    country_name:true,
    recovered:true
};
// add rows
const makeTable=(apiData)=>{
    const tables = document.getElementById('table');
    apiData.forEach(data=>{
        const row = document.createElement('tr');
        const countryname = document.createElement('td');
        const activeCases = document.createElement('td');
        const recovered = document.createElement('td');
		const deaths = document.createElement('td');
		countryname.className = "country_name";
		activeCases.className = "active_cases";
		recovered.className = "total_recovered";
		deaths.className = "deaths";
        countryname.innerHTML = data.country_name;
        activeCases.innerHTML = data.active_cases;
        recovered.innerHTML = data.total_recovered;
        deaths.innerHTML = data.deaths;
        row.appendChild(countryname);
        row.appendChild(activeCases);
        row.appendChild(recovered);
        row.appendChild(deaths);
        tables.appendChild(row);
    });

}

//empty table
const emptyTable = ()=>{
   const tableRows = document.querySelectorAll('tr');
   for (let rows=1;rows<tableRows.length;rows++){
    tableRows[rows].parentNode.removeChild(tableRows[rows]);
   }

}
//retrieve table
const getCurrentTable = ()=>{
	let arr = [];
	const tableRows = document.querySelectorAll('tr');
	for (let rows=1;rows<tableRows.length;rows++){
		let countryName = tableRows[rows].getElementsByClassName('country_name')[0].innerHTML;
		let activeCases = tableRows[rows].getElementsByClassName('active_cases')[0].innerHTML;
		let recovered = tableRows[rows].getElementsByClassName('total_recovered')[0].innerHTML;
		let deaths = tableRows[rows].getElementsByClassName('deaths')[0].innerHTML;
		arr.push({
			country_name:countryName,
			total_recovered:recovered,
			active_cases:activeCases,
			deaths:deaths,
		});
	}
	return arr;
}
const country = document.getElementById('country');
const deaths =document.getElementById('deaths');
const activeCases = document.getElementById('activecases');
const recovered = document.getElementById('recovered');
//adding events
country.addEventListener('click',()=>{
	let apiData = getCurrentTable();
	sortStringTable(apiData);
	
});
deaths.addEventListener('click',()=>{
	let apiData = getCurrentTable();
	sortNumericTable(apiData,"deaths");
	
});
activeCases.addEventListener('click',()=>{
	let apiData = getCurrentTable();
	sortNumericTable(apiData,"activeCases");
	
});
recovered.addEventListener('click',()=>{
	let apiData = getCurrentTable();
	sortNumericTable(apiData,"recovered");
	
})

	


