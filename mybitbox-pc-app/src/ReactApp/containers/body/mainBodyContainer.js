import { connect } from 'react-redux'
import MainBodyComponent from '../../components/body/mainBodyComponent';
import { ToggleScreen } from '../../actions/index'

const mapStateToProps = state => ({
    screen: state.MainScreenReducer
});

const mapDispatchToProps = dispatch => ({
    toggleScreen: screen => dispatch(ToggleScreen(screen))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainBodyComponent)