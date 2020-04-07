import request from '@/api/request';

function audioApi(data) {
    return request({
        url: `/huisharingadmin/intf/getResourceAudioData`,
        method: 'post',
        data: data
    })
}

function videoApi(data) {
    return request({
        url: `/huisharingadmin/intf/getResourceVideoData`,
        method: 'post',
        data: data
    })
}

function infoApi(data) {
    return request({
        url: `/huisharingadmin/intf/getResourceInfoData`,
        method: 'post',
        data: data
    })
}

export default {
    audioApi,
    videoApi,
    infoApi
}