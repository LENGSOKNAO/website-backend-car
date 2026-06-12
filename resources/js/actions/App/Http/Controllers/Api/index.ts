import BannerController from './BannerController'
import HeroController from './HeroController'
import AuthController from './AuthController'
import UserController from './UserController'
import ListingController from './ListingController'
import ProductController from './ProductController'
import MakeController from './MakeController'
import SavedListingController from './SavedListingController'
import InquiryController from './InquiryController'
import OrderController from './OrderController'
import MessageController from './MessageController'
const Api = {
    BannerController: Object.assign(BannerController, BannerController),
HeroController: Object.assign(HeroController, HeroController),
AuthController: Object.assign(AuthController, AuthController),
UserController: Object.assign(UserController, UserController),
ListingController: Object.assign(ListingController, ListingController),
ProductController: Object.assign(ProductController, ProductController),
MakeController: Object.assign(MakeController, MakeController),
SavedListingController: Object.assign(SavedListingController, SavedListingController),
InquiryController: Object.assign(InquiryController, InquiryController),
OrderController: Object.assign(OrderController, OrderController),
MessageController: Object.assign(MessageController, MessageController),
}

export default Api