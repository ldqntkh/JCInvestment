import { connect } from 'react-redux'
import ListProductComponent from '../../components/product/listProductComponent';
import {
    AddListProduct,
    DeleteProductFromList
} from '../../actions/product/productAction';

const mapStateToProps = state => ({
    dataProduct : state.ProductDataReducer
});

const mapDispatchToProps = dispatch => ({
    addListProduct : dataProduct => dispatch(AddListProduct(dataProduct)),
    deleteProductFromList: dataProduct => dispatch(DeleteProductFromList(dataProduct))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListProductComponent)