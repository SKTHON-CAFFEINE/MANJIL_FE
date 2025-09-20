import { PageName,State,StateGroup,Button } from "./signUpStyle"
import { useState } from "react"

export default function Level3({setLevel}){
    const [state,setState]=useState();

    const stateChange=(s)=>{
        setState(s);
    }
    return(
        <>
        <PageName>본인의 체력 수준을 <br/>선택해주세요.</PageName>
        <div style={{height:"64px"}}/>
        <StateGroup>
            <State onClick={()=>stateChange(1)} $on={state==1 ? 1:0}>가벼운 스트레칭은 괜찮아요</State>
            <State onClick={()=>stateChange(2)} $on={state==2 ? 1:0}>간단한 근력 운동도 가능해요</State>
            <State onClick={()=>stateChange(3)} $on={state==3 ? 1:0}>꾸준히 운동할 수 있어요</State>
            <State onClick={()=>stateChange(4)} $on={state==4 ? 1:0}>활발하게 운동하고 있어요</State>
        </StateGroup>
        <Button onClick={()=>setLevel(4)}>다음</Button>
        </>
    )
}