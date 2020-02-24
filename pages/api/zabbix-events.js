const superagent = require('superagent');
const handler = (req, res) => {
  
  let event

  
  superagent
    .get('https://insights.newrelic.com/accounts/2482859/query?query=SELECT+description+FROM+ZabbixAgent,+ZabbixHTTP,+ZabbixSSH+limit+3')
    .set('X-Query-Key', 'NRIQ-j7zJFckfarn9jsOB-nPscK5H6z0QCgHd')
    .set('Accept', 'application/json')
    .end((err, response) => {
      events = JSON.parse(response.text).results[0].events
      console.log('events: ', events)
      event = [
        {
          name: 'SSH',
          value: 1
        }, 
        {
          name: 'HTTP',
          value: 1
        }, 
        {
          name: 'Agent',
          value: 1
        }
      ]
      
      return res.json(events);
    });
    
};
export default handler;