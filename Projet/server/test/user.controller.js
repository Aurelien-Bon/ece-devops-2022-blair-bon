const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {

  beforeEach(() => {
    // Clean DB before each test
    db.flushdb()
  })

  describe('Create', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        try{
          expect(err).to.not.be.equal(null)
          expect(result).to.be.equal(null)
          done()
        }catch(err){
          done(err)
        }
      })
    })

    it('avoid creating an existing user', (done)=> {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        userController.create(user, (err, result) => {
          try{
            expect(err).to.not.be.equal(null)
            expect(result).to.be.equal(null)
            done()
          }catch(err){
            done(err)
          }
        })
      })
    })
  })

  describe('Get', ()=> {

     it('get a user by username', (done) => {
        const user = {
          username: 'sergkudinov',
          firstname: 'Sergei',
          lastname: 'Kudinov'
        }
        userController.create(user, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal('OK')
          userController.get(user.username, (err, result) => {
            try{
              expect(err).to.be.equal(null)
              expect(result).to.not.be.equal(null)
              done()
            }
            catch(err){
              done(err)
            }
          })
        })
     })

     it('cannot get a user when it does not exist', (done) => {
        const user = {
          username: 'sergkudinov',
          firstname: 'Sergei',
          lastname: 'Kudinov'
        }
        userController.create(user, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal('OK')
          userController.get('sergkudRinov', (err, result) => {
            try{
              expect(err).to.not.be.equal(null)
              expect(result).to.be.equal(null)
              done()
            }
            catch(err){
              done(err)
            }
          })
        })
      })
  })
  describe('Update', ()=> {
     it('update a user by username', (done) => {
        const user = {
          username : 'sergkudinov',
          firstname: 'Sergei',
          lastname : 'Kudinov'
        }
        userController.create(user, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal('OK')
          userController.update(user.username, {firstname: 'Sergei2',lastname:'kudinov2'}, (err, result) => {
            try{
              expect(err).to.be.equal(null)
              expect(result).to.not.be.equal(null)
              done()
            }
            catch(err){
              done(err)
            }
          })
        })
      })
      it('cannot update a user when it does not exist', (done) => {
        const user = {
          username:'sergkudinov',
          firstname:'Sergei',
          lastname:'Kudinov'
        }
        userController.create(user, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal('OK')
          userController.update('sergkudRinov', {firstname: 'Sergei2',lastname:'kudinov2'}, (err, result) => {
            try{
              expect(err).to.not.be.equal(null)
              expect(result).to.be.equal(null)
              done()
            }
            catch(err){
              done(err)
            }
          })
        })
      })
  })
  describe('Delete', ()=> {
      it('delete a user by username', (done) => {
          const user = {
            username : 'sergkudinov',
            firstname: 'Sergei',
            lastname : 'Kudinov'
          }
          userController.create(user, (err, result) => {
            expect(err).to.be.equal(null)
            expect(result).to.be.equal('OK')
            userController.delete(user.username, (err, result) => {
              try{
                expect(err).to.be.equal(null)
                expect(result).to.not.be.equal(null)
                done()
              }
              catch(err){
                done(err)
              }
            })
          })
        })
        it('cannot delete a user when it does not exist', (done) => {
          const user = {
            username:'sergkudinov',
            firstname:'Sergei',
            lastname:'Kudinov'
          }
          userController.create(user, (err, result) => {
            expect(err).to.be.equal(null)
            expect(result).to.be.equal('OK')
            userController.delete('sergkudRinov', (err, result) => {
              try{
                expect(err).to.not.be.equal(null)
                expect(result).to.be.equal(null)
                done()
              }
              catch(err){
                done(err)
              }
            })
          })
        })
  })
})
