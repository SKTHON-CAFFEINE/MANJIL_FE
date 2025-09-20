import styled from "styled-components";
import {
  LevelBox,
  Level,
  Button,
} from "./signUpStyle";
import Level1 from "./level1";
import Level2 from "./level2";
import Level3 from "./level3";
import Level4 from "./level4";
import { useState } from "react";

export default function SignUpPage() {
  const [level,setLevel]=useState(1);


  return (
    <Page>
      <LevelBox>
        <Level $on={true}/>
        <Level $on={level>1 ? true:false}/>
        <Level $on={level>2 ? true:false}/>
        <Level $on={level>3 ? true:false}/>
      </LevelBox>
      {(level==1) && <Level1 setLevel={setLevel}/>}
      {(level==2) && <Level2 setLevel={setLevel}/>}
      {(level==3) && <Level3 setLevel={setLevel}/>}
      {(level==4) && <Level4 setLevel={setLevel}/>}
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
