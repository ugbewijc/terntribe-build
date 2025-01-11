/**
 * causes fields: title, description, image URL.
 */
import validator from "validator";
import CausesModel from "../models/CausesModel.js";
export default class CausesController {

    // Retrieve all causes.
    static async getAllCauses(req, res) {
        try {
            // Fetch all causes from the database
            const causes = await CausesModel.getAllCauses();
            
            // Send causes in the response with a success status code
            res.status(200).json({
                data: causes
            });
        } catch (error) {
            // Send an error response with a not found status code
            res.status(404).json({
                data: "Unable to retrieve cause"
            });
        }
    }

    // Retrieve a specific cause by ID.
    static async getCausesById(req, res) {
        try {
            const id = validator.escape(req.params.id).trim();
            const cause = await CausesModel.getCausesById(id);
            if (cause.length < 1) {
                throw new Error();
            }
            res.status(200).json({
                data: [cause]
            });   
        } catch (error) {
            res.status(404).json({
                data: ["Cause not found"]
            });
        }
    }

    // Create a new cause (fields: title, description, image URL).
    static async createCause(req, res) {
        try {
            const title = validator.escape(req.body.title).trim();
            const description = validator.escape(req.body.description).trim();
            const imageUrl = validator.escape(req.body.image_url).trim();
            if (!title || !description || !imageUrl) {
                throw new Error();
            }
            const cause = await CausesModel.createCauses({title, description, imageUrl});
            res.status(201).json({
                data: [cause]
            });   
        } catch (error) {
            // console.log(error);
            res.status(400).json({
                data: ["Unable to create cause"]
            });
        }
    }

    // Update a specific cause.
    static async updateCause(req, res) {
        try {
            const id = validator.escape(req.params.id).trim();
            const title = validator.escape(req.body.title).trim();
            const description = validator.escape(req.body.description).trim();
            const imageUrl = validator.escape(req.body.image_url).trim();
            if (!title || !description || !imageUrl) {
                throw new Error();
            }
            const cause = await CausesModel.updateCauses(id, {title, description, image_url: imageUrl});
            res.status(201).json({
                data: [cause]
            });   
        } catch (error) {
            // console.log(error);
            res.status(404).json({
                data: ["Unable to update cause"]
            });
        }
    }

    // Delete a cause.
    static async deleteCause(req, res) {
        try {
            const id = validator.escape(req.params.id).trim();
            const cause = await CausesModel.getCausesById(id);
            if (!cause) {
                throw new Error();
            }
            await CausesModel.deleteCauses(id);
            res.status(201).json({
                data: []
            });   
        } catch (error) {
            res.status(404).json({
                data: ["Cause not found"]
            });
        }
    }

    // Accept contributions to a cause (fields: name, email, amount).
    static async acceptContribution(req, res) {
        try {
            const id = validator.escape(req.params.id).trim();
            const name = validator.escape(req.body.name).trim();
            const email = validator.escape(req.body.email).trim();
            const amount = validator.escape(req.body.amount).trim();
            if (!name || !validator.isNumeric(amount) || amount <= 0 || !validator.isEmail(email)) {
                throw new Error();
                
            }
            const cause = await CausesModel.createContributions({ name, email, amount, causeId: id });
            if (!cause?.id) {
                throw new Error();
            }
            res.status(201).json({
                data: [cause]
            });   
        } catch (error) {
            
            res.status(404).json({
                data: ["Unable to accept contribution"]
            });
        }
    }
    
}