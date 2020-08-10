

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
		.attr('fill',d=>colorScheme((1-d.properties.normalizedCases)/1.75))
	.append('title')
		.text(d=>{
			return d.properties.name + ' : ' + d.properties.cases.toString();
		})
})
	


