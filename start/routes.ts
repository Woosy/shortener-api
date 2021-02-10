/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

// -------------------------------------
// Random routes
// -------------------------------------
Route.get('/health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})

// -------------------------------------
// Authentication routes
// -------------------------------------

Route.group(() => {
  Route.post('/register', 'AuthController.register')
  Route.post('/validate_email', 'AuthController.validateEmail')
  Route.post('/configure', 'AuthController.configure').middleware('auth')

  Route.post('/logout', 'AuthController.logout')
  Route.post('/login', 'AuthController.login')
  Route.get('/user', 'AuthController.getUser').middleware('auth')
}).prefix('auth')

// -------------------------------------
// User routes
// -------------------------------------

Route.group(() => {
  Route.get('/workspace', 'UsersController.getWorkspace')
  Route.get('/workspaces', 'UsersController.getWorkspaces')
}).prefix('users').middleware(['auth'])

// -------------------------------------
// Workspace routes
// -------------------------------------

Route.group(() => {
  Route.post('/', 'WorkspacesController.create')

  Route.delete('/:workspaceId', 'WorkspacesController.delete')
  Route.get('/:workspaceId', 'WorkspacesController.getById')

  Route.post('/:workspaceId/members', 'WorkspacesController.addMember').middleware(['owner-only'])
  Route.delete('/:workspaceId/members/:memberId', 'WorkspacesController.removeMember').middleware(['owner-only'])
}).prefix('workspaces').middleware(['auth'])
