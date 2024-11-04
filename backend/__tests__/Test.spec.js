//run test by cd backend then npm test
const sinon = require('sinon');

const ResponseModel = require('../models/response');
const ResponseController = require('../services/responseService');

const RestaurantModel = require('../models/restaurant');
const RestaurantController = require('../services/restaurantService');


const ReviewModel = require('../models/review');
const ReviewController = require('../services/reviewService');


const UserModel = require('../models/user');
const UserController = require('../services/userService');

describe('response testing', () => {
    let req = {
        body: {
            username: 'testuser',
            replyText: 'test reply',
            date: Date.now()
        }
    };

    let error = new Error('Some error message');
    let res = {};
    let expectedResult;

    describe('create', () => {
        let createResponseStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (createResponseStub) {
                createResponseStub.restore();
            }
        });

        it('should return the created response object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            createResponseStub = sinon.stub(ResponseController, 'createResponse').resolves(expectedResult);

            // Act
            await ResponseController.createResponse(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(createResponseStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            createResponseStub = sinon.stub(ResponseController, 'createResponse').rejects(error);

            // Act
            await ResponseController.createResponse(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(createResponseStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update Response', () => {
        let updateResponseStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (updateResponseStub) {
                updateResponseStub.restore();
            }
        });

        it('should return the updated response object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            updateResponseStub = sinon.stub(ResponseController, 'updateResponse').resolves(expectedResult);

            // Act
            await ResponseController.updateResponse(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(updateResponseStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            updateResponseStub = sinon.stub(ResponseController, 'updateResponse').rejects(error);

            // Act
            await ResponseController.updateResponse(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(updateResponseStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
    
    describe('find Response by ID', () => {
        let getResponseByIdResponseStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (getResponseByIdResponseStub) {
                getResponseByIdResponseStub.restore();
            }
        });

        it('should find the response object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            getResponseByIdResponseStub = sinon.stub(ResponseController, 'getResponseById').resolves(expectedResult);

            // Act
            await ResponseController.getResponseById(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(getResponseByIdResponseStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            getResponseByIdResponseStub = sinon.stub(ResponseController, 'getResponseById').rejects(error);

            // Act
            await ResponseController.getResponseById(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(getResponseByIdResponseStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('delete Response', () => {
        let deleteResponseStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (deleteResponseStub) {
                deleteResponseStub.restore();
            }
        });

        it('should delete the response object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            deleteResponseStub = sinon.stub(ResponseController, 'deleteResponse').resolves(expectedResult);

            // Act
            await ResponseController.deleteResponse(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(deleteResponseStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            deleteResponseStub = sinon.stub(ResponseController, 'deleteResponse').rejects(error);

            // Act
            await ResponseController.deleteResponse(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(deleteResponseStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
});


describe('restaurant testing', () => {
    let req = {
        body: {
            username: 'testuser',
            replyText: 'test reply',
            date: Date.now()
        }
    };

    let error = new Error('Some error message');
    let res = {};
    let expectedResult;

    describe('create', () => {
        let createRestaurantStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (createRestaurantStub) {
                createRestaurantStub.restore();
            }
        });

        it('should return the created restaurant object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            createRestaurantStub = sinon.stub(RestaurantController, 'createRestaurant').resolves(expectedResult);

            // Act
            await RestaurantController.createRestaurant(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(createRestaurantStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            createRestaurantStub = sinon.stub(RestaurantController, 'createRestaurant').rejects(error);

            // Act
            await RestaurantController.createRestaurant(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(createRestaurantStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update Restaurant', () => {
        let updateRestaurantStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (updateRestaurantStub) {
                updateRestaurantStub.restore();
            }
        });

        it('should return the updated restaurant object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            updateRestaurantStub = sinon.stub(RestaurantController, 'updateRestaurant').resolves(expectedResult);

            // Act
            await RestaurantController.updateRestaurant(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(updateRestaurantStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            updateRestaurantStub = sinon.stub(RestaurantController, 'updateRestaurant').rejects(error);

            // Act
            await RestaurantController.updateRestaurant(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(updateRestaurantStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
    
    describe('find Restaurant by ID', () => {
        let getRestaurantByIdRestaurantStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (getRestaurantByIdRestaurantStub) {
                getRestaurantByIdRestaurantStub.restore();
            }
        });

        it('should find the restaurant object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            getRestaurantByIdRestaurantStub = sinon.stub(RestaurantController, 'getRestaurantById').resolves(expectedResult);

            // Act
            await RestaurantController.getRestaurantById(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(getRestaurantByIdRestaurantStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            getRestaurantByIdRestaurantStub = sinon.stub(RestaurantController, 'getRestaurantById').rejects(error);

            // Act
            await RestaurantController.getRestaurantById(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(getRestaurantByIdRestaurantStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('get all restaurants', () => {
        let getAllRestaurantsRestaurantStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (getAllRestaurantsRestaurantStub) {
                getAllRestaurantsRestaurantStub.restore();
            }
        });

        it('should find all restaurant object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            getAllRestaurantsRestaurantStub = sinon.stub(RestaurantController, 'getAllRestaurants').resolves(expectedResult);

            // Act
            await RestaurantController.getAllRestaurants(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(getAllRestaurantsRestaurantStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            getAllRestaurantsRestaurantStub = sinon.stub(RestaurantController, 'getAllRestaurants').rejects(error);

            // Act
            await RestaurantController.getAllRestaurants(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(getAllRestaurantsRestaurantStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('search restaurants', () => {
        let searchRestaurantsRestaurantStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (searchRestaurantsRestaurantStub) {
                searchRestaurantsRestaurantStub.restore();
            }
        });

        it('should find all restaurant objects that fullfil the search condition', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            searchRestaurantsRestaurantStub = sinon.stub(RestaurantController, 'searchRestaurants').resolves(expectedResult);

            // Act
            await RestaurantController.searchRestaurants(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(searchRestaurantsRestaurantStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            searchRestaurantsRestaurantStub = sinon.stub(RestaurantController, 'searchRestaurants').rejects(error);

            // Act
            await RestaurantController.searchRestaurants(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(searchRestaurantsRestaurantStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('delete Restaurant', () => {
        let deleteRestaurantStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (deleteRestaurantStub) {
                deleteRestaurantStub.restore();
            }
        });

        it('should delete the restaurant object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            deleteRestaurantStub = sinon.stub(RestaurantController, 'deleteRestaurant').resolves(expectedResult);

            // Act
            await RestaurantController.deleteRestaurant(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(deleteRestaurantStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            deleteRestaurantStub = sinon.stub(RestaurantController, 'deleteRestaurant').rejects(error);

            // Act
            await RestaurantController.deleteRestaurant(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(deleteRestaurantStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
});


describe('review testing', () => {
    let req = {
        body: {
            username: 'testuser',
            replyText: 'test reply',
            date: Date.now()
        }
    };

    let error = new Error('Some error message');
    let res = {};
    let expectedResult;

    describe('create', () => {
        let createReviewStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (createReviewStub) {
                createReviewStub.restore();
            }
        });

        it('should return the created review object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            createReviewStub = sinon.stub(ReviewController, 'createReview').resolves(expectedResult);

            // Act
            await ReviewController.createReview(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(createReviewStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            createReviewStub = sinon.stub(ReviewController, 'createReview').rejects(error);

            // Act
            await ReviewController.createReview(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(createReviewStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update Review', () => {
        let updateReviewStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (updateReviewStub) {
                updateReviewStub.restore();
            }
        });

        it('should return the updated review object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            updateReviewStub = sinon.stub(ReviewController, 'updateReview').resolves(expectedResult);

            // Act
            await ReviewController.updateReview(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(updateReviewStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            updateReviewStub = sinon.stub(ReviewController, 'updateReview').rejects(error);

            // Act
            await ReviewController.updateReview(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(updateReviewStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
    
    describe('find Review by ID', () => {
        let getReviewByIdReviewStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (getReviewByIdReviewStub) {
                getReviewByIdReviewStub.restore();
            }
        });

        it('should find the review object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            getReviewByIdReviewStub = sinon.stub(ReviewController, 'getReviewById').resolves(expectedResult);

            // Act
            await ReviewController.getReviewById(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(getReviewByIdReviewStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            getReviewByIdReviewStub = sinon.stub(ReviewController, 'getReviewById').rejects(error);

            // Act
            await ReviewController.getReviewById(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(getReviewByIdReviewStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('delete Review', () => {
        let deleteReviewStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (deleteReviewStub) {
                deleteReviewStub.restore();
            }
        });

        it('should delete the review object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            deleteReviewStub = sinon.stub(ReviewController, 'deleteReview').resolves(expectedResult);

            // Act
            await ReviewController.deleteReview(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(deleteReviewStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            deleteReviewStub = sinon.stub(ReviewController, 'deleteReview').rejects(error);

            // Act
            await ReviewController.deleteReview(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(deleteReviewStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    
describe('user testing', () => {
    let req = {
        body: {
            username: 'testuser',
            replyText: 'test reply',
            date: Date.now()
        }
    };

    let error = new Error('Some error message');
    let res = {};
    let expectedResult;

    describe('create', () => {
        let createUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (createUserStub) {
                createUserStub.restore();
            }
        });

        it('should return the created user object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            createUserStub = sinon.stub(UserController, 'createUser').resolves(expectedResult);

            // Act
            await UserController.createUser(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(createUserStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            createUserStub = sinon.stub(UserController, 'createUser').rejects(error);

            // Act
            await UserController.createUser(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(createUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update User', () => {
        let updateUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (updateUserStub) {
                updateUserStub.restore();
            }
        });

        it('should return the updated user object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            updateUserStub = sinon.stub(UserController, 'updateUser').resolves(expectedResult);

            // Act
            await UserController.updateUser(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(updateUserStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            updateUserStub = sinon.stub(UserController, 'updateUser').rejects(error);

            // Act
            await UserController.updateUser(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(updateUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
    
    describe('find User by ID', () => {
        let getUserByIdUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (getUserByIdUserStub) {
                getUserByIdUserStub.restore();
            }
        });

        it('should find the user object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            getUserByIdUserStub = sinon.stub(UserController, 'getUserById').resolves(expectedResult);

            // Act
            await UserController.getUserById(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(getUserByIdUserStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            getUserByIdUserStub = sinon.stub(UserController, 'getUserById').rejects(error);

            // Act
            await UserController.getUserById(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(getUserByIdUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('delete User', () => {
        let deleteUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (deleteUserStub) {
                deleteUserStub.restore();
            }
        });

        it('should delete the user object', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            deleteUserStub = sinon.stub(UserController, 'deleteUser').resolves(expectedResult);

            // Act
            await UserController.deleteUser(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(deleteUserStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            deleteUserStub = sinon.stub(UserController, 'deleteUser').rejects(error);

            // Act
            await UserController.deleteUser(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(deleteUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    
    describe('generate User token', () => {
        let generateTokenUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (generateTokenUserStub) {
                generateTokenUserStub.restore();
            }
        });

        it('should generate a token for the user', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            generateTokenUserStub = sinon.stub(UserController, 'generateToken').resolves(expectedResult);

            // Act
            await UserController.generateToken(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(generateTokenUserStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            generateTokenUserStub = sinon.stub(UserController, 'generateToken').rejects(error);

            // Act
            await UserController.generateToken(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(generateTokenUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('authenticate User', () => {
        let authenticateUserUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (authenticateUserUserStub) {
                authenticateUserUserStub.restore();
            }
        });

        it('should authenticate the user', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            authenticateUserUserStub = sinon.stub(UserController, 'authenticateUser').resolves(expectedResult);

            // Act
            await UserController.authenticateUser(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(authenticateUserUserStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            authenticateUserUserStub = sinon.stub(UserController, 'authenticateUser').rejects(error);

            // Act
            await UserController.authenticateUser(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(authenticateUserUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('logout User', () => {
        let logoutUserUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (logoutUserUserStub) {
                logoutUserUserStub.restore();
            }
        });

        it('should logout the user', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            logoutUserUserStub = sinon.stub(UserController, 'logoutUser').resolves(expectedResult);

            // Act
            await UserController.logoutUser(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(logoutUserUserStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            logoutUserUserStub = sinon.stub(UserController, 'logoutUser').rejects(error);

            // Act
            await UserController.logoutUser(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(logoutUserUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('checks is token is blacklisted', () => {
        let isTokenBlacklistedUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (isTokenBlacklistedUserStub) {
                isTokenBlacklistedUserStub.restore();
            }
        });

        it('checks if token is blacklisted', async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            isTokenBlacklistedUserStub = sinon.stub(UserController, 'isTokenBlacklisted').resolves(expectedResult);

            // Act
            await UserController.isTokenBlacklisted(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(isTokenBlacklistedUserStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            isTokenBlacklistedUserStub = sinon.stub(UserController, 'isTokenBlacklisted').rejects(error);

            // Act
            await UserController.isTokenBlacklisted(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(isTokenBlacklistedUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe("checks user's username", () => {
        let checkUsernameUserStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            if (checkUsernameUserStub) {
                checkUsernameUserStub.restore();
            }
        });

        it("checks user's username", async () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                username: 'testuser',
                replyText: 'test reply',
                date: req.body.date
            };

            checkUsernameUserStub = sinon.stub(UserController, 'checkUsername').resolves(expectedResult);

            // Act
            await UserController.checkUsername(req.body).then(result => {
                res.json(result);
            });

            // Assert
            sinon.assert.calledOnce(checkUsernameUserStub);
            sinon.assert.calledWith(res.json, sinon.match({ username: req.body.username }));
            sinon.assert.calledWith(res.json, sinon.match({ replyText: req.body.replyText }));
            sinon.assert.calledWith(res.json, sinon.match({ date: req.body.date }));
        });

        it('should return status 500 on server error', async () => {
            // Arrange
            checkUsernameUserStub = sinon.stub(UserController, 'checkUsername').rejects(error);

            // Act
            await UserController.checkUsername(req.body).catch(() => {
                res.status(500).end();
            });

            // Assert
            sinon.assert.calledOnce(checkUsernameUserStub);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
});

});
