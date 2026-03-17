const express=require('express'),fetch=require('node-fetch'),app=express();
app.use((q,s,n)=>{s.header('Access-Control-Allow-Origin','*');s.header('Access-Control-Allow-Headers','apikey,content-type');n();});
app.get('/p',async(q,s)=>{
  try{
    const u=decodeURIComponent(q.query.u);
    const key=q.headers['apikey']||q.query.key||'';
    const r=await fetch(u,{headers:{apikey:key,Accept:'application/json'}});
    const data=await r.text();
    s.status(r.status).set('Content-Type','application/json').send(data);
  }catch(e){s.status(500).json({error:e.message});}
});
app.listen(process.env.PORT||3000);
