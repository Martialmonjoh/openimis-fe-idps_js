import React, {Component} from "react";
import {injectIntl} from 'react-intl';
import { ScreenShare , FormatAlignLeft , Ballot} from "@material-ui/icons";
import {formatMessage, MainMenuContribution , withModulesManager } from "@openimis/fe-core";

class IdpsMainMenu extends Component {
    render(){
        const {intl} = this.props;
        let entries = [];
        entries.push({
            text: formatMessage(intl, "idps", "menu.perfomance"),
            icon: <FormatAlignLeft/>,
            route: "/idps/performances"
        });
        entries.push({
            text: formatMessage(intl, "idps", "menu.reports"),
            icon: <Ballot/>,
            route: "/idps/reports"
        });

        if(!entries.length) return null;
        return (
            <MainMenuContribution
            {...this.props}
            header={formatMessage(intl, "idps", "mainMenu")}
            icon={<ScreenShare/>}
            entries={entries}
            />
        );
    }
}

export default withModulesManager(injectIntl(IdpsMainMenu));