import DashboardController from './DashboardController'
import OrderController from './OrderController'
import InquiryController from './InquiryController'
import OfferController from './OfferController'
import SavedListingController from './SavedListingController'
import PreOrderController from './PreOrderController'


const Buyer = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    OrderController: Object.assign(OrderController, OrderController),
    InquiryController: Object.assign(InquiryController, InquiryController),
    OfferController: Object.assign(OfferController, OfferController),
    SavedListingController: Object.assign(SavedListingController, SavedListingController),
    PreOrderController: Object.assign(PreOrderController, PreOrderController),
}

export default Buyer