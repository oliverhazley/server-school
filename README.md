week 5 homework 

working login + password hashing, auth routes/controllers added (uses usermodel)

GET /api/entries lists either all entries if user_level=admin, or only user’s own entries if user_level=regular.

PUT /api/entries/:id fails with 403 if the user isnt the owner or an admin.

DELETE /api/entries/:id likewise fails with 403 unless the user is admin or the owner.

PUT /api/users/:id is only allowed if user_level=admin or req.user.user_id === req.params.id.
