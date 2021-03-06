import * as React from "react";
import { connect } from "react-redux";
import {
  DesignerPanel, DesignerPanelContent, DesignerPanelHeader,
} from "../designer_panel";
import { mapStateToProps } from "../../sequences/state_to_props";
import { Props } from "../../sequences/interfaces";
import { t } from "../../i18next_wrapper";
import { EmptyStateWrapper, EmptyStateGraphic } from "../../ui";
import {
  SequenceEditorMiddleActive,
} from "../../sequences/sequence_editor_middle_active";
import { Content } from "../../constants";
import { isTaggedSequence } from "../../resources/tagged_resources";
import {
  setActiveSequenceByName,
} from "../../sequences/set_active_sequence_by_name";

export class RawDesignerSequenceEditor extends React.Component<Props> {

  componentDidMount() {
    if (!this.props.sequence) { setActiveSequenceByName(); }
  }

  render() {
    const panelName = "designer-sequence-editor";
    return <DesignerPanel panelName={panelName}>
      <DesignerPanelHeader
        panelName={panelName}
        title={this.props.sequence?.body.name || t("No Sequence selected")}
        backTo={"/app/designer/sequences"} />
      <DesignerPanelContent panelName={panelName}>
        <EmptyStateWrapper
          notEmpty={this.props.sequence && isTaggedSequence(this.props.sequence)}
          graphic={EmptyStateGraphic.sequences}
          title={t("No Sequence selected.")}
          text={Content.NO_SEQUENCE_SELECTED}>
          {this.props.sequence && <SequenceEditorMiddleActive
            dispatch={this.props.dispatch}
            sequence={this.props.sequence}
            resources={this.props.resources}
            syncStatus={this.props.syncStatus}
            hardwareFlags={this.props.hardwareFlags}
            farmwareData={this.props.farmwareData}
            shouldDisplay={this.props.shouldDisplay}
            getWebAppConfigValue={this.props.getWebAppConfigValue}
            menuOpen={this.props.menuOpen} />}
        </EmptyStateWrapper>
      </DesignerPanelContent>
    </DesignerPanel>;
  }
}

export const DesignerSequenceEditor =
  connect(mapStateToProps)(RawDesignerSequenceEditor);
