import { Router } from 'express'
import { CategoryController } from './controllers/CategoryController'
import { TransactionController } from './controllers/TransactionController'
import { UserController } from './controllers/UserController'
import authMiddleware from './middlewares/authMiddleware'
import validateSchema from './middlewares/yupValidate'
import cadasterSchema from './schemas/cadasterSchema'
import loginSchema from './schemas/loginSchema'
const routes = Router()

routes.post('/users', validateSchema(cadasterSchema), new UserController().cadaster)
routes.post('/login', validateSchema(loginSchema), new UserController().login)

routes.use(authMiddleware)

routes.post('/transaction', new TransactionController().createTransaction)

routes.get('/user', new UserController().user)
routes.get('/categories', new CategoryController().categories)
routes.get('/transactions', new TransactionController().listTransactions)
routes.get('/transaction/:id', new TransactionController().transactionId)
routes.get('/extract', new TransactionController().extract)


routes.put('/user', new UserController().updateUser)
routes.put('/transaction/:id', new TransactionController().updateTransaction)

routes.delete("/transaction/:id", new TransactionController().deleteTransaction)

export default routes
