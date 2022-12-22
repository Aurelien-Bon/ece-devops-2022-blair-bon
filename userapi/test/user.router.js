const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')
const db = require('../src/dbClient')

chai.use(chaiHttp)

describe('User REST API', () => {

    beforeEach(() => {
      // Clean DB before each test
      db.flushdb()
    })

    after(() => {
      app.close()
      db.quit()
    })

  describe('POST /user', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .query(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           done(err)
        })
    })
    it('pass wrong parameters', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
      }
      chai.request(app)
        .post('/user')
        .query(user)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           done(err)
        })
    })
  })

  describe('GET /user', ()=> {
    it('get a user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
      .post('/user')
      .query(user)
      .then((res) => {
        chai.expect(res).to.have.status(201)
        chai.expect(res.body.status).to.equal('success')
        chai.expect(res).to.be.json
        chai.request(app)
        .get('/user/sergkudinov')
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
      })
      .catch((err) => {
          done(err)
      })
    })
    it('pass user not exist', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
      .post('/user')
      .query(user)
      .then((res) => {
        chai.expect(res).to.have.status(201)
        chai.expect(res.body.status).to.equal('success')
        chai.expect(res).to.be.json
        chai.request(app)
        .get('/user/sergkRudinov')
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
      })
      .catch((err) => {
          done(err)
      })
    })
  })
  describe('PUT /user', ()=> {
    it('update a user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
      .post('/user')
      .query(user)
      .then((res) => {
        chai.expect(res).to.have.status(201)
        chai.expect(res.body.status).to.equal('success')
        chai.expect(res).to.be.json
        chai.request(app)
        .put('/user/sergkudinov')
        .query({firstname: 'Sergei5', lastname: 'Kudinov5'})
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
            done(err)
        })
      })
      .catch((err) => {
          done(err)
      })
    })
    it('pass user not exist', (done) => {
      const user = {
        username:'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
      .post('/user')
      .query(user)
      .then((res) => {
        chai.expect(res).to.have.status(201)
        chai.expect(res.body.status).to.equal('success')
        chai.expect(res).to.be.json
        chai.request(app)
        .put('/user/sergkRudinov')
        .query({firstname: 'Sergei5', lastname: 'Kudinov5'})
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
            done(err)
        })
      })
      .catch((err) => {
          done(err)
      })
    })
  })
  describe('DELETE /user', ()=> {
    const user = {
      username:'sergkudinov',
      firstname: 'Sergei',
      lastname: 'Kudinov'
    }
    it('delete a user', (done) => {
      chai.request(app)
      .post('/user')
      .query(user)
      .then((res) => {
        chai.expect(res).to.have.status(201)
        chai.expect(res.body.status).to.equal('success')
        chai.expect(res).to.be.json
        chai.request(app)
        .delete('/user/sergkudinov')
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
            done(err)
        })
      })
      .catch((err) => {
          done(err)
      })
    })
    it('pass user not exist', (done) => {
      const user = {
        username:'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
      .post('/user')
      .query(user)
      .then((res) => {
        chai.expect(res).to.have.status(201)
        chai.expect(res.body.status).to.equal('success')
        chai.expect(res).to.be.json
        chai.request(app)
        .delete('/user/sergkRudinov')
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
            done(err)
        })
      })
      .catch((err) => {
          done(err)
      })
    })
  })
})
