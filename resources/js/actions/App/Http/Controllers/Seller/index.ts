import Admin from './Admin'
import DashboardController from './DashboardController'
import CarController from './CarController'
import OrderController from './OrderController'
import InquiryController from './InquiryController'
import PreOrderController from './PreOrderController'
import ReviewController from './ReviewController'
import ProfileController from './ProfileController'
import BannerController from './BannerController'
import HeroController from './HeroController'
const Seller = {
    Admin: Object.assign(Admin, Admin),
DashboardController: Object.assign(DashboardController, DashboardController),
CarController: Object.assign(CarController, CarController),
OrderController: Object.assign(OrderController, OrderController),
InquiryController: Object.assign(InquiryController, InquiryController),
PreOrderController: Object.assign(PreOrderController, PreOrderController),
ReviewController: Object.assign(ReviewController, ReviewController),
ProfileController: Object.assign(ProfileController, ProfileController),
BannerController: Object.assign(BannerController, BannerController),
HeroController: Object.assign(HeroController, HeroController),
}

export default Seller