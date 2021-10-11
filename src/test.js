// pls ignore, working on backend
const axios = require("axios").default;
const { JSDOM } = require("jsdom");
const csv = require("papaparse");

const document = markup => new JSDOM(markup).window.document; 

const getData = async () => {
  const who = axios.get("https://covid19.who.int/table");
  const whoHistoric = axios.get(
    "https://raw.githubusercontent.com/WorldHealthOrganization/xform-covid-casecount-who/master/output/global.csv"
  );
  const owidCases = axios.get(
    "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/jhu/biweekly_cases.csv"
  );
  const owidDeaths = axios.get(
    "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/jhu/biweekly_deaths.csv"
  );

  return await Promise.all([who, whoHistoric, owidCases, owidDeaths]);
};

getData().then((res) => {
  const pre = document(res[2].data).body.innerHTML;
  const pre2 = document(res[3].data).body.innerHTML;
  const pre3 = document(res[1].data).body.innerHTML; 
  const data = csv.parse(pre, { fastMode: true }).data;
  const data2 = csv.parse(pre2, { fastMode: true }).data;
  const data3 = csv.parse(pre3, { fastMode: true }).data;
  
  console.log(data); 
});
