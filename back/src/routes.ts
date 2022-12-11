import { Router } from 'express'
import { CategoryController } from './controllers/CategoryController'
import { TransactionController } from './controllers/TransactionController'
import { UserController } from './controllers/UserController'
import authMiddleware from './middlewares/authMiddleware'
import validate from './middlewares/validate'
import cadasterSchema from './schemas/cadaster.schema'
const routes = Router()

routes.post('/users', new UserController().cadaster)
routes.post('/login', new UserController().login)


routes.use(authMiddleware)

routes.post('/transaction', new TransactionController().createTransaction)

routes.get('/users', new UserController().user)
routes.get('/categorys', new CategoryController().categorys)
routes.get('/transaction', new TransactionController().listTransactions)
routes.get('/transaction/:id', new TransactionController().transactionId)
routes.get('/extract', new TransactionController().extract)


routes.put('/users', new UserController().updateUser)
routes.put('/transaction/:id', new TransactionController().updateTransaction)

routes.delete("/transaction/:id", new TransactionController().deleteTransaction)

export default routes
