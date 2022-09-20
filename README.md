# 简介

Jessibuca是一款开源的纯H5直播流播放器，通过Emscripten将音视频解码库编译成Js（wasm)运行于浏览器之中。兼容几乎所有浏览器，可以运行在PC、手机、微信中，无需额外安装插件。

## 功能
- 支持解码H.264视频(Baseline, Main, High Profile全支持，支持解码B帧视频)
- 支持解码H.265视频（flv id == 12）
- 支持解码AAC音频(LC,HE,HEv2 Profile全支持)
- 支持解码PCMA音频以及PCMU音频格式
- 可设置播放缓冲区时长，可设置0缓冲极限低延迟（网络抖动会造成卡顿现象）
- 支持WASM智能不花屏丢帧，长时间播放绝不累积延迟。
- 可创建多个播放实例
- 程序精简，经CDN加速，GZIP压缩（实际下载500k），加载速度更快
- 同时支持http-flv和websocket-flv协议以及websocket-raw私有协议（裸数据，传输量更小，需要搭配Monibuca服务器）
注：以http-flv请求时，存在跨域请求的问题，需要设置access-control-allow-origin, websocket-flv默认不存在此问题
- 支持HTTPS/WSS加密视频传输，保证视频内容传输安全
- 手机浏览器内打开视频不会变成全屏播放
- 手机浏览器内打开长时间不会息屏
- 支持解码8kHz PCM_ALAW, PCM_MULAW的G.711音频
- 支持填充，等比，等比缩放 3中视频缩放模式
- 支持0，90，180，270度画面旋转
- 自带底部UI,支持原子化配置是否显示(播放/暂停、音量调节、截屏、录制/暂停录制、全屏/取消全屏、流量显示)
- 自带底部UI适配H5移动端，并支持web端全屏(操作栏适配横屏)
- 自带底部UI支持设置成自动隐藏，只有鼠标聚焦到播放器内部才会显示，移除之后，会消失。
- 支持键盘快捷键
- 支持OffscreenCanvas，提升Webgl渲染性能
- 支持WebWorker多核解码，提升多画面播放性能
- 支持WebCodecs硬件解码API
- 支持WebCodecs硬件解码配置通过video标签渲染或者canvas标签渲染画面
- 支持MediaSourceExtensions 硬件解码
- 支持WebCodecs和MediaSourceExtensions硬解码失败的情况下自动切换到wasm软解码
- 支持同一个播放地址视频分辨率发生变化的时候视频不花屏(仅软解码)
- 支持同一个播放地址音频采样和编码发生改变的时候音频自动切换
- 支持视频录制(WebM、MP4格式)，(MP4格式支持在IOS VLC播放器显示时长播放，Android VLC播放器无法显示时长播放,PC VLC播放器可以播放)


## PRO版本
- 支持开源版几乎所有的方法和事件，支持无缝升级到PRO版本。
- wasm解码模式下默认work线程中发起Http-Flv、WS请求，减少主线程往worker线程传递数据，提升性能。
- Windows系统下,360浏览器可播放使用MSE加速解码H265。
- Windows系统下,win10商店购买hevc解码器后最新edge可硬件加速解码播放H265。
- 支持MSE硬解码智能不花屏丢帧，长时间播放绝不累积延迟。
- 支持Webcodecs硬解码智能不花屏丢帧，长时间播放绝不累积延迟。
- 支持检测网络延迟，并可以设置延迟达到一定时间段重新触发播放逻辑。
- 支持只播放直播流或者TF卡流中的单一视频或者单一音频数据。
- 支持语音通讯：支持设置采集PCM/G711A/G711U格式的数据、支持设置采样率16000Hz或8000Hz，支持设置采样精度32bits或者16bits或者8bits，支持设置单通道或双通道。
- 支持UI控件语音通讯交互按钮，提供事件回调，方便全屏模式下操作。
- 支持音视频流（TF卡流）的倍数播放，支持2/4/8/16/32/64倍数控制，支持设置多少倍之后只解码I帧播放。
- 支持UI控件音视频流（TF卡流）的底部24小时进度条，并支持精度控制，提供事件回调，方便全屏模式下操作。
- 支持TF卡流暂停(不断开连接，停止渲染，方便业务通过接口方式通知服务器不推流，不会触发页面渲染超时)和恢复播放。
- 支持UI控件PTZ操作盘，提供事件回调，方便全屏模式下操作。
- 支持UI控件直接关闭播放器，并有事件通知，方便在多屏模式下，对直接对某个播放页面进行关闭操作。
- 支持UI控件流分辨率配置和展示，提供事件回调，方便在全屏模型下操作。
- 支持UI控件电子放大，提供事件回调，方便在全屏模型下操作。
- 支持UI控件在TF卡流配置不断流暂停，并且提供事件监听，方便上层去配合服务器端停止发送流，实现不断流的暂停功能。
- 支持HLS H264格式协议。
- 支持镜像旋转(水平+垂直)。
- 支持crypto解密播放。
- 支持webrtc标准流播放。
- 支持WebTransport协议播放。
- 支持MSE硬解码之后通过canvas渲染播放。
- 支持WASM解码之后通过video渲染播放。
- 支持播放器自定义水印,支持播放器播放过程中，显示水印，例如公司名称，公司logo等。
- 支持截图加自定义水印,支持调用截图接口的时候，添加自定义水印，例如公司名称，公司logo等。
- 支持SIMD软解码加速(使用Chrome/Edge 91, Firefox89及之后正式提供的SIMD指令集加速解码, 在1080P以上分辨率带来100%-300%的性能提升)。
- 支持定制化服务开发。

## 体验地址

### Jessibuca
#### https
[https://jessibuca.com/player.html](https://jessibuca.com/player.html)

#### http
[http://jessibuca.monibuca.com/player.html](http://jessibuca.monibuca.com/player.html)

### Jessibuca Pro

#### https
[https://jessibuca.com/player-pro.html](https://jessibuca.com/player-pro.html)

##### http
[http://jessibuca.monibuca.com/player-pro.html](http://jessibuca.monibuca.com/player-pro.html)



## 本地测试

- 执行yarn 或者npm i
- 执行yarn dev 或者 npm run dev

## API
[API](/demo/api.md)


## HTTP 地址

[http://jessibuca.monibuca.com/](http://jessibuca.monibuca.com/)

## HTTPS 地址

[https://jessibuca.com](https://jessibuca.com)

## DEMO

[Demo](/demo/demo.md)



## 源码目录结构

- wasm/obj 存放emscripten编译好的ffmpeg解码库的字节码库
- dist 存放编译输出的js和wasm文件
- src 存放js源码

## 打包js

执行yarn build 或者 npm run build

## 引用关系

- jessibuca.js 是业务js代码
- decoder.js 是worker进程跑的负责音视频解码的js代码
- decoder.wasm 是decoder.js的胶水代码



## 编译C++代码

执行yarn build:wasm 或者 npm run build:wasm

## 基本原理

<img src="/demo/public/tech.png">


## 支持
<img src="/demo/public/wx.jpg"><img src="/demo/public/alipay.jpg">

## 群
<img src="/demo/public/qrcode.jpeg">
