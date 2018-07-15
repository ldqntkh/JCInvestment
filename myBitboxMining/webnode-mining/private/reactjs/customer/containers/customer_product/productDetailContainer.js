import { connect } from 'react-redux'
import ProductDetailComponent from '../../components/customer_product/productDetailComponent';
import {
    AddListProduct,
    UpdateListProduct,
    DeleteProductFromList
} from '../../actions/customer_product/productAction';

const mapStateToProps = state => ({
    dataProduct : state.ProductDataReducer
});

const mapDispatchToProps = dispatch => ({
    addListProduct: dataProduct => dispatch(AddListProduct(dataProduct)),
    updateListProduct: dataProduct => dispatch(UpdateListProduct(dataProduct)),
    deleteProductFromList: dataProduct => dispatch(DeleteProductFromList(dataProduct))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetailComponent)