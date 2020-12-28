import {
    BLOCK_IMG_MERGE_TAG,
    BLOCK_NAME_MERGE_TAG,
    BLOCK_UNIQUE_CLASS_NAME,
    CONTROL_NAME_ZONE_ALIGN,
    CONTROL_NAME_ZONE_HEIGHT,
    CONTROL_NAME_ZONE_NAME_TEXT,
    CONTROL_NAME_ZONE_WIDTH
} from './const';
import translations from './translations';
import zoneNameControl from './controls/mpZoneNameControl';
import mpZoneWidthControl from './controls/mpZoneWidthControl';
import mpZoneHeightControl from './controls/mpZoneHeightControl';
import mpZoneAlignControl from './controls/mpZoneAlignControl';
import defaultLayout from './layout/layout.html';


export function createMpZoneExtension(stripoConfig, stripoApi, extensionBasePath) {
    function getBlockLayoutToDrop() {
        console.log("getBlockLayoutToDrop");
        return defaultLayout
            .replace(/#IMAGE_BASE_PATH#/g, extensionBasePath)
            .replace(/#DEFAULT_BLOCK_TEXT#/g, stripoApi.translate('block.default.text'));
    }

    function getBlockLabel(block) {
        console.log("getBlockLabel");
        return stripoApi.translate('block.name');
    }

    function emailInitialized(emailBody) {
        emailBody.find(`.${BLOCK_UNIQUE_CLASS_NAME}`).each(function() {
            const block = stripoApi.jQuery(this);
            block.find('img').attr('src', extensionBasePath + '/assets/images/MPLogo.png');
            block.find('span').html(stripoApi.translate('block.default.text'));
        });
    }

    function onCleanLayout(bodyCheerioWrapper, cheerio) {
        bodyCheerioWrapper.find(`.${BLOCK_UNIQUE_CLASS_NAME}`).each(function() {
            const blockWrapper = cheerio(this, null, null, {decodeEntities: false});
            blockWrapper.find('img').attr('src', BLOCK_IMG_MERGE_TAG);
            blockWrapper.find('span').html(BLOCK_NAME_MERGE_TAG);
        });
    }

    return {
        name: 'MPZoneBlockExtension',
        iconClass: 'icon-mplogo',
        uniqueClassName: BLOCK_UNIQUE_CLASS_NAME,
        canBeSavedToLibrary: false,
        settingsCssPath: '/assets/css/settings.css',
        previewCssPath: '/assets/css/preview.css',
        i18n: translations,
        blockName: 'block.name',
        emptyContainerIcon: false,
        blockType: 'block',
        controlsToCreate: [
            {control: zoneNameControl},
            {control: mpZoneWidthControl},
            {control: mpZoneHeightControl},
            {control: mpZoneAlignControl},
        ],
        blockControls: [
            CONTROL_NAME_ZONE_NAME_TEXT,
            CONTROL_NAME_ZONE_WIDTH,
            CONTROL_NAME_ZONE_HEIGHT,
            CONTROL_NAME_ZONE_ALIGN
        ],
        getBlockLayoutToDrop,
        getBlockLabel,
        emailInitialized,
        onCleanLayout
    }
}
