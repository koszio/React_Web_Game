import LoaderComponent from '../components/loaderComponent';
import {connect} from 'react-redux';
import {isLoading} from '../selectors/loaderSelectors';


const mapStateToProps = (state, ownProps) => ({
    showLoading : isLoading(state)
});

// Container for loader/spinner
const loaderContainer = connect(
    mapStateToProps
)(LoaderComponent);

export default loaderContainer;




