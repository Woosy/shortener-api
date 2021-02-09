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

Route.get('/health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})

// Authentication routes
Route.post('/auth/register', 'AuthController.register')
Route.post('/auth/validate_email', 'AuthController.validateEmail')
Route.post('/auth/configure', 'AuthController.configure').middleware('auth')

Route.post('/auth/login', 'AuthController.login')
Route.post('/auth/logout', 'AuthController.logout')
Route.get('/auth/user', 'AuthController.getUser').middleware('auth')

// User routes
Route.get('/users/workspace', 'UsersController.getWorkspace').middleware('auth')
Route.get('/users/workspaces', 'UsersController.getWorkspaces').middleware('auth')

// Workspace routes
Route.post('/workspaces', 'WorkspacesController.create').middleware('auth')
Route.delete('/workspaces/:workspaceId', 'WorkspacesController.delete').middleware('auth')
Route.get('/workspaces/:workspaceId', 'WorkspacesController.getById').middleware('auth')
Route.post('/workspaces/:workspaceId/members', 'WorkspacesController.addMember').middleware('auth')
