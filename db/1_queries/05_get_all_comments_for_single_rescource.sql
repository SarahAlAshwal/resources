SELECT comments.content, comments.user_id, resources .title
FROM comments
JOIN resources ON resources.id = resource_id
JOIN users ON comments.user_id = users.id
Where resources.id =6
ORDER BY comments.created_at;
