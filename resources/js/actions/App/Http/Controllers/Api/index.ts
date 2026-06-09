import BannerController from './BannerController'
import HeroController from './HeroController'
import AuthController from './AuthController'
import MakeController from './MakeController'
import ListingController from './ListingController'
import SavedListingController from './SavedListingController'
import InquiryController from './InquiryController'
import OfferController from './OfferController'
import MessageController from './MessageController'


const Api = {
    BannerController: Object.assign(BannerController, BannerController),
    HeroController: Object.assign(HeroController, HeroController),
    AuthController: Object.assign(AuthController, AuthController),
    MakeController: Object.assign(MakeController, MakeController),
    ListingController: Object.assign(ListingController, ListingController),
    SavedListingController: Object.assign(SavedListingController, SavedListingController),
    InquiryController: Object.assign(InquiryController, InquiryController),
    OfferController: Object.assign(OfferController, OfferController),
    MessageController: Object.assign(MessageController, MessageController),
}

export default Api