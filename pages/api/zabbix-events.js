const superagent = require('superagent');
const handler = (req, res) => {
  
  let event1
  let event2
  let event3
  
  superagent
    .get('https://insights.newrelic.com/accounts/2482859/query?query=SELECT+*+FROM+ZabbixHTTP')
    .set('X-Query-Key', 'NRIQ-j7zJFckfarn9jsOB-nPscK5H6z0QCgHd')
    .set('Accept', 'application/json')
    .end((err, response) => {
      events = JSON.parse(response.text).results[0].events
      console.log('events: ', events)
      event1 = [
          "name": "SSH",
          "value": 1
        ]
      return res.json(events);
    });
    
    superagent
    .get('https://insights.newrelic.com/accounts/2482859/query?query=SELECT+*+FROM+ZabbixSSH')
    .set('X-Query-Key', 'NRIQ-j7zJFckfarn9jsOB-nPscK5H6z0QCgHd')
    .set('Accept', 'application/json')
    .end((err, response) => {
      events = JSON.parse(response.text).results[0].events
      console.log('events: ', events)
      event2 = [
       "name": "HTTP",
       "value": 1
        ]
      return res.json(events);
    });
  
    superagent
    .get('https://insights.newrelic.com/accounts/2482859/query?query=SELECT+*+FROM+ZabbixAgent')
    .set('X-Query-Key', 'NRIQ-j7zJFckfarn9jsOB-nPscK5H6z0QCgHd')
    .set('Accept', 'application/json')
    .end((err, response) => {
      events = JSON.parse(response.text).results[0].events
      console.log('events: ', events)
      event3 = [
        "name" : "Agent",
        "value" : 1
        ]
      return res.json(events);
    });
};
export default handler;