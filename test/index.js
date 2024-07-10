import {of,map,filter} from "rxjs"

of(1,2,3)
  .pipe(map((x)=>x*x))
  .pipe(filter((x)=>x%2 !==0))
  .subscribe((v)=>{
    console.log('v: ', v);
  })