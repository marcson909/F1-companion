import { Link } from "react-router-dom"
import ListGroup from 'react-bootstrap/ListGroup'

const RaceListSummary = (props) => {

    return (
      <ListGroup.Item>
        <Link to={`/race/${props.raceList.round}`}>{props.raceList.raceName}</Link>
      </ListGroup.Item>
    )
  }

export default RaceListSummary; 