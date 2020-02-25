const superagent = require('superagent');
const handler = (req, res) => {
  let events
  superagent
    .get('https://insights-api.newrelic.com/v1/accounts/2482859/query?nrql=SELECT%20description%20FROM%20ZabbixAgent,%20ZabbixHTTP,%20ZabbixSSH%20limit%203')
    .set('X-Query-Key', 'NRIQ-j7zJFckfarn9jsOB-nPscK5H6z0QCgHd')
    .set('Accept', 'application/json')
    .end((err, response) => {
     events = JSON.parse(response.text).results[0].events
      console.log('events: ', events)
      var self = this
     events.forEach((element, index, array) => {
    console.log("=====================================================================")
    console.log(index) 
         delete element.timestamp
         switch (index) {
             case 0 : //ssh
                   element.name=index
             case 1 : //http
                   element.name=index
             case 2 : //agent
                   element.name=index
                        }
    console.log("=====================================================================")
});
      /*events = [
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
              ]*/
      return res.json(events);
    });
};
export default handler;