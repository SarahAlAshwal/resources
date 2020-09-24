require('dotevn').config();
const { Pool } = require('pg');
const pool = new Pool({
  user: labber,
  password: labber,
  host: localhost,
  database: midterm
});
/*
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
});
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE email like $1;`
  ,[email])
  .then(res => res.rows[0])
  .catch(rej => null);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE id like $1;`
  ,[id])
  .then(res => res.rows[0])
  .catch(rej => null);
}
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{first_name: string,last_name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  pool.query(`
  INSERT INTO users (
    frist_name, last_name , email , password )
    VALUES
    ($1,$2,$3,$4) RETURNING *;
`,[user.frist_name, user.last_name, user.email, user.password]).then(res => res.rows[0]);
}
exports.addUser = addUser;

/// Resources

/**
 * Get all resources for a single user.
 * @param {string} user_id The id of the user.
 * @return {Promise<[{}]>} A promise to the resources.
 */
const getAllResources = function(user_id) {
  return pool.query(`
    SELECT resources.*, AVG(rating) as average_rating
    FROM resources
    JOIN rates ON resources.id = resource_id
    JOIN users ON users.id = resources.user_id
    WHERE users.id = $1
    GROUP BY resources.id
    ORDER BY resources.created_at;
  `,[user_id]).then(res => res.rows);
}
exports.getAllResources = getAllResources;

/**
 * add new resource for a single user.
 * @param {string} user_id The id of the user.
 * @return {Promise<[{}]>} A promise to the resources.
 */

const addResource = function(resource) {
  let values =[
    resource.title,
    resource.url,
    resource.description,
    resource.category,
    resource.user_id];

  pool.query(`
  INSERT INTO resources (
    title,
    url,
    description,
    category,
    user_id)
    VALUES (
    $1, $2, $3, $4, $5) RETURNING *;
  `,values).then(res => res.rows[0]);
}
exports.addResource = addResource;
/// Comments

/**
 * Get all Comments for a single user.
 * @param {string} resource_id The id of the resource.
 * @return {Promise<[{}]>} A promise to the resources.
 */
const getAllComments = function(resource_id) {
  return pool.query(`
    SSELECT comments.content, comments.user_id
    FROM comments
    JOIN resources ON resources.id = resource_id
    JOIN users ON comments.user_id = users.id
    Where resources.id =$1
    ORDER BY comments.created_at;
  `,[resource_id]).then(res => res.rows);
}
exports.getAllComments = getAllComments;
console.log(getAllComments(6));
/**
 * Add new Comment for a single user.
 * @param {{resource_id: string,user_id: string, content: string}} resources  The id of the resources and the user who add the comment .
 * @return {Promise<[{}]>} A promise to the resources.
 */
const addNewComment = function(comment) {
  return pool.query(`
  INSERT INTO comments  (user_id, resource_id, content
    ) VALUES
    ($1,$2,$3) RETURNING *;
  `,[comment.user_id, comment.resource_id, comment.content]).then(res => res.rows);
}
exports.addNewComment = addNewComment;

/// Seaech

/**
 * Seaech  properties.
 * @param {{}} options An object containing query options.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const searchAllResources = function(options) {

  const queryParams = [];

  let queryString = `
    SELECT resources.*, AVG(rates.rating) as average_rating
    FROM resources
    JOIN rates ON resources.id = resource_id
    JOIN users ON users.id = resources.user_id
  `;

  if (options.title) {
    queryParams.push(`%${options.title}%`);
    queryString += `WHERE LOWER(title) LIKE LOWER($${queryParams.length}) `;
  }

  if(options.category){
    queryParams.push(`${options.category}`);
    if(queryParams.length > 1){
      queryString += `AND LOWER(category) like LOWER($${queryParams.length} )`;
    } else {
      queryString += `WHERE LOWER(category) like LOWER($${queryParams.length}) `;
    }
  }

  queryString += `GROUP BY resources.id`;

  if(options.minimum_rating){
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING AVG(rates.rating) >= $${queryParams.length} `;
  }
  queryString += `
  ORDER BY resources.created_at;`;

  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}
exports.searchAllResources = searchAllResources;
