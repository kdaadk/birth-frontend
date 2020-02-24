import React, { Component } from "react";
import "../styles/pages/Home.css";
import Button from "@skbkontur/react-ui/Button";
import Gapped from "@skbkontur/react-ui/Gapped";
import { goTo } from "../shared/goTo"
import {PATH_LIGHT, PATH_EXPERT} from "../shared/constants";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div className="mode-pick">
        <Gapped gap={10} vertical={true}>
          <div className="header">Выберите режим:</div>
          <div className="buttons">
            <Gapped gap={10}>            
              <Button use="default" width={110} onClick={() => goTo(PATH_LIGHT)}>Ученик</Button>
              <Button use="default" width={110} onClick={() => goTo(PATH_EXPERT)}>Эксперт</Button>            
            </Gapped>
          </div>
        </Gapped>
      </div>
    );
  }
}

export default Home; 
