import {clamp, isMobile, setStyle} from "../utils";

export default (player, control) => {
    const {
        events: {proxy},
        debug
    } = player;

    function volumeChangeFromEvent(event) {
        const {bottom: panelBottom, height: panelHeight} = control.$volumePanel.getBoundingClientRect();
        const {height: handleHeight} = control.$volumeHandle.getBoundingClientRect();

        let moveLen = event.y;

        // if (isMobile() && player.fullscreen) {
        //     moveLen = event.x;
        // }

        const percentage =
            clamp(panelBottom - moveLen - handleHeight / 2, 0, panelHeight - handleHeight / 2) / (panelHeight - handleHeight);
        return percentage;
    }

    //
    proxy(window, ['click', 'contextmenu'], event => {
        if (event.composedPath().indexOf(player.$container) > -1) {
            control.isFocus = true;
        } else {
            control.isFocus = false;
        }
    });

    //
    proxy(window, 'orientationchange', () => {
        setTimeout(() => {
            player.resize();
        }, 300);
    });


    proxy(control.$controls, 'click', (e) => {
        e.stopPropagation();
    })

    proxy(control.$pause, 'click', (e) => {
        player.pause();
    })
    // 监听 play 方法
    proxy(control.$play, 'click', (e) => {
        player.play();
        player.resumeAudioAfterPause()
    })

    // 监听 play 方法
    proxy(control.$playBig, 'click', (e) => {
        player.play();
        player.resumeAudioAfterPause()
    })

    proxy(control.$volume, 'mouseover', () => {
        control.$volumePanelWrap.classList.add('jessibuca-volume-panel-wrap-show');
    })

    proxy(control.$volume, 'mouseout', () => {
        control.$volumePanelWrap.classList.remove('jessibuca-volume-panel-wrap-show');
    })

    proxy(control.$volumeOn, 'click', (e) => {
        e.stopPropagation();
        setStyle(control.$volumeOn, 'display', 'none');
        setStyle(control.$volumeOff, 'display', 'block');
        const lastVolume = player.volume;
        player.volume = 0;
        player._lastVolume = lastVolume;
    })

    proxy(control.$volumeOff, 'click', (e) => {
        e.stopPropagation();
        setStyle(control.$volumeOn, 'display', 'block');
        setStyle(control.$volumeOff, 'display', 'none');
        player.volume = player.lastVolume || 0.5;
    })

    proxy(control.$screenshot, 'click', (e) => {
        e.stopPropagation();
        player.video.screenshot();
    })

    proxy(control.$volumePanel, 'click', event => {
        event.stopPropagation();
        player.volume = volumeChangeFromEvent(event);
    });

    proxy(control.$volumeHandle, 'mousedown', () => {
        control.isVolumeDroging = true;
    });

    proxy(control.$volumeHandle, 'mousemove', event => {
        if (control.isVolumeDroging) {
            player.volume = volumeChangeFromEvent(event);
        }
    });

    proxy(document, 'mouseup', () => {
        if (control.isVolumeDroging) {
            control.isVolumeDroging = false;
        }
    });

    proxy(control.$record, 'click', (e) => {
        e.stopPropagation();
        player.recording = true;
    })

    proxy(control.$recordStop, 'click', (e) => {
        e.stopPropagation();
        player.recording = false;
    })

    proxy(control.$recordingStop, 'click', (e) => {
        e.stopPropagation();
        player.recording = false;
    })

    proxy(control.$fullscreen, 'click', (e) => {
        e.stopPropagation();
        player.fullscreen = true;
    })

    proxy(control.$fullscreenExit, 'click', (e) => {
        e.stopPropagation();
        player.fullscreen = false;
    })

    if (player._opt.hasControl && player._opt.controlAutoHide) {
        //
        proxy(player.$container, 'mouseover', () => {
            if (!player.fullscreen) {
                setStyle(control.$controls, 'display', 'block');
                startDelayControlHidden();
            }
        })

        proxy(player.$container, 'mousemove', () => {
            if (player.$container && control.$controls) {
                if (!player.fullscreen) {
                    if (control.$controls.style.display === 'none') {
                        setStyle(control.$controls, 'display', 'block');
                        startDelayControlHidden();
                    }
                } else {
                    if (control.$controls.style.display === 'none') {
                        setStyle(control.$controls, 'display', 'block');
                        startDelayControlHidden();
                    }
                }
            }
        })

        proxy(player.$container, 'mouseout', () => {
            stopDelayControlHidden();
            setStyle(control.$controls, 'display', 'none');
        })
        let delayHiddenTimeout = null;
        const startDelayControlHidden = () => {
            stopDelayControlHidden();
            delayHiddenTimeout = setTimeout(() => {
                setStyle(control.$controls, 'display', 'none');
            }, 5 * 1000)
        }

        const stopDelayControlHidden = () => {
            if (delayHiddenTimeout) {
                clearTimeout(delayHiddenTimeout);
                delayHiddenTimeout = null;
            }
        }
    }
}
