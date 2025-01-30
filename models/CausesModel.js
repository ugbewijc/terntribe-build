/**
 * 
 */
import { dbSqlite3 } from "./db.js";

export default class CausesModel {
    static async getAllCauses() {
        return new Promise((resolve, reject) => {
            const getCauses = dbSqlite3.prepare(`SELECT * FROM causes`);
            getCauses.all([], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    static async getCausesById(id) {
        return new Promise((resolve, reject) => {
            const getCausesById = dbSqlite3.prepare(`SELECT * FROM causes WHERE id = ?`);
            getCausesById.get([id], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        })
    }

    static async createCauses(cause) {

        const { title, description, imageUrl } = cause;
        const testCreate = dbSqlite3.prepare(`INSERT INTO causes (id, title, description, image_url) VALUES (?, ?, ?, ?)
                RETURNING id, title, description, image_url`);
        return new Promise((resolve, reject) => {
            testCreate.get([`${Date.now()}`, title, description, imageUrl], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            })
            testCreate.finalize();
        });
    }

    static async updateCauses(id, cause) {
        const { title, description, image_url } = cause;
        const causeData = dbSqlite3.prepare(`UPDATE causes SET title = ?, description = ?, image_url = ? WHERE id = ? RETURNING id, title, description, image_url`);
        return new Promise((resolve, reject) => {
            causeData.get([title, description, image_url, id], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            })
            causeData.finalize();
        });
    }

    static async deleteCauses(id) {
        return new Promise((resolve, reject) => {
            const deleteCause = dbSqlite3.prepare(`DELETE FROM causes WHERE id = ?`);
            deleteCause.get([id], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            })
        })
    }

    static async createContributions(contribution) {
        const validateCause = await this.getCausesById(contribution.causeId);
        if (!validateCause) {
            throw new Error();
        }
        const { name, email, amount, causeId } = contribution;
        const testCreate = dbSqlite3.prepare(`INSERT INTO contributions (id, name, email, amount, causeId) VALUES (?, ?, ?, ?, ?)
                RETURNING id, name, email, amount, causeId`);
        return new Promise((resolve, reject) => {
            testCreate.get([`${Date.now()}`, name, email, amount, causeId], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            })
            testCreate.finalize();
        })
    }
}