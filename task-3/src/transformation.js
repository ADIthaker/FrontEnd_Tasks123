 const makeCompat = data =>{
	return data.map(d=>{
		switch(d.country_name){
			case 'USA':
			d.country_name = "United States";
			break;
			case "UAE" :
			d.country_name = "United Arab Emirates"
			break;
			case "UK" :
			d.country_name = "United Kingdom"
			break;
			case "S. Korea" :
			d.country_name ="South Korea"
			break;
			case "British Virgin Islands":
			d.country_name="British Virgin Is."
			break;
			case "Antigua and Barbuda":
			d.country_name ="Antigua and Barb."
			break;
			case "Bosnia and Herzegovina":
				d.country_name ="Bosnia and Herz."
			break;
			case "Cayman Islands":
				d.country_name = "Cayamn Is.";
				break;
			case "Dominican Republic":
			d.country_name = "Dominican Rep.";
			break;
			case "Equatorial Guinea":
			d.country_name = "Eq. Guinea";
			break;
			case "Faeroe Islands":
				d.country_name = "Faeroe Is.";
				break;
			case "Falkland Islands":
				d.country_name ="Falkland Is."
				break;
			case "French Polynesia":
			d.country_name ="Fr. Polynesia";
			break;
			case "South Sudan":
			d.country_name ="S. Sudan";
			break;
			case "Sao Tome and Principe":
			d.country_name ="São Tomé and Principe";
			break;
			case "St. Vincent Grenadines":
			d.country_name ="St. Vin. and Gren.";
			break;
			case "Saint Pierre Miquelon":
			d.country_name ="St. Pierre and Miquelon";
			break;
			case "Saint Kitts and Nevis":
			d.country_name ="St. Kitts and Nevis";
			break;
			case "St. Barth":
			d.country_name ="St-Barthélemy";
			break;
			case "Turks and Caicos":
			d.country_name ="Turks and Caicos Is.";
			break;
			case "Vatican City":
			d.country_name ="Vatican";
			break;
			case "Western Sahara":
			d.country_name ="W. Sahara";
			break;
			case "Turks and Caicos":
			d.country_name ="Turks and Caicos Is.";
			break;


		}
		return d;		
	})
}
export default makeCompat;