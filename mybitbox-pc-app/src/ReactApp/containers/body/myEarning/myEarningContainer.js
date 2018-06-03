import { connect } from 'react-redux'
import MyEarningComponent from '../../../components/body/myEarning/myEarningComponent';
import { ToggleScreen } from '../../../actions/index'

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    toggleScreen: screen => dispatch(ToggleScreen(screen))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyEarningComponent)