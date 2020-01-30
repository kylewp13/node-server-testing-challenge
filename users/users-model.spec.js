const Users = require('./users-model');
const db = require('../data/dbConfig');

const newUser = {
    "username": "Test1",
    "password": "Test1"
}

describe('users model', () => {
    // deleting the db
    beforeEach(async () => {
        await db('users').truncate();
    })

    //Making sure the db Was deleted
    describe('db is empty', () => {
        it('is empty', async () => {
            const dbData = await db('users')
            expect(dbData).toHaveLength(0)
        })
    })

    //Making sure that the db is running on test environment
    describe('test env', () => {
        it('we are using the testing env db', async () => {
            const dbEnv = await process.env.DB_CONFIG;
            expect(dbEnv).toBe('testing');
        })
    })

    //find()
    describe('find()', () => {
        it('db is empty', async () => {
            const dbData = await Users.find()
            expect(dbData).toHaveLength(0)
        })
    })

    //add()
    describe('add()', () => {
        it('add user to db', async () => {
            await Users.add(newUser)
            const dbData = await Users.find()
            expect(dbData).toHaveLength(1)
        })
    })

    //findById()
    describe('findById()', () => {
        it('finds the user with user_id of 1', async () => {
            await Users.add(newUser)
            await Users.findById(1).then(res => {
                expect(res.user_id).toBe(1)
            })
        })
    })
    
    //remove()
    describe('remove()', () => {
        it('db is empty because of remove()', async () => {
            await Users.add(newUser)
            let dbData = await db('users')
            expect(dbData).toHaveLength(1)
            await Users.remove(1)
            dbData = await db('users')
            expect(dbData).toHaveLength(0)
        })
    })        
})