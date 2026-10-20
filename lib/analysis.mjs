export function engagementRate(followers,posts){
 if(!Number.isSafeInteger(followers)||followers<=0||!Array.isArray(posts)||posts.length===0) throw new Error('Insufficient metrics');
 for(const p of posts) if(!p||!Number.isSafeInteger(p.likes)||!Number.isSafeInteger(p.comments)||p.likes<0||p.comments<0) throw new Error('Invalid post metrics');
 return Math.round(posts.reduce((sum,p)=>sum+p.likes+p.comments,0)/posts.length/followers*10000)/100;
}
/** @returns {{engagementRate:number,postsReviewed:number,observations:string[],risk:'undetermined',confidence:'low'}} */
export function assess(followers,posts){const rate=engagementRate(followers,posts);return {engagementRate:rate,postsReviewed:posts.length,observations:[`Average engagement across ${posts.length} reviewed posts is ${rate}%.`,'Public engagement alone cannot verify follower authenticity.'],risk:'undetermined',confidence:'low'};}
