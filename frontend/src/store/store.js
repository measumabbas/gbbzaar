
import { createStore,combineReducers,applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// import { artReducer } from "./reducers/artReducer";
import { tokenReducer, userEmailVerifyReducer, userReducer,updateUserReducer, getUserReducer, updatePasswordRequest, verifyPassword, updatePassword } from "./reducers/userReducer";
import {uploadArtReducer,getAllArts,getUserArts, deleteUserArt, getSingleArt, addReviewReducer, getArtReviews, updateArt} from './reducers/artReducer'
import { persistStore, persistReducer,persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
    key: 'root',
    storage,
  }

//   const persistedReducer = persistCombineReducers(persistConfig, {token:tokenReducer,user:userReducer})
   
const reducer = combineReducers({
    updatePassword:updatePassword,
    verifyPassword:verifyPassword,
    updatePass:updatePasswordRequest,
    updateArt:updateArt,
    getReviews:getArtReviews,
    review:addReviewReducer,
    getUser:getUserReducer,
    art:getSingleArt,
    deleteArt:deleteUserArt,
    userArts:getUserArts,
    arts:getAllArts,
    uploadArt:uploadArtReducer,
    updateUser:updateUserReducer,
    emailVerify: userEmailVerifyReducer,
    user:userReducer,
    token:persistReducer(persistConfig, tokenReducer),
})



const store = createStore(
    reducer,{},composeWithDevTools(applyMiddleware(thunk))
)
const persistor = persistStore(store);
export { store, persistor };
