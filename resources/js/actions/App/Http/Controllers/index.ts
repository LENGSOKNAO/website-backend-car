import Api from './Api'
import Seller from './Seller'
import FileController from './FileController'
import Admin from './Admin'
import Buyer from './Buyer'
import MessageController from './MessageController'
import Settings from './Settings'


const Controllers = {
    Api: Object.assign(Api, Api),
    Seller: Object.assign(Seller, Seller),
    FileController: Object.assign(FileController, FileController),
    Admin: Object.assign(Admin, Admin),
    Buyer: Object.assign(Buyer, Buyer),
    MessageController: Object.assign(MessageController, MessageController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers