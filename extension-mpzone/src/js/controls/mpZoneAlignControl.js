import {CONTROL_NAME_ZONE_ALIGN} from '../const';

export default {
    name: CONTROL_NAME_ZONE_ALIGN,

    render() {
        this.controlElement =  this.jElement.find('table'); //>
        const alignValue = this.controlElement.attr('align') || 'center';
        this.jContainer.html(this.getControlMarkup());
        this.jAlignControl = this.jContainer.find('.desktop-aligning input[name="elementAlign"]');
        this.jAlignControl.on('change', this.onChange.bind(this));
    },

    onChange(e) {
        this.controlElement.attr('align', e.target.value || 'center');
        this.applyChanges();
    },

    onDeactivate() {
        this.jAlignControl.off(`change`);
    },

    getControlMarkup() {
        const alignValue = this.controlElement.attr('align') || 'center';
        return `
              <div class="form-group esdev-test-align-control">
                  <label for="imageAlign" class="col-xs-4 control-label esdev-no-padding-right desktop-align-label text-overflow">
                    ${this.extension.stripoApi.translate('settings.controls.zoneAlign.label')}
                   </label>
                  <div class="col-xs-8 text-right">
                      <div class="btn-group desktop-aligning" data-toggle="buttons">
                          <label class="btn btn-default label-align-left ${alignValue == 'left' ? 'active' : ''}">
                              <input type="radio" name="elementAlign" value="left" autocomplete="off" ${alignValue == 'left' ? 'checked="" ' : ''}>
                              <span class="es-icon-img-align-left"></span>
                          </label>
                          <label class="btn btn-default label-align-center ${alignValue == 'center' ? 'active' : ''}">
                              <input type="radio" name="elementAlign" value="center" autocomplete="off" ${alignValue == 'center' ? 'checked="" ' : ''}>
                              <span class="es-icon-img-align-center"></span>
                          </label>
                          <label class="btn btn-default label-align-right ${alignValue == 'right' ? 'active' : ''}">
                              <input type="radio" name="elementAlign" value="right" autocomplete="off" ${alignValue == 'right' ? 'checked="" ' : ''}>
                              <span class="es-icon-img-align-right"></span>
                          </label>
                      </div>
                  </div>
              </div>`;
    },
}
