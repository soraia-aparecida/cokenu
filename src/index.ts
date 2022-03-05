import app from "./app"
import { login } from "./endpoints/login"
import { signup } from "./endpoints/signup"
import { getUserProfile } from "./endpoints/getUserProfile"
import { getAnotherUserProfile } from "./endpoints/getAnotherUserProfile"
import { createRecipe } from "./endpoints/createRecipe"
import { getRecipe } from "./endpoints/getRecipe"
import { followUser } from "./endpoints/followUser"
import { unfollowUser } from "./endpoints/unfollowUser"
import { feed } from "./endpoints/feed"
import { editRecipe } from "./endpoints/editRecipe"
import { deleteRecipe } from "./endpoints/deleteRecipe"
import { deleteAccount } from "./endpoints/deleteAccount"
import { changePasswor } from "./endpoints/changePassword"

app.get('/user/feed', feed)
app.get('/user/profile', getUserProfile)
app.get('/user/:id', getAnotherUserProfile)

app.post('/user/follow', followUser)
app.post('/user/unfollow', unfollowUser)
app.post('/signup', signup)
app.post('/login', login)

app.put('/user/password', changePasswor)

app.delete('/user', deleteAccount)

app.get('/recipe/:id', getRecipe)
app.post('/recipe', createRecipe)
app.put('/recipe/:id', editRecipe)
app.delete('/recipe/:id', deleteRecipe)
