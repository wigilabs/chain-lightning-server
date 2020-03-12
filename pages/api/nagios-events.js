import Cors from 'micro-cors'

const cors = Cors()
const superagent = require('superagent');

function getState(s) {
  console.log('getState: ')
  if(s.includes('CRITICAL')) return 0
  if(s.includes('WARNING')) return 1
  return 2
}

const handler = (req, res) => {
  let events
  superagent
    .get('https://insights-api.newrelic.com/v1/accounts/2482859/query?nrql=SELECT+*+FROM+NagiosReport+SINCE+5+minutes+ago')
    .set('X-Query-Key', 'NRIQ-j7zJFckfarn9jsOB-nPscK5H6z0QCgHd')
    .set('Accept', 'application/json')
    .end((err, response) => {
      events = JSON.parse(response.text).results[0].events
      let dObj=events[0]

      let value_load=dObj['Current Load\n'].includes('CRITICAL') || dObj['Current Load\n'].includes('WARNING') || dObj['Current Load\n'].includes('WARNING:') ? 0 : 1
      let value_users=dObj['Current Users\n'].includes('CRITICAL') || dObj['Current Users\n'].includes('WARNING') || dObj['Current Users\n'].includes('WARNING:') ? 0 : 1;
      let value_http=dObj['HTTP\n'].includes('CRITICAL') || dObj['HTTP\n'].includes('WARNING') || dObj['HTTP\n'].includes('WARNING:') ? 0 : 1;
      let ping_value=dObj['PING\n'].includes('CRITICAL') || dObj['PING\n'].includes('WARNING') || dObj['PING\n'].includes('WARNING:') ? 0 : 1;
      let root_partition=dObj['Root Partition\n'].includes('CRITICAL') || dObj['Root Partition\n'].includes('WARNING') || dObj['Root Partition\n'].includes('WARNING:') ? 0 : 1;
      let ssh_value=dObj['SSH\n'].includes('CRITICAL') || dObj['SSH\n'].includes('WARNING') || dObj['SSH\n'].includes('WARNING:') ? 0 : 1;
      let swap_value=dObj['Swap Usage\n'].includes('CRITICAL') || dObj['Swap Usage\n'].includes('WARNING') || dObj['Swap Usage\n'].includes('WARNING:') ? 0 : 1;
      let total_value=dObj['Total Processes\n'].includes('CRITICAL') || dObj['Total Processes\n'].includes('WARNING') || dObj['Total Processes\n'].includes('WARNING:') ? 0 : 1;

      // calculate states
      let state_load = getState(dObj['Current Load\n'])
      let state_users = getState(dObj['Current Users\n'])
      let state_http = getState(dObj['HTTP\n'])
      let state_ping = getState(dObj['PING\n'])
      let state_root = getState(dObj['Root Partition\n'])
      let state_ssh = getState(dObj['SSH\n'])
      let state_swap = getState(dObj['Swap Usage\n'])
      let state_total = getState(dObj['Total Processes\n'])

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
        { name: 'Current Load',    value: value_load,     msg: detail_load,          state: state_load  },
        { name: 'Current Users',   value: value_users,    msg: detail_users,         state: state_users },
        { name: 'HTTP',            value: value_http,     msg: detail_http,          state: state_http  },
        { name: 'PING',            value: ping_value,     msg: detail_ping,          state: state_ping  },
        { name: 'Root Partition',  value: root_partition, msg: detail_root_patition, state: state_root  },
        { name: 'SSH',             value: ssh_value,      msg: detail_ssh,           state: state_ssh   },
        { name: 'Swap Usage',      value: swap_value,     msg: detail_swap,          state: state_swap  },
        { name: 'Total Processes', value: total_value,    msg: detail_total,         state: state_total },
      ]

      events.sort(function(a, b) { return a.state - b.state });

      return res.json(events);
    });
};

export default cors(handler)
