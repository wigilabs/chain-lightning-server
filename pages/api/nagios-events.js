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
      //console.log('events: ', dObj)
      let value_load=dObj['Current Load\n'].includes('CRITICAL') ? 0 : 1
	  value_load=dObj['Current Load\n'].includes('WARNING') ? 0 : 1
	  value_load=dObj['Current Load\n'].includes('WARNING:') ? 0 : 1
      let value_users=dObj['Current Users\n'].includes('CRITICAL')  ? 0 : 1;
	  value_users=dObj['Current Users\n'].includes('WARNING')  ? 0 : 1;
	  value_users=dObj['Current Users\n'].includes('WARNING:')  ? 0 : 1;
      let value_http=dObj['HTTP\n'].includes('CRITICAL') ? 0 : 1;
	  value_http=dObj['HTTP\n'].includes('WARNING') ? 0 : 1;
	  value_http=dObj['HTTP\n'].includes('WARNING:') ? 0 : 1;
      let ping_value=dObj['PING\n'].includes('CRITICAL') ? 0 : 1;
	  ping_value=dObj['PING\n'].includes('WARNING') ? 0 : 1;
	  ping_value=dObj['PING\n'].includes('WARNING:') ? 0 : 1;
      let root_partition=dObj['Root Partition\n'].includes('CRITICAL')  ? 0 : 1;
	  root_partition=dObj['Root Partition\n'].includes('WARNING')  ? 0 : 1;
	  root_partition=dObj['Root Partition\n'].includes('WARNING:')  ? 0 : 1;
      let ssh_value=dObj['SSH\n'].includes('CRITICAL') ? 0 : 1;
	  ssh_value=dObj['SSH\n'].includes('WARNING') ? 0 : 1;
	  ssh_value=dObj['SSH\n'].includes('WARNING:') ? 0 : 1;
      let swap_value=dObj['Swap Usage\n'].includes('CRITICAL') ? 0 : 1;
	  swap_value=dObj['Swap Usage\n'].includes('WARNING') ? 0 : 1;
	  swap_value=dObj['Swap Usage\n'].includes('WARNING:') ? 0 : 1;
      let total_value=dObj['Total Processes\n'].includes('CRITICAL') ? 0 : 1;
	  total_value=dObj['Total Processes\n'].includes('WARNING') ? 0 : 1;
	  total_value=dObj['Total Processes\n'].includes('WARNING:') ? 0 : 1;
	  //detalles
	  let detail_load=dObj['Current Load\n'];
	  let detail_users=dObj['Current Users\n'];
	  let detail_http=dObj['HTTP\n'];
	  let detail_ping=dObj['PING\n'];
	  let detail_root_patition=dObj['Root Partition\n'];
	  let detail_ssh=dObj['SSH\n'];
	  let detail_swap=dObj['Swap Usage\n'];
	  let detail_total=dObj['Total Processes\n'];
	  //final object
      events = [
          { name: 'Current Load',    value: value_load, msg: detail_load},
          { name: 'Current Users',   value: value_users, msg: detail_users },
          { name: 'HTTP',            value: value_http, msg: detail_http },
          { name: 'PING',            value: ping_value, msg: detail_ping },
          { name: 'Root Partition',  value: root_partition, msg: detail_root_patition },
          { name: 'SSH',             value: ssh_value, msg: detail_ssh },
          { name: 'Swap Usage',      value: swap_value, msg: detail_swap },
          { name: 'Total Processes', value: total_value, msg:  detail_total },
        ]
	  console.log(events);
      return res.json(events);
    });
};
export default handler;