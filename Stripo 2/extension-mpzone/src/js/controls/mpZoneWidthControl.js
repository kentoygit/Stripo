import {CONTROL_NAME_ZONE_WIDTH} from '../const';

export default {
    name: CONTROL_NAME_ZONE_WIDTH,

    render() {
        this.controlElement =  this.jElement.find('>table');
        this.jContainer.html(this.getControlMarkup());
        this.numberSelector = this.jContainer.find('number-selector')[0];
        this.numberSelector.props.value = this.controlElement.width();
        this.numberSelector.props.onChange = this.onChange.bind(this);
    },

    onChange(value) {
        this.numberSelector.props.value = value;
        this.controlElement.width(value);
        this.applyChanges();
    },

    getControlMarkup() {
        return `<number-selector label="${this.extension.stripoApi.translate('settings.controls.zoneWidth.label')}" 
            min="50" max="600" step="1"></number-selector>`;
    },
}
