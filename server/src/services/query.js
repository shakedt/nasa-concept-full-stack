const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_LIMIT = 0; // In mongo when we pass in 0 for the limit we get all the data back


function getPagination(query) {
    const page = Math.abs(query.page) || DEFAULT_PAGE; // abs for positive and number type corrsion
    const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
    const skip = (page - 1) * limit;

    return {
        skip,
        limit
    }
}

module.exports = {
    getPagination
}