import Chip from '@material-ui/core/Chip';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { instancesStore } from '../../stores/Stores';

class StatusHistoryItem extends React.Component {

  constructor(props) {
    super(props)
    this.fetchStatusFromStore = this.fetchStatusFromStore.bind(this)

    this.state = {status: {}}
  }

  componentDidMount() {
    this.fetchStatusFromStore()
  }

  fetchStatusFromStore() {
    let status = instancesStore.getInstanceStatus(this.props.entry.status, this.props.entry.version)
    this.setState({status: status})
  }

  render() {
    let date = moment.utc(this.props.entry.created_ts).local().format("DD/MM/YYYY"),
        time = moment.utc(this.props.entry.created_ts).local().format("hh:mma"),
        instanceLabel = this.state.status.className ? <Chip size='small' label={this.state.status.status} /> : <div>&nbsp;</div>

    return(
      <li>
        <div className="event--date">
          {date}
          <span>{time}</span>
        </div>
        <div>
          {instanceLabel}
        </div>
        <div>
          <p>
            {this.state.status.explanation}
          </p>
        </div>
      </li>
    )
  }

}

StatusHistoryItem.propTypes = {
  entry: PropTypes.object.isRequired
}

export default StatusHistoryItem
