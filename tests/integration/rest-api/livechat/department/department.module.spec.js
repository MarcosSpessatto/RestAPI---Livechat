import {expect} from 'chai';
import {request, path} from '../../../common/base-config';
import httpStatus from '../../../../../imports/rest-api/constants/http-status';
import {departmentInsert, wrongDepartment} from './department-utils-mock';
import {errorAssertion} from '../../../common/assertion-common';
import {insertUpdateAssertion, listAssertion} from './department-assertion-common';
import messages from '../../../../../imports/rest-api/constants/messages';

describe('RestAPI -Livechat - DepartmentModule', () => {

  let departmentId;

  describe('POST - /department', () => {

    context('when execute successful', () => {
      it('should return the statusCode 200, and the correct response when create new department', (done) => {
        request.post(path('/department'))
          .send(departmentInsert)
          .expect('Content-Type', 'application/json')
          .expect(httpStatus.success)
          .expect(insertUpdateAssertion)
          .expect(response => {
            departmentId = response.body.department._id;
            expect(response.body.success).to.be.true
          })
          .end(done);
      });
    });

    context('when an error occurs', () => {

      it(`should return the statusCode 400, and an object with message and success false when 
    is missing some property on object passed`, (done) => {
        request.post(path('/department'))
          .send(wrongDepartment)
          .expect('Content-Type', 'application/json')
          .expect(httpStatus.badRequest)
          .expect(errorAssertion)
          .expect(response => expect(response.body.success).to.be.false)
          .end(done);
      });
    });

  });

  describe('PUT - /department/:_id', () => {

    context('when execute successful', () => {

      it('should return the statusCode 200, and the correct response when update an department', (done) => {
        request.put(path(`/department/${departmentId}`))
          .send(departmentInsert)
          .expect('Content-Type', 'application/json')
          .expect(httpStatus.success)
          .expect(insertUpdateAssertion)
          .expect(response => expect(response.body.success).to.be.true)
          .end(done);
      });
    });

    context('when an error occurs', () => {

      it(`should return the statusCode 400, and an object with message and success false when
    is missing some property on object passed`, (done) => {
        request.put(path(`/department/${departmentId}`))
          .send(wrongDepartment)
          .expect('Content-Type', 'application/json')
          .expect(httpStatus.badRequest)
          .expect(errorAssertion)
          .expect(response => expect(response.body.success).to.be.false)
          .end(done);
      });
    });

    context('when the department is not found', () => {
      it('should return the statusCode 404, and the correct response when the department is not found', (done) => {
        request.put(path(`/department/42343`))
          .send(departmentInsert)
          .expect('Content-Type', 'application/json')
          .expect(httpStatus.notFound)
          .expect(errorAssertion)
          .expect(response => {
            expect(response.body.success).to.be.false;
            expect(response.body.message).to.be.equal(messages.departmentNotFound);
          })
          .end(done);
      });
    });

  });

  describe('GET - /department', () => {

    context('when execute successful', () => {

      it('should return the statusCode 200, and the correct response when get list of departments', (done) => {
        request.get(path(`/department`))
          .expect('Content-Type', 'application/json')
          .expect(httpStatus.success)
          .expect(listAssertion)
          .expect(response => expect(response.body.success).to.be.true)
          .end(done);
      });
    });

  });

  describe('GET - /department/:_id', () => {

    context('when execute successful', () => {

      it('should return the statusCode 200, and the correct response when get info about department', (done) => {
        request.get(path(`/department/${departmentId}`))
          .expect('Content-Type', 'application/json')
          .expect(httpStatus.success)
          .expect(insertUpdateAssertion)
          .expect(response => expect(response.body.success).to.be.true)
          .end(done);
      });
    });

    context('when the department is not found', () => {
      it('should return the statusCode 404, and the correct response when the department is not found', (done) => {
        request.get(path(`/department/42343`))
          .expect('Content-Type', 'application/json')
          .expect(httpStatus.notFound)
          .expect(errorAssertion)
          .expect(response => {
            expect(response.body.success).to.be.false;
            expect(response.body.message).to.be.equal(messages.departmentNotFound);
          })
          .end(done);
      });
    });

  });

  describe('DELETE - /department/:_id', () => {

    context('when execute successful', () => {

      it('should return the statusCode 200, and the correct response when remove an department', (done) => {
        request.delete(path(`/department/${departmentId}`))
          .expect('Content-Type', 'application/json')
          .expect(httpStatus.success)
          .expect(response => expect(response.body.success).to.be.true)
          .end(done);
      });
    });

    context('when the department is not found', () => {
      it('should return the statusCode 404, and the correct response when the department is not found', (done) => {
        request.delete(path(`/department/42343`))
          .expect('Content-Type', 'application/json')
          .expect(httpStatus.notFound)
          .expect(errorAssertion)
          .expect(response => {
            expect(response.body.success).to.be.false;
            expect(response.body.message).to.be.equal(messages.departmentNotFound);
          })
          .end(done);
      });
    });
  });
});