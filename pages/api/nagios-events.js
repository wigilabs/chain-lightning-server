const superagent = require('superagent');

const handler = (req, res) => {
  let events
  superagent
    .get('https://insights-api.newrelic.com/v1/accounts/2482859/query?nrql=SELECT+*+FROM+NagiosReport+SINCE+5+minutes+ago')
    .set('X-Query-Key', 'NRIQ-j7zJFckfarn9jsOB-nPscK5H6z0QCgHd')
    .set('Accept', 'application/json')
    .end((err, response) => {
      events = JSON.parse(response.text).results[0].events
      let dObj=events[0]
      console.log('events: ', dObj)
      let value_load=dObj['Current Load\n'].includes('CRITICAL') ? 0 : 1
      let value_users=dObj['Current Users\n'].includes('CRITICAL') ? 0 : 1;
      let value_http=dObj['HTTP\n'].includes('CRITICAL') ? 0 : 1;
      let ping_value=dObj['PING\n'].includes('CRITICAL') ? 0 : 1;
      let root_partition=dObj['Root Partition\n'].includes('CRITICAL') ? 0 : 1;
      let ssh_value=dObj['SSH\n'].includes('CRITICAL') ? 0 : 1;
      let swap_value=dObj['Swap Usage\n'].includes('CRITICAL') ? 0 : 1;
      let total_value=dObj['Total Processes\n'].includes('CRITICAL') ? 0 : 1;
      events = [
          {name: 'Current Load',    value: value_load},
          {name: 'Current Users',   value: value_users},
          {name: 'HTTP',            value: value_http},
          {name: 'PING',            value: ping_value},
          {name: 'Root Partition',  value: root_partition},
          {name: 'SSH',             value: ssh_value},
          {name: 'Swap Usage',      value: swap_value},
          {name: 'Total Processes', value: total_value},
        ]
      return res.json(events);
    });
};
export default handler;
