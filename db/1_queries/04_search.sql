SELECT resources.id, AVG(rates.rating) as average_rating
FROM resources
JOIN rates ON resources.id = resource_id
JOIN users ON users.id = resources.user_id
WHERE LOWER(title) LIKE LOWER('%ynda%')
GROUP BY resources.id;


SELECT resources.id, AVG(rates.rating) as average_rating
FROM resources
JOIN rates ON resources.id = resource_id
JOIN users ON users.id = resources.user_id
WHERE LOWER(category) LIKE LOWER('%education%')
GROUP BY resources.id;


SELECT resources.id, AVG(rates.rating) as average_rating
FROM resources
JOIN rates ON resources.id = resource_id
JOIN users ON users.id = resources.user_id
GROUP BY resources.id
HAVING AVG(rates.rating) >= 3
ORDER BY resources.created_at ;

