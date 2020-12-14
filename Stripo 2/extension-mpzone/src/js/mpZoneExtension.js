import {
    BLOCK_UNIQUE_CLASS_NAME,
    BLOCK_UNIQUE_CLASS_LABEL,
    CONTROL_NAME_ZONE_NAME_TEXT,
    CONTROL_NAME_ZONE_WIDTH,
    CONTROL_NAME_ZONE_HEIGHT,
    CONTROL_NAME_ZONE_ALIGN
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
        return defaultLayout.replace(/#IMAGE_BASE_PATH#/g, extensionBasePath);
    }

    function getBlockLabel(block) {
        console.log("getBlockLabel");
        return stripoApi.translate('block.name');
    }

    function emailInitialized(emailBody) {
        console.log("jobName Start Here");
        emailBody.find(`.${BLOCK_UNIQUE_CLASS_NAME}`).each(function() {
            const block = stripoApi.jQuery(this);
            var zoneName = block.find("img").attr("alt");
            if (!zoneName) zoneName = "MP Zone Name";
            var zoneWidth = block.find("img").attr("width");
            if (!zoneWidth) zoneWidth = "100";
            var zoneHeight = block.find("img").attr("height");
            if (!zoneHeight) zoneHeight = "100";
            var zoneAlign = block.attr("align");
            console.log(zoneAlign);
            if (!zoneAlign) zoneAlign = "center";
            console.log("jobName: " + zoneName + " " + zoneWidth + " " + zoneHeight + " " + zoneAlign);
            block.html(defaultLayout.replace(/#IMAGE_BASE_PATH#/g, extensionBasePath));
            //console.log("Default Template: " + defaultLayout);
            block.find("img").attr("alt", zoneName);
            block.find("table").attr("width", zoneWidth);                               //REPLACE THIS HERE
            block.find("table").attr("height", zoneHeight);                             //HEIGHT
            block.find("table").attr("align", zoneAlign);                               //NEED THE SPACING AS WELL, OR ALIGNMENT INSTEAD?
            block.attr("align", "");
//        block.find("img").attr("style", "background-color:#7c1a87;");
            block.find("span").html(zoneName);
        });
    }

    function onCleanLayout(bodyCheerioWrapper, cheerio) {
        console.log("onCleanLayout");
        bodyCheerioWrapper.find(`.${BLOCK_UNIQUE_CLASS_NAME}`).each(function() {
            const blockWrapper = cheerio(this, null, null, {decodeEntities: false});
            var zoneName = blockWrapper.find("img").attr("alt");
            if (zoneName)
            {
                console.log("onClean " + zoneName);
                const zoneWidth = blockWrapper.find("table").attr("width");
                const zoneHeight = blockWrapper.find("table").attr("height");
                const zoneAlign = blockWrapper.find("table").attr("align");
                //blockWrapper.find(`.${BLOCK_UNIQUE_CLASS_LABEL}`).find("span").html(zoneName);
                blockWrapper.attr("align", zoneAlign);
                blockWrapper.html("<img src=\"https://images/messagepoint_zone.gif\" width=\"" + zoneWidth + "\" height=\"" + zoneHeight + "\" alt=\"" + zoneName + "\"title=\"" + zoneName + "\" >");
            }
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
