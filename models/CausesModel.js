/**
 * 
 */
import db from "./lowdb.js";

export default class CausesModel {
    static async getAllCauses() {
        return db.data.causes || [];
    }

    static async getCausesById(id) {
        return db.data.causes.find(cause => cause.id == id) || [];
    }

    static async createCauses(cause) {
        const { title, description, imageUrl } = cause;
        const newCause = { id: Date.now(), title, description, image_url: imageUrl };
        db.data.causes.push(newCause);
        await db.write();        
        return newCause;
    }

    static async updateCauses(id, cause) {
        const index = db.data.causes.findIndex(cause => cause.id == id);
        if(index < 0) {
            throw new Error();
        }
        db.data.causes[index] = { ...db.data.causes[index], ...cause };
        await db.write();
        return db.data.causes[index];
    }

    static async deleteCauses(id) {
        const index = db.data.causes.findIndex(cause => cause.id == id);
        if(index < 0) {
            throw new Error();
        }
        // uncomment the below line to delete all contributions for the cause
        // db.data.contributions = db.data.contributions.filter(contribution => contribution.causeId != id);
        db.data.causes.splice(index, 1);
        await db.write();
        return id;
    }

    // static async getAllContributions() {
    //     return db.data.contributions || [];
    // }

    static async createContributions(contribution) {
        const { name, email, amount, causeId } = contribution;
        const cause = await this.getCausesById(causeId);
        if(cause.length == 0) {
            throw new Error();
        }
        const newContribution = { id: Date.now(), name, email, amount, causeId };
        db.data.contributions.push(newContribution);
        await db.write();
        return newContribution;
    }
}