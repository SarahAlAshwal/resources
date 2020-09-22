SELECT resource_id , AVG(rating) as average_rating
FROM rates
GROUP BY resource_id
ORDER BY average_rating ;
