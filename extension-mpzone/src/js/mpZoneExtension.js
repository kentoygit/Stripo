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
        return defaultLayout.replace(/#IMAGE_BASE_PATH#/g, extensionBasePath);
    }

    function getBlockLabel(block) {
        return stripoApi.translate('block.name');
    }

    function emailInitialized(emailBody) {
        emailBody.find(`.${BLOCK_UNIQUE_CLASS_NAME}`).each(function() {
            const block = stripoApi.jQuery(this);
            var zoneName = block.find("img").attr("alt");
            if (!zoneName) zoneName = "MP Zone Name";
            var zoneWidth = block.find("img").attr("width");
            if (!zoneWidth) zoneWidth = "100";
            var zoneHeight = block.find("img").attr("height");
            if (!zoneHeight) zoneHeight = "100";
            var zoneAlign = block.attr("align");
            if (!zoneAlign) zoneAlign = "center";
            block.find("img").replaceWith(defaultLayout.replace(/#IMAGE_BASE_PATH#/g, extensionBasePath));
            block.find("img").attr("alt", zoneName);
            block.find("img").attr("width", "96px");                               //REPLACE THIS HERE
            block.find("img").attr("height", "96px");                             //HEIGHT
            block.find("table").attr("align", zoneAlign);
            block.find("img").attr("align", "center");                               //NEED THE SPACING AS WELL, OR ALIGNMENT INSTEAD?
            var styleArr = block.find("table").attr("style").split(';');
            styleArr.push("width:" + zoneWidth);
            styleArr.push("height:" + zoneHeight);
            var styleArrStr = styleArr.join(';');
            block.find("table").attr("style", styleArrStr);
            block.find("span[class=\"" + BLOCK_UNIQUE_CLASS_LABEL + "\"]").html(zoneName);
        });
    }

    function onCleanLayout(bodyCheerioWrapper, cheerio) {
        bodyCheerioWrapper.find(`.${BLOCK_UNIQUE_CLASS_NAME}`).each(function() {
            const blockWrapper = cheerio(this, null, null, {decodeEntities: false}).parent();//found during testing we need to be a level up
            var zoneName = blockWrapper.find("img").attr("alt");
            if (zoneName)
            {
                var styleArr = blockWrapper.find("table").attr("style").split(';');
                var zoneWidth = "";
                var zoneHeight = "";
                for (var i = 0; i < styleArr.length; i++) {
                  if (styleArr[i].split(':')[0].trim() == "width") {
                    zoneWidth = styleArr[i].split(':')[1].trim();
                    zoneWidth = zoneWidth.replace('px','');
                  }
                  if (styleArr[i].split(':')[0].trim() == "height") {
                    zoneHeight = styleArr[i].split(':')[1].trim();
                    zoneWidth = zoneHeight.replace('px','');
                    zoneHeight = zoneHeight.replace('px','');
                  }
                }
                const zoneAlign = blockWrapper.find("table").attr("align");
                blockWrapper.html("<td class=\"esd-mp-zone-block\" align=\"" + zoneAlign +
                "\"><img src=\"https://images/messagepoint_zone.gif\" width=\"" + zoneWidth +
                "\" height=\"" + zoneHeight + "\" alt=\"" + zoneName + "\"title=\"" + zoneName + "\" /></td>");
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
