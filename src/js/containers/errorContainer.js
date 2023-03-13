import {connect} from 'react-redux'
import ErrorComponent from '../components/errorComponent'

const mapStateToProps = (state, ownProps) => ({
  
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

// Error component container
const ErrorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorComponent)

export default ErrorContainer