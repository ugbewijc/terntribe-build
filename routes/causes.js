/**
 * Routes for causes
 * causes fields: title, description, image URL.
 * Endpoint:
 *      POST /causes: Create a new cause (fields: title, description, image URL).
 *      GET /causes: Retrieve all causes.
 *      GET /causes/:id: Retrieve a specific cause by ID.
 *      PUT /causes/:id: Update a specific cause.
 *      DELETE /causes/:id: Delete a cause.
 *      POST /causes/:id/contribute: Accept contributions to a cause (fields: name, email, amount).
 */

import express from 'express';
import CausesController from '../controllers/CausesController.js';

const causesRouter = express.Router();

// GET /causes: Retrieve all causes.
causesRouter.get('/', CausesController.getAllCauses);

// GET /causes/:id: Retrieve a specific cause by ID.
causesRouter.get('/:id',CausesController.getCausesById);

// POST /causes: Create a new cause (fields: title, description, image URL).
causesRouter.post('/', CausesController.createCause);

// POST /causes/:id/contribute: Accept contributions to a cause (fields: name, email, amount).
causesRouter.post('/:id/contribute', CausesController.acceptContribution);

// PUT /causes/:id: Update a specific cause.
causesRouter.put('/:id', CausesController.updateCause);

// DELETE /causes/:id: Delete a cause.
causesRouter.delete('/:id', CausesController.deleteCause);


export default causesRouter;