import nc from 'next-connect-v0';
import { getSession } from '@auth0/nextjs-auth0';

import {
  handleUnauthorisedAPICall,
  checkPermissions,
  checkRole,
} from '@/lib/api-functions/server/utils';

import {
  updateProduct,
  removeProduct,
  getProducts,
  addProduct
} from '@/lib/api-functions/server/products/controllers'

import permissions from '@/lib/api-functions/server/permissions';

const {
  identifier,
  permissions: {
    products: {
      create: createProducts,
      read: readProducts,
      update: updateProducts,
      remove: removeProducts,
    },
  },
} = permissions;

const baseRoute = '/api/v1/products/:id?';

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
  attachParams: true,
})
  .use(async (req, res, next) => {
    if (req.method === 'GET') {
      return next();
    }
    try {
      const session = await getSession(req, res);
      req.user = session.user;
      next();
    } catch (err) {
      return handleUnauthorisedAPICall(res);
    }
  })
  .get(baseRoute, async (req, res) => {
    getProducts(req, res);
  })
  .post(baseRoute, async (req, res) => {
    if(!checkPermissions(req.user, identifier, createProducts)) {
      return handleUnauthorisedAPICall(res)
    }
    addProduct(req, res);
  })
  .put(baseRoute, async (req, res) => {
    if(!checkPermissions(req.user, identifier, updateProducts)) {
      return handleUnauthorisedAPICall(res)
    }
    updateProduct(req, res);
  })
  .delete(baseRoute, async (req, res) => {
    if(!checkPermissions(req.user, identifier, removeProducts)) {
      return handleUnauthorisedAPICall(res)
    }
    removeProduct(req, res);
  });

export default handler;
