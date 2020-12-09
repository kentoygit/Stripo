import stripoDefaultExtension from './stripoDefaultExtension';
import {createMpZoneExtension} from './mpZoneExtension';

const extension = {
    create(stripoConfig, stripoApi, extensionBasePath) {
        return Object.assign({
            stripoConfig: stripoConfig,
            stripoApi: stripoApi,
            extensionBasePath: extensionBasePath,
            ...stripoDefaultExtension,
            ...createMpZoneExtension(stripoConfig, stripoApi, extensionBasePath)
        });
    }
};

self['MpZoneBlockExtension'] = extension;




