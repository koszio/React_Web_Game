import {connect} from 'react-redux'
import AboutComponent from '../components/aboutComponent'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
  
})

// Container for the about page
const AboutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutComponent)

export default AboutContainer
