import * as admin from 'firebase-admin';
admin.initializeApp();

export const auth = admin.auth();
export const db = admin.firestore();
export const storage = admin.storage();
export const message = admin.messaging();










export const user = async (uid: string) => {
    const user = await db.collection('users').doc(uid).get();
    return user.data();
}










///// HELPER FUNCTIONS: FIREBASE /////










export const id = () => {
    return db.collection(``).doc().id;
}










export const get = async (c:string, d:string) => {
    const doc = await db.collection(c).doc(d).get();
    return (doc.exists)?doc.data():undefined;
}










export const set = (c:string, d:string, data:any) => {
    return db.collection(c).doc(d).set(data);
}










export const update = (c:string, d:string, data:any) => {
    return db.collection(c).doc(d).update(data);
}










export const del = (r: string, id: string) => {
    return db.collection(r).doc(id).delete()
}










export const add = (r:string, data:any) => {
    return db.collection(r).add(data);
}










export const col = (p:any, l?:any) => {
    const ref = db.collection(p.ref);
    if(Array.isArray(p)){
        p.forEach((v:any) => {
            ref.where(v.field, v.operator||v.op||'==', v.query);
        });
    } else {
        ref.where(p.field, p.operator||p.op||'==', p.query);
    }
    if(l) {
        ref.limit(l)
    }
    return ref;
}










export const docs = async (p:any, i?:any) => {

    let data: any;

    const query = await col(p).get();

    if(!query.empty) {
        const snapshot = query.docs[i||0];
        data = snapshot.data();
    }

    return (data)?data:undefined;
}










export const notify = async (p:any, user:any) => {
    let r = {};
    if(user.token && user.token !== ""){
        // Notification content
        const payload = {
            notification: {
                title: 'Preparing Order',
                body: `${p.seller.name} has recieved your order.`,
                sound: 'default'
            }
        };
        r = await message.sendToDevice(user.token, payload);
    }
    return r;
}










export const timestamp = (d?: any) => {
    const stamp = admin.firestore.Timestamp;//[(d)?'fromDate':'now'];
    return (d)?stamp.fromDate(d):stamp.now()
}
