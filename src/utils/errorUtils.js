export const getErrorMessage = (error) => {
    switch (error.name) {
        case 'MongoError':
            return 'There was a duplicate key error';
        case 'ValidationError':
            return Object.values(error.errors).at(0).message;
        default:
            return error.message;
    }
}