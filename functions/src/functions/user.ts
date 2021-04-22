import * as functions from "firebase-functions";
import { set, update, del, auth } from "../modules/admin";
import { User, userObject } from "../models/user";










export const create = functions.auth.user().onCreate(
    async (event: any) => {
        try {
            const user: User = userObject(event);
            return set('users', user.uid, user)
        } catch(e) {
            throw {msg: 'User creation unsuccessful.'}
        }
    }
);










export const modify = functions.https.onCall(
    async (p: any, c: any) => {
        if(!c.auth)
        throw { msg: 'Please re-authenticate.'};
        const user = c.auth;
        const data: User = (p)?p:{};
        return update('users', user.uid, data)
    }
);










export const remove = functions.auth.user().onDelete(
    async (event: any) => {
        try {
            const status = await del('users', event.uid);
            return status;
        } catch(e) {
            throw {msg: 'User deletion unsuccessful.'};
        }
    }
);










export const destroy = functions.https.onCall(async (data:any, context:any) => {
  return await auth.deleteUser(data)
});
