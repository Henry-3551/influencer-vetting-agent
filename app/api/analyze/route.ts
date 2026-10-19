import {NextResponse} from 'next/server';
import {assess} from '../../../lib/analysis.mjs';
export async function POST(req:Request){
 let body:unknown;try{body=await req.json()}catch{return NextResponse.json({error:'Invalid JSON'},{status:400})}
 const url=(body as {url?:unknown})?.url;
 if(typeof url!=='string'||url.length>500)return NextResponse.json({error:'Enter a valid Instagram profile URL.'},{status:400});
 let parsed:URL;try{parsed=new URL(url)}catch{return NextResponse.json({error:'Invalid URL'},{status:400})}
 if(parsed.protocol!=='https:'||!['instagram.com','www.instagram.com'].includes(parsed.hostname)||!/^\/[A-Za-z0-9._]+\/?$/.test(parsed.pathname)||['p','reel','stories','explore','accounts'].includes(parsed.pathname.split('/')[1].toLowerCase()))return NextResponse.json({error:'Only public Instagram profile URLs are supported.'},{status:400});
 const username=parsed.pathname.split('/')[1];
 const sample={followers:12500,posts:[{likes:420,comments:19},{likes:510,comments:26},{likes:380,comments:14}]};
 return NextResponse.json({mode:'mock',username,metrics:sample,assessment:assess(sample.followers,sample.posts),payment:{status:'not_attempted',transactionHash:null},notice:'DEMO DATA ONLY. No profile was fetched and no payment occurred.'});
}
