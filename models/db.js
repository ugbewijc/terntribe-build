/**
 * 
 */
import sqlite3 from 'sqlite3';

export const dbSqlite3 = process.env.NODE_ENV === 'testing' ? new sqlite3.Database('./test_db.sqlite') : new sqlite3.Database('./db.sqlite');
export const initilizeDb = () => {
    try {
        console.log('initializing Tables');
        dbSqlite3.serialize(() => {
            dbSqlite3.run(`PRAGMA foreign_keys = ON`);
            dbSqlite3.run('CREATE TABLE IF NOT EXISTS causes (id TEXT PRIMARY KEY , title TEXT, description TEXT, image_url TEXT)')
                .run(`CREATE TABLE IF NOT EXISTS contributions (id TEXT PRIMARY KEY, name TEXT, email TEXT, amount INTEGER, causeId TEXT, 
        CONSTRAINT fk_causeId FOREIGN KEY (causeId) REFERENCES causes(id) ON DELETE SET NULL)`);
        });
    } catch (error) {
        if (error.code === 'SQLITE_ERROR') {
            throw error;
        }
    }

}