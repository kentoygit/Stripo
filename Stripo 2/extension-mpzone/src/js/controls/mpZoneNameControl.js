import {CONTROL_NAME_ZONE_NAME_TEXT, CONTROL_NAME_ZONE_WIDTH, CONTROL_NAME_ZONE_HEIGHT, CONTROL_NAME_ZONE_ALIGN} from '../const';

export default {
   name: CONTROL_NAME_ZONE_NAME_TEXT,
   width: CONTROL_NAME_ZONE_WIDTH,
   height: CONTROL_NAME_ZONE_HEIGHT,
   alignment: CONTROL_NAME_ZONE_ALIGN,

    render() {
        console.log("I GOT HERE");
        this.jImage = this.jElement.find('img');
        this.jTable = this.jElement.find('table');
        //this.jTD = this.jElement.find('td');
        console.log(this.jImage.attr('alt'));
        console.log(this.jTable.attr('width'));
        console.log(this.jTable.attr('height'));
        console.log(this.jTable.attr('align'));
        this.jContainer.html(this.getBlockMarkup());
        this.jAltInput = this.jContainer.find('#mbZoneName');
        this.jAltInput.on(`change`, this.onNameChange.bind(this));
        this.jWidthInput = this.jContainer.find('#mbZoneWidth');
        this.jWidthInput.on(`change`, this.onWidthChange.bind(this));
        this.jHeightInput = this.jContainer.find('#mbZoneHeight');
        this.jHeightInput.on(`change`, this.onHeightChange.bind(this));
        this.jAlignInput = this.jContainer.find('#mbZoneAlign');
        this.jAlignInput.on(`change`, this.onAlignChange.bind(this));
    },

    onDeactivate() {
        this.jAltInput.off(`change`);
    },

    isControlVisible() {
        return true;
    },

    onNameChange(e) {
        this.jImage.attr('alt', e.target.value || '');
        this.jElement.find('span').html(e.target.value);
        this.applyChanges();
    },

    onWidthChange(e) {
        this.jTable.attr('width', e.target.value || '');
        this.applyChanges();
    },

    onHeightChange(e) {
        this.jTable.attr('height', e.target.value || '');
        this.applyChanges();
    },

    onAlignChange(e) {
        this.jTable.attr('align', e.target.value || '');
        //if (e.target.value == "left")
        //{
        //  this.jElement.attr('style', 'background-color:#FF0000;margin-left:0;margin-right:auto;');
        //}
        //if (e.target.value == "center")
        //{
        //  this.jElement.attr('style', 'background-color:#00FF00;margin-left:auto;margin-right:auto;');
        //}
        //if (e.target.value == "right")
        //{
        //  this.jElement.attr('style', 'background-color:#0000FF;margin-left:auto;margin-right:0;');
        //}
        //this.applyChanges();
    },

    getBlockMarkup() {
        return `
            <div class="form-group">
                <div class="col-xs-12">
                    <label for="mbZoneName">${this.extension.stripoApi.translate('settings.controls.zoneNameText.label')}</label>
                    <input id="mbZoneName" type="text" class="form-control" value="${this.jImage.attr('alt') || ''}">



                    <div class="form-group esdev-paddings-block" false="">
                        <label class="col-xs-4 col-sm-4 col-md-5 col-lg-4 control-label esdev-no-padding-right">${this.extension.stripoApi.translate('settings.controls.zoneWidth.label')}</label>
                        <div class="col-sm-8 col-xs-8">
                            <div class="input-group esdev-count-range pull-right" id="mbZoneWidth">
                                <span class="input-group-btn">
                                    <button class="btn btn-default minus" type="button"><span class="es-icon-minus"></span></button>
                                </span>
                                <input type="number" class="form-control padding-val text-center" value="${this.jTable.attr('width') || ''}" step="5">
                                <span class="input-group-btn">
                                    <button class="btn btn-default plus" type="button"><span class="es-icon-plus"></span></button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group esdev-paddings-block" false="">
                        <label class="col-xs-4 col-sm-4 col-md-5 col-lg-4 control-label esdev-no-padding-right">${this.extension.stripoApi.translate('settings.controls.zoneHeight.label')}</label>
                        <div class="col-sm-8 col-xs-8">
                            <div class="input-group esdev-count-range pull-right" id="mbZoneHeight">
                                <span class="input-group-btn">
                                    <button class="btn btn-default minus" type="button"><span class="es-icon-minus"></span></button>
                                </span>
                                <input type="number" class="form-control padding-val text-center" value="${this.jTable.attr('height') || ''}" step="5">
                                <span class="input-group-btn">
                                    <button class="btn btn-default plus" type="button"><span class="es-icon-plus"></span></button>
                                </span>
                            </div>
                        </div>
                    </div>


                    <label for="mbZoneAlign">${this.extension.stripoApi.translate('settings.controls.zoneAlign.label')}</label>
                    <input id="mbZoneAlign" type="text" class="form-control" value="${this.jTable.attr('align') || ''}">

                    <div class="form-group esdev-test-align-control">
                                      <label for="mbZoneAlign" class="col-xs-4 control-label esdev-no-padding-right desktop-align-label text-overflow">
                                        Alignment
                                       </label>

                                      <div class="col-xs-8 text-right">

                                          <div class="btn-group desktop-aligning" data-toggle="buttons">
                                              <label class="btn btn-default label-align-left">
                                                  <input type="radio" name="options" id="option1" autocomplete="off"><span class="es-icon-img-align-left"></span>
                                              </label>
                                              <label class="btn btn-default label-align-center">
                                                  <input type="radio" name="options" id="option2" autocomplete="off" checked=""><span class="es-icon-img-align-center"></span>
                                              </label>
                                              <label class="btn btn-default label-align-right">
                                                  <input type="radio" name="options" id="option3" autocomplete="off"><span class="es-icon-img-align-right"></span>
                                              </label>
                                          </div>

                                      </div>
                                  </div>
                </div>
            </div>`;
    }
}
