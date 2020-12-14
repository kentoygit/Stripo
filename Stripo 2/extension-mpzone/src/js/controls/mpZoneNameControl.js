import {CONTROL_NAME_ZONE_NAME_TEXT} from '../const';

export default {
    name: CONTROL_NAME_ZONE_NAME_TEXT,

    render() {
        this.jImage = this.jElement.find('img');
        this.jContainer.html(this.getBlockMarkup());
        this.jAltInput = this.jContainer.find('#mbZoneName');
        this.jAltInput.on(`change`, this.onChange.bind(this));
    },

    onDeactivate() {
        this.jAltInput.off(`change`);
    },

    isControlVisible() {
        return true;
    },

    onChange(e) {
        this.jImage.attr('alt', e.target.value || '');
        this.applyChanges();
    },

    getBlockMarkup() {
        return `
            <div class="form-group">
                <div class="col-xs-12">
                    <label for="mbZoneName">${this.extension.stripoApi.translate('settings.controls.zoneNameText.label')}</label>
                    <input id="mbZoneName" type="text" class="form-control" value="${this.jImage.attr('alt') || ''}">
                </div>
            </div>`;
    }
}