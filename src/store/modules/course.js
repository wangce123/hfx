import Mock from 'mockjs';
var Random = Mock.Random;
const course = {
    state: {
        singerIndexs: 0,
        courseList: [
            {
                singerId: Random.id(),
                name: '我爱自然拼读L1：和字母做朋友',
                num: 20,
                singerImg: Random.image('375x200', '#6E8CA8', '#FFF', 'png', '五月天'),
                audioList: [{
                    id: Random.id(),
                    songImg: 'http://p2.music.126.net/_B1Fn_Z1WxHzqGLzLZDf-w==/109951163263882447.jpg?param=130y130',
                    name: 'Pinocchio(英式发音)',
                    urlId: 385965
                }, {
                    id: Random.id(),
                    songImg: 'http://p2.music.126.net/ovsWnGqQYBy0XC8WD1lULw==/109951163188724796.jpg?param=130y130',
                    name: 'Pinocchio(美式发音)',
                    urlId: 386175
                }, {
                    id: Random.id(),
                    songImg: 'http://p2.music.126.net/AmUoDfx17bcXoZF0uxU0-A==/109951163188724394.jpg?param=130y130',
                    name: "Song-I'm Pinocchio",
                    urlId: 386542
                }, {
                    id: Random.id(),
                    songImg: 'http://p1.music.126.net/AmUoDfx17bcXoZF0uxU0-A==/109951163188724394.jpg?param=130y130',
                    name: 'Cookie Land(美式发音)',
                    urlId: 386538
                }, {
                    id: Random.id(),
                    songImg: 'http://p2.music.126.net/AmUoDfx17bcXoZF0uxU0-A==/109951163188724394.jpg?param=130y130',
                    name: 'Cookie Land(英式发音)',
                    urlId: 386542
                }, {
                    id: Random.id(),
                    songImg: 'http://p2.music.126.net/MKIERQMSw1ohk7JY9waXHA==/109951163250087443.jpg?param=130y130',
                    name: 'Song-Welcome to Cookie Land',
                    urlId: 287248
                }, {
                    id: Random.id(),
                    songImg: 'http://p1.music.126.net/s6bXQX0M-H9EoeqGfr4wrg==/109951163250238942.jpg?param=130y130',
                    name: "Jasper's Pot of Gold(美式发音)",
                    urlId: 553310243
                }, {
                    id: Random.id(),
                    songImg: 'http://p1.music.126.net/qCVS4aQZImHXUfBvFipVpA==/109951163167712096.jpg?param=130y130',
                    name: "Jasper's Pot of Gold(英式发音)",
                    urlId: 541511123
                }, {
                    id: Random.id(),
                    songImg: 'http://p1.music.126.net/8htgrvYuwdrNQijDNqQstg==/109951163188731022.jpg?param=130y130',
                    name: "Song-I'm Pinocchio",
                    urlId: 386936
                }, {
                    id: Random.id(),
                    songImg: 'http://p2.music.126.net/D_hiKMwrdQlqD36LoKLO2w==/109951163187408030.jpg?param=130y130',
                    name: 'Pinocchio(英式发音)',
                    urlId: 25794008
                }, {
                    id: Random.id(),
                    songImg: 'http://p2.music.126.net/aAJOyog1Aie6PnBvQClfbQ==/109951163188730555.jpg?param=130y130',
                    name: 'Pinocchio(美式发音)',
                    urlId: 386469
                }, {
                    id: Random.id(),
                    songImg: 'http://p2.music.126.net/_B1Fn_Z1WxHzqGLzLZDf-w==/109951163263882447.jpg?param=130y130',
                    name: "Jasper's Pot of Gold",
                    urlId: 385973
                }],
                videoList: [{
                    id: Random.id(),
                    url: 'http://source.huisharing.com/data//resources/course/100191/video/step1468893594861_video.mp4',
                    title: '字母A',
                    poster: Random.image('375x211', '#F9B063', '#FFF', 'png', '字母A')
                }, {
                    id: Random.id(),
                    url: 'http://source.huisharing.com/data//resources/course/100198/video/step1469151384353_video.mp4',
                    title: '字母B',
                    poster: Random.image('375x211', '#F9B063', '#FFF', 'png', '字母B')
                }, {
                    id:
                        Random.id(),
                    url: 'http://source.huisharing.com/data//resources/course/100205/video/step1469156758047_video.mp4',
                    title: '字母C',
                    poster: Random.image('375x211', '#F9B063', '#FFF', 'png', '字母C')
                },
                {
                    id:
                        Random.id(),
                    url: 'https://1253471802.vod2.myqcloud.com/e262aea8vodtransgzp1253471802/29cf09cc9031868223470659860/v.f30.mp4',
                    title: '字母D',
                    poster: Random.image('375x211', '#F9B063', '#FFF', 'png', '字母D')
                }]
            }, {
                singerId: Random.id(),
                name: 'Very Easy Writing',
                num: 20,
                singerImg: Random.image('375x200', '#6E8CA8', '#FFF', 'png', '林宥嘉'),
                audioList: [{
                    id: Random.id(),
                    songImg: 'http://p1.music.126.net/nJlpALEtfmeFzb_k8RkDuQ==/109951163177954238.jpg?param=130y130',
                    name: '想自由',
                    urlId: 108281
                }, {
                    id: Random.id(),
                    songImg: 'http://p1.music.126.net/mMZNB-jhYsw29K61QtopJA==/109951163187404137.jpg?param=130y130',
                    name: '说谎',
                    urlId: 108390
                }, {
                    id: Random.id(),
                    songImg: 'http://p2.music.126.net/jI1EcP0FrAVpPlZdGXd5Cw==/109951163304640811.jpg?param=130y130',
                    name: '成全',
                    urlId: 562594267
                }, {
                    id: Random.id(),
                    songImg: 'http://p1.music.126.net/os7qbSSng_yni2ZFouUryw==/109951163167636205.jpg?param=130y130',
                    name: '浪费',
                    urlId: 108179
                }, {
                    id: Random.id(),
                    songImg: 'http://p1.music.126.net/zGgUaGvXapKMy5tfQIB7cw==/109951163167743834.jpg?param=130y130',
                    name: '全世界谁倾听你',
                    urlId: 432509483
                }, {
                    id: Random.id(),
                    songImg: 'http://p1.music.126.net/JAp6-1gzU4o2vq9Xc8gXkA==/109951163167503126.jpg?param=130y130',
                    name: '残酷月光',
                    urlId: 108557
                }, {
                    id: Random.id(),
                    songImg: 'http://p2.music.126.net/2LAkRtcpKlfsZYniAfxHZA==/109951163167481875.jpg?param=130y130',
                    name: '我爱的人',
                    urlId: 350651
                }, {
                    id: Random.id(),
                    songImg: 'http://p1.music.126.net/os7qbSSng_yni2ZFouUryw==/109951163167636205.jpg?param=130y130',
                    name: '傻子',
                    urlId: 108194
                }, {
                    id: Random.id(),
                    songImg: 'http://p2.music.126.net/oVJmUJ1bPb_9eBOFCKLclQ==/109951163167730852.jpg?param=130y130',
                    name: '天真有邪',
                    urlId: 417833029
                }, {
                    id: Random.id(),
                    songImg: 'http://p2.music.126.net/RF7mNeqneGi9EBGo4uqUvA==/59373627916982.jpg?param=130y130',
                    name: '背影',
                    urlId: 5247677
                }, {
                    id: Random.id(),
                    songImg: 'http://p2.music.126.net/JAp6-1gzU4o2vq9Xc8gXkA==/109951163167503126.jpg?param=130y130',
                    name: '神秘嘉宾',
                    urlId: 108539
                }, {
                    id: Random.id(),
                    songImg: 'http://p2.music.126.net/oVJmUJ1bPb_9eBOFCKLclQ==/109951163167730852.jpg?param=130y130',
                    name: '我梦见你梦见我',
                    urlId: 417250911
                }, {
                    id: Random.id(),
                    songImg: 'http://p2.music.126.net/KCyUXnYq3IuKcUJu0X8OrQ==/109951163167487498.jpg?param=130y130',
                    name: '你是我的眼',
                    urlId: 350616
                }],
                videoList: [{
                    id: Random.id(),
                    url: 'http://source.huisharing.com/data//resources/course/100198/video/step1469151384353_video.mp4',
                    title: '字母B',
                    poster: Random.image('375x211', '#F9B063', '#FFF', 'png', '字母B')
                }, {
                    id: Random.id(),
                    url: 'http://source.huisharing.com/data//resources/course/100205/video/step1469156758047_video.mp4',
                    title: '字母C',
                    poster: Random.image('375x211', '#F9B063', '#FFF', 'png', '字母C')
                },
                {
                    id: Random.id(),
                    url: 'https://1253471802.vod2.myqcloud.com/e262aea8vodtransgzp1253471802/29cf09cc9031868223470659860/v.f30.mp4',
                    title: '字母D',
                    poster: Random.image('375x211', '#F9B063', '#FFF', 'png', '字母D')
                }]
            }, {
                singerId: Random.id(),
                name: 'Good Baby,Max 好宝宝生活启蒙',
                num: 10,
                singerImg: Random.image('375x200', '#6E8CA8', '#FFF', 'png', '張国榮'),
                audioList: [{
                    id: Random.id(),
                    songImg: 'http://p1.music.126.net/2YIpNoCzXfYgz4zIw3s0Vg==/73667279073787.jpg?param=130y130',
                    name: '玻璃之情',
                    urlId: 186436
                }, {
                    id: Random.id(),
                    songImg: 'http://p1.music.126.net/2YIpNoCzXfYgz4zIw3s0Vg==/73667279073787.jpg?param=130y130',
                    name: '春夏秋冬',
                    urlId: 186453
                }, {
                    id: Random.id(),
                    songImg: 'http://p1.music.126.net/cmvsHFnVKXO409hZdrbacA==/102254581395221.jpg?param=130y130',
                    name: '沉默是金',
                    urlId: 188204
                }, {
                    id: Random.id(),
                    songImg: 'http://p2.music.126.net/AtMpiqgluHefLF6nD_Pcug==/4417837720418086.jpg?param=130y130',
                    name: '当爱已成往事',
                    urlId: 26620756
                }, {
                    id: Random.id(),
                    songImg: 'http://p2.music.126.net/qseUH9tBtprMauNYv5jR8Q==/109951164373664324.jpg?param=130y130',
                    name: '当年情(Live)',
                    urlId: 188451
                }],
                videoList: [{
                    id: Random.id(),
                    url: 'http://source.huisharing.com/data//resources/course/100205/video/step1469156758047_video.mp4',
                    title: '字母C',
                    poster: Random.image('375x211', '#F9B063', '#FFF', 'png', '字母C')
                },
                {
                    id: Random.id(),
                    url: 'https://1253471802.vod2.myqcloud.com/e262aea8vodtransgzp1253471802/29cf09cc9031868223470659860/v.f30.mp4',
                    title: '字母D',
                    poster: Random.image('375x211', '#F9B063', '#FFF', 'png', '字母D')
                }]
            }
        ]
    },
    namespaced: true,
    mutations: {
        chooseSingerIndex(state, n) {
            state.singerIndexs = n;
        }
    },
    actions: {

    },
    getters: {
        singerIndex: function () {
            return singerIndexs
        }
    }
}
export default course;