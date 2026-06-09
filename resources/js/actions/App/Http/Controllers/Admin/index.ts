import DashboardController from './DashboardController'
import EmployeeController from './EmployeeController'
import SellerController from './SellerController'
import UserController from './UserController'
import CarController from './CarController'
import CategoryController from './CategoryController'
import MakesModelsController from './MakesModelsController'
import MakeController from './MakeController'
import ModelController from './ModelController'
import ConditionController from './ConditionController'
import FuelTypeController from './FuelTypeController'
import TransmissionController from './TransmissionController'
import OrderController from './OrderController'
import VehicleHistoryController from './VehicleHistoryController'
import WarrantyController from './WarrantyController'
import ServiceAppointmentController from './ServiceAppointmentController'
import PreOrderController from './PreOrderController'


const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    EmployeeController: Object.assign(EmployeeController, EmployeeController),
    SellerController: Object.assign(SellerController, SellerController),
    UserController: Object.assign(UserController, UserController),
    CarController: Object.assign(CarController, CarController),
    CategoryController: Object.assign(CategoryController, CategoryController),
    MakesModelsController: Object.assign(MakesModelsController, MakesModelsController),
    MakeController: Object.assign(MakeController, MakeController),
    ModelController: Object.assign(ModelController, ModelController),
    ConditionController: Object.assign(ConditionController, ConditionController),
    FuelTypeController: Object.assign(FuelTypeController, FuelTypeController),
    TransmissionController: Object.assign(TransmissionController, TransmissionController),
    OrderController: Object.assign(OrderController, OrderController),
    VehicleHistoryController: Object.assign(VehicleHistoryController, VehicleHistoryController),
    WarrantyController: Object.assign(WarrantyController, WarrantyController),
    ServiceAppointmentController: Object.assign(ServiceAppointmentController, ServiceAppointmentController),
    PreOrderController: Object.assign(PreOrderController, PreOrderController),
}

export default Admin