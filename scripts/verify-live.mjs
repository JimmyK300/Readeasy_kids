// Authorized disposable live QA. Native REST keeps this check independent of SDK/Node transport versions.
// The browser application uses Firebase's modular SDK. No historical collection is read.
import { readFile, writeFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
const env=Object.fromEntries((await readFile('.env.local','utf8')).split(/\r?\n/).filter(line=>line.includes('=')).map(line=>{const i=line.indexOf('=');return [line.slice(0,i),line.slice(i+1).trim()];}));
const project=env.VITE_FIREBASE_PROJECT_ID;
const authUrl=`https://identitytoolkit.googleapis.com/v1/accounts:`;
const documents=`https://firestore.googleapis.com/v1/projects/${project}/databases/(default)/documents`;
const receipt={project,method:'native REST; browser uses Firebase SDK',completedAt:'',checks:[],cleanup:[],passed:false};
const users=[];
const credentials=[0,1].map(()=>({email:`readeasy-qa-${randomBytes(9).toString('hex')}@example.com`,password:randomBytes(24).toString('base64url')}));
const request=async(url,body,token,method='POST')=>{
 const response=await fetch(url,{method,signal:AbortSignal.timeout(20000),headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},...(body?{body:JSON.stringify(body)}:{})});
 let value={};try{value=await response.json();}catch{/* Successful deletion may have no body. */}
 return {status:response.status,ok:response.ok,value};
};
const account=(action,body)=>request(`${authUrl}${action}?key=${env.VITE_FIREBASE_API_KEY}`,body);
const path=(uid,id='an-va-khu-vuon')=>`readingUsers/${uid}/progress/${id}`;
const read=(uid,id,token)=>request(`${documents}/${path(uid,id)}`,null,token,'GET');
const fields=(data)=>Object.fromEntries(Object.entries(data).map(([key,value])=>[key,typeof value==='number'?{integerValue:String(value)}:typeof value==='boolean'?{booleanValue:value}:{stringValue:value}]));
const summary={lessonId:'an-va-khu-vuon',score:2,total:3,completed:true};
const save=(uid,data,token,id='an-va-khu-vuon')=>request(`${documents}:commit`,{writes:[{update:{name:`projects/${project}/databases/(default)/documents/${path(uid,id)}`,fields:fields(data)},updateTransforms:[{fieldPath:'completedAt',setToServerValue:'REQUEST_TIME'}]}]},token);
const success=(response)=>{if(!response.ok)throw new Error(`Unexpected HTTP ${response.status}`);return response.value;};
const check=async(name,operation)=>{await operation();receipt.checks.push({name,passed:true});};
const denied=(name,operation)=>check(name,async()=>{const result=await operation();if(result.status!==403)throw new Error(`${name}: expected403, got${result.status}`);});
try {
 for(let i=0;i<2;i++)await check(`real signup ${i+1}`,async()=>{users[i]=success(await account('signUp',{...credentials[i],returnSecureToken:true}));});
 const uid=users[0].localId,token=users[0].idToken;
 await check('owner saves completed lesson',async()=>success(await save(uid,summary,token)));
 await check('owner reads saved score',async()=>{if(success(await read(uid,'an-va-khu-vuon',token)).fields.score.integerValue!=='2')throw new Error('score mismatch');});
 await denied('other UID cannot read',()=>read(uid,'an-va-khu-vuon',users[1].idToken));
 await denied('other UID cannot write',()=>save(uid,summary,users[1].idToken));
 await denied('anonymous cannot read',()=>read(uid,'an-va-khu-vuon'));
 await denied('anonymous cannot write',()=>save(uid,summary));
 await denied('owner cannot save impossible score',()=>save(uid,{...summary,score:4},token));
 await denied('owner cannot add unexpected profile data',()=>save(uid,{...summary,childName:'QA only'},token));
 await denied('owner cannot save unknown lesson',()=>save(uid,{...summary,lessonId:'unknown'},token,'unknown'));
 await denied('owner cannot read parent profile',()=>request(`${documents}/readingUsers/${uid}`,null,token,'GET'));
 // A REST test cannot inspect browser session state; logout is verified separately by live CUA and SDK receipt.
 await check('auth endpoint validates account token',async()=>success(await account('lookup',{idToken:token})));
 await check('incorrect login rejected',async()=>{const result=await account('signInWithPassword',{email:credentials[0].email,password:'invalid-test-password',returnSecureToken:true});if(result.status!==400)throw new Error('incorrect login accepted');});
 await check('correct login resumes same account',async()=>{const result=success(await account('signInWithPassword',{...credentials[0],returnSecureToken:true}));if(result.localId!==uid)throw new Error('UID mismatch');users[0]=result;});
 await check('progress survives fresh authenticated session',async()=>{if(success(await read(uid,'an-va-khu-vuon',users[0].idToken)).fields.score.integerValue!=='2')throw new Error('lost progress');});
 receipt.passed=true;
} catch(error) {receipt.failure=error.message;process.exitCode=1;}
finally {
 if(users[0]){try{success(await request(`${documents}/${path(users[0].localId)}`,null,users[0].idToken,'DELETE'));receipt.cleanup.push('QA progress deleted');}catch{receipt.cleanup.push('QA progress cleanup failed');receipt.passed=false;process.exitCode=1;}}
 for(let i=0;i<users.length;i++){try{success(await account('delete',{idToken:users[i].idToken}));receipt.cleanup.push(`QA account ${i+1} deleted`);}catch{receipt.cleanup.push(`QA account ${i+1} cleanup failed`);receipt.passed=false;process.exitCode=1;}}
 receipt.completedAt=new Date().toISOString();await writeFile('../readeasy-evidence/firebase-live-qa.json',JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt,null,2));
}
