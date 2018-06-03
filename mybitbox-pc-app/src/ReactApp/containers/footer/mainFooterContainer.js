import { connect } from 'react-redux'
import { ToggleScreen } from '../../actions/index'
import MainFooterComponent from '../../components/footer/mainFooterComponent';

const mapStateToProps = state => ({
    screen: state.MainScreenReducer
});

const mapDispatchToProps = dispatch => ({
    toggleScreen: screen => dispatch(ToggleScreen(screen))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainFooterComponent)