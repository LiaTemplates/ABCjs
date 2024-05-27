import '../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js'
import ABCjs from '../node_modules/abcjs/index.js'
//import ABCjs from 'abcjs'

const PAPER_ID = 'paper'
const AUDIO_ID = 'audio'
const WARNING = 'warning'

const ABC = 'abc'
const AUDIO = 'audio'
const AUTOPLAY = 'autoplay'
const CHANNEL = 'channel'
const DEBUG = 'debug'
const NOTES = 'notes'
const PROGRAM = 'program'
const RESPONSIVE = 'responsive'
const TABLATURE = 'tablature'

const VOICES_OFF = 'voicesOff'
const CHORDS_OFF = 'chordsOff'
const STEREO = 'stereo'

const STAFFWIDTH = 'staffwidth'

const TEMPLATE = `<style>
.abcjs-inline-audio {
	height: 26px;
	padding: 0 5px;
	border-radius: 3px;
	background-color: #424242;
	display: flex;
	align-items: center;
	box-sizing: border-box;
}
.abcjs-inline-audio.abcjs-disabled {
	opacity: 0.5;
}
.abcjs-inline-audio .abcjs-btn {
	display: block;
	width: 28px;
	height: 34px;
	margin-right: 2px;
	padding: 7px 4px;
	background: none !important;
	border: 1px solid transparent;
	box-sizing: border-box;
}
.abcjs-btn g {
	fill: #f4f4f4;
	stroke: #f4f4f4;
}
.abcjs-inline-audio .abcjs-btn:hover g {
	fill: #cccccc;
	stroke: #cccccc;
}
.abcjs-inline-audio .abcjs-midi-selection.abcjs-pushed {
	border: 1px solid #cccccc;
	background-color: #666666;
	box-sizing: border-box;
}
.abcjs-inline-audio .abcjs-midi-loop.abcjs-pushed {
	border: 1px solid #cccccc;
	background-color: #666666;
	box-sizing: border-box;
}
.abcjs-inline-audio .abcjs-midi-reset.abcjs-pushed {
	border: 1px solid #cccccc;
	background-color: #666666;
	box-sizing: border-box;
}
.abcjs-inline-audio .abcjs-midi-start .abcjs-pause-svg {
	display: none;
}
.abcjs-inline-audio .abcjs-midi-start .abcjs-loading-svg {
	display: none;
}
.abcjs-inline-audio .abcjs-midi-start.abcjs-pushed .abcjs-play-svg {
	display: none;
}
.abcjs-inline-audio .abcjs-midi-start.abcjs-loading .abcjs-play-svg {
	display: none;
}
.abcjs-inline-audio .abcjs-midi-start.abcjs-pushed .abcjs-pause-svg {
	display: block;
}
.abcjs-inline-audio .abcjs-midi-progress-background {
	background-color: #424242;
	height: 10px;
	border-radius: 5px;
	border: 2px solid #cccccc;
	margin: 0 8px 0 15px;
	position: relative;
	flex: 1;
	padding: 0;
	box-sizing: border-box;
}
.abcjs-inline-audio .abcjs-midi-progress-indicator {
	width: 20px;
	margin-left: -10px; /* half of the width */
	height: 14px;
	background-color: #f4f4f4;
	position: absolute;
	display: inline-block;
	border-radius: 6px;
	top: -4px;
	left: 0;
	box-sizing: border-box;
}
.abcjs-inline-audio .abcjs-midi-clock {
	margin-left: 4px;
	margin-top: 1px;
	margin-right: 2px;
	display: inline-block;
	font-family: sans-serif;
	font-size: 16px;
	box-sizing: border-box;
	color: #f4f4f4;
}
.abcjs-inline-audio .abcjs-tempo-wrapper {
	font-size: 10px;
	color: #f4f4f4;
	box-sizing: border-box;
	display: flex;
	align-items: center;
}
.abcjs-inline-audio .abcjs-midi-tempo {
	border-radius: 2px;
	border: none;
	margin: 0 2px 0 4px;
	width: 42px;
	padding-left: 2px;
	box-sizing: border-box;
}
.abcjs-inline-audio .abcjs-loading .abcjs-loading-svg {
	display: inherit;
}
.abcjs-inline-audio .abcjs-loading {
	outline: none;
	animation-name: abcjs-spin;
	animation-duration: 1s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
}
.abcjs-inline-audio .abcjs-loading-svg circle {
	stroke: #f4f4f4;
}
@keyframes abcjs-spin {
	from {transform:rotate(0deg);}
	to {transform:rotate(360deg);}
}
.abcjs-large .abcjs-inline-audio {
	height: 52px;
}
.abcjs-large .abcjs-btn {
	width: 56px;
	height: 52px;
	font-size: 28px;
	padding: 6px 8px;
}
.abcjs-large .abcjs-midi-progress-background {
	height: 20px;
	border: 4px solid #cccccc;
}
.abcjs-large .abcjs-midi-progress-indicator {
	height: 28px;
	top: -8px;
	width: 40px;
}
.abcjs-large .abcjs-midi-clock {
	font-size: 32px;
	margin-right: 10px;
	margin-left: 10px;
	margin-top: -1px;
}
.abcjs-large .abcjs-midi-tempo {
	font-size: 20px;
	width: 50px;
}
.abcjs-large .abcjs-tempo-wrapper {
	font-size: 20px;
}
.abcjs-css-warning {
	display: none;
}
</style>
<div style="display:block; width:100%; white-space: normal !important;">
<div style="color: red;" id="${WARNING}"></div>
<div id="${PAPER_ID}"></div>
<div id="${AUDIO_ID}"></div>
</div>`

var visualObj
var synthControl

function activate(
  el: HTMLElement,
  autoplay: boolean,
  options: {
    program?: number
    channel?: number
    voicesOff: boolean
    chordsOff: boolean
    stereo: boolean
  }
) {
  if (ABCjs.synth.supportsAudio()) {
    var controlOptions = {
      displayLoop: true,
      displayRestart: true,
      displayPlay: true,
      displayProgress: true,
      displayWarp: true,
      displayClock: true,
    }
    synthControl = new ABCjs.synth.SynthController()
    synthControl.load(el, null, controlOptions)

    //synthControl.disable(true)
    var midiBuffer = new ABCjs.synth.CreateSynth()
    midiBuffer
      .init({
        visualObj: visualObj[0],
        options: {
          pan: options.stereo ? [-0.5, 0.5] : [],
        },
      })
      .then(function () {
        synthControl
          .setTune(visualObj[0], true, options)
          .then(function (response) {
            el.classList.remove('disabled')

            if (autoplay) {
              synthControl.play()
            }
          })
      })
  } else {
    console.log('audio is not supported on this browser')
  }
}

function clickListener(
  abcElem,
  tuneNumber,
  classes,
  analysis,
  drag,
  mouseEvent
) {
  var lastClicked = abcElem.midiPitches
  if (!lastClicked) return

  if (synthControl) {
    if (!synthControl.isLoaded)
      synthControl.play().then(function () {
        synthControl.seek(
          abcElem.currentTrackMilliseconds[0] /
            (synthControl.midiBuffer.duration * 1000)
        )
      })
    else
      synthControl.seek(
        abcElem.currentTrackMilliseconds[0] /
          (synthControl.midiBuffer.duration * 1000)
      )
  }

  ABCjs.synth
    .playEvent(
      lastClicked,
      abcElem.midiGraceNotePitches,
      synthControl.visualObj.millisecondsPerMeasure()
    )
    .then(function (response) {
      console.log('note played')
    })
    .catch(function (error) {
      console.log('error playing note', error)
    })
}

customElements.define(
  'lia-abcjs',
  class extends HTMLElement {
    private container?: ShadowRoot

    private abc_?: string
    private audio_?: boolean = true
    private autoplay_: boolean = false
    private channel_?: number
    private debug_: boolean = false
    private notes_: boolean = true
    private program_?: number
    private responsive_: boolean = true
    private tablature_: any

    private staffwidth_?: number

    private voicesOff_: boolean = false
    private chordsOff_: boolean = false
    private stereo_: boolean = false
    private warning_: boolean = false

    static get observedAttributes() {
      return [
        ABC,
        AUDIO,
        AUTOPLAY,
        CHANNEL,
        DEBUG,
        NOTES,
        PROGRAM,
        RESPONSIVE,
        TABLATURE,
        VOICES_OFF,
        CHORDS_OFF,
        STEREO,
        WARNING,
        STAFFWIDTH,
      ]
    }

    constructor() {
      super()
    }

    connectedCallback() {
      const template = document.createElement('template')
      template.innerHTML = TEMPLATE

      this.container = this.attachShadow({ mode: 'open' })
      this.container.appendChild(template.content.cloneNode(true))

      this.abc_ = this.getAttribute(ABC) || this.innerHTML || undefined
      this.audio_ = this.getAttributeBoolean(AUDIO, true)
      this.autoplay_ = this.getAttributeBoolean(AUTOPLAY, false)
      this.channel_ = this.getAttributeNumber(CHANNEL) || undefined
      this.staffwidth_ = this.getAttributeNumber(STAFFWIDTH) || undefined
      this.debug_ = this.getAttributeBoolean(DEBUG, false)
      this.notes_ = this.getAttributeBoolean(NOTES, true)
      this.program_ = this.getAttributeNumber(PROGRAM) || undefined
      this.responsive_ = this.getAttributeBoolean(RESPONSIVE, true)

      try {
        this.tablature_ = JSON.parse(this.getAttribute(TABLATURE))
      } catch (e) {
        this.tablature_ = undefined
      }

      this.voicesOff_ = this.getAttributeBoolean(VOICES_OFF, false)
      this.chordsOff_ = this.getAttributeBoolean(CHORDS_OFF, false)
      this.stereo_ = this.getAttributeBoolean(STEREO, false)
      this.warning_ = this.getAttributeBoolean(WARNING, false)

      this.update()
    }

    disconnectedCallback() {
      try {
        synthControl.destroy()
      } catch (e) {}
    }

    getAttributeBoolean(name: string, defaultValue: any) {
      try {
        if (this.getAttribute(name) !== null) {
          return JSON.parse(this.getAttribute(name)) ? true : false
        }
      } catch (e) {
        console.warn('lia-abcjs: could note parse', name)
      }
      return defaultValue
    }

    getAttributeNumber(name: string) {
      try {
        return JSON.parse(this.getAttribute(name))
      } catch (e) {
        console.warn('lia-abcjs: could note parse', name)
      }
      return
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (oldValue === newValue) return

      switch (name) {
        case ABC: {
          this.abc_ = newValue
          this.update()
          break
        }

        case AUDIO: {
          try {
            this.audio_ = JSON.parse(newValue)
          } catch (e) {
            console.warn(
              'lia-abcjs: audio requires boolean you gave this ->',
              newValue
            )
          }
          this.update()
          break
        }

        case AUTOPLAY: {
          try {
            this.autoplay_ = JSON.parse(newValue)
          } catch (e) {
            console.warn(
              'lia-abcjs: autoplay requires boolean you gave this ->',
              newValue
            )
          }
          this.update()
          break
        }

        case CHANNEL: {
          try {
            this.channel_ = JSON.parse(newValue)
          } catch (e) {
            console.warn(
              'lia-abcjs: channel requires integer you gave this ->',
              newValue
            )
          }
          this.update()
          break
        }

        case STAFFWIDTH: {
          try {
            this.staffwidth_ = JSON.parse(newValue)
          } catch (e) {
            console.warn(
              'lia-abcjs: staffwidth requires integer you gave this ->',
              newValue
            )
          }

          break
        }

        case DEBUG: {
          try {
            this.debug_ = JSON.parse(newValue)
          } catch (e) {
            console.warn(
              'lia-abcjs: debug requires boolean you gave this ->',
              newValue
            )
          }
          this.update()
          break
        }

        case NOTES: {
          try {
            this.notes_ = JSON.parse(newValue)
          } catch (e) {
            console.warn(
              'lia-abcjs: notes requires boolean you gave this ->',
              newValue
            )
          }
          this.update()
          break
        }

        case PROGRAM: {
          try {
            this.program_ = JSON.parse(newValue)
          } catch (e) {
            console.warn(
              'lia-abcjs: program requires integer you gave this ->',
              newValue
            )
          }
          this.update()
          break
        }

        case RESPONSIVE: {
          try {
            this.responsive_ = JSON.parse(newValue)
          } catch (e) {
            console.warn(
              'lia-abcjs: responsive requires boolean you gave this ->',
              newValue
            )
          }
          this.update()
          break
        }

        case TABLATURE: {
          try {
            this.tablature_ = JSON.parse(newValue)
          } catch (e) {
            console.warn(
              'lia-abcjs: tablature requires json you gave this ->',
              newValue
            )
          }
          this.update()
          break
        }

        case VOICES_OFF: {
          try {
            this.voicesOff_ = JSON.parse(newValue)
          } catch (e) {
            console.warn(
              'lia-abcjs: voicesOff requires boolean you gave this ->',
              newValue
            )
          }
          this.update()
          break
        }

        case CHORDS_OFF: {
          try {
            this.chordsOff_ = JSON.parse(newValue)
          } catch (e) {
            console.warn(
              'lia-abcjs: chordsOff requires boolean you gave this ->',
              newValue
            )
          }
          this.update()
          break
        }

        case STEREO: {
          try {
            this.stereo_ = JSON.parse(newValue)
          } catch (e) {
            console.warn(
              'lia-abcjs: stereo requires boolean you gave this ->',
              newValue
            )
          }
          this.update()
          break
        }

        case WARNING: {
          try {
            this.warning_ = JSON.parse(newValue)
          } catch (e) {
            console.warn(
              'lia-abcjs: warning requires boolean you gave this ->',
              newValue
            )
          }
          this.update()
          break
        }

        default: {
          console.warn('lia-abcjs: unknown attribute', name)
        }
      }
    }

    update() {
      if (this.abc_ && this.container) {
        const audio__ = this.match(AUDIO, '(true|false)', this.audio_)
        const autoplay__ = this.match(AUTOPLAY, '(true|false)', this.autoplay_)
        const channel__ = this.match(CHANNEL, '\\d+', this.channel_)
        const staffwidth__ = this.match(STAFFWIDTH, '\\d+', this.staffwidth_)
        const debug__ = this.match(DEBUG, '(true|false)', this.debug_)
        const notes__ = this.match(NOTES, '(true|false)', this.notes_)
        const program__ = this.match(PROGRAM, '\\d+', this.program_)
        const responsive__ = this.match(
          RESPONSIVE,
          '(true|false)',
          this.responsive_
        )

        const tablature__ = this.match(TABLATURE, '[^\\n]+', this.tablature_)

        const voicesOff__ = this.match(
          VOICES_OFF,
          '(true|false)',
          this.voicesOff_
        )
        const chordsOff__ = this.match(
          CHORDS_OFF,
          '(true|false)',
          this.chordsOff_
        )
        const stereo__ = this.match(STEREO, '(true|false)', this.stereo_)
        const warning__ = this.match(WARNING, '(true|false)', this.warning_)

        visualObj = ABCjs.renderAbc(
          notes__ ? this.container.getElementById(PAPER_ID) : '*',
          this.abc_,
          {
            responsive: responsive__ ? 'resize' : undefined,
            viewportHorizontal: !responsive__,
            showDebug: debug__ ? ['grid', 'box'] : [],
            clickListener: clickListener,
            tablature: tablature__,
            staffwidth: staffwidth__,
          }
        )

        try {
          if (warning__ && visualObj[0].warnings.length > 0) {
            let err = ''

            for (let i = 0; i < visualObj[0].warnings.length; i++) {
              err += `<div>${visualObj[0].warnings[i]}</div><hr>`
            }

            this.container.getElementById(WARNING).innerHTML = err
          }
        } catch (e) {}

        if (notes__) {
          this.container.getElementById(PAPER_ID).style.display = 'block'
        } else {
          this.container.getElementById(PAPER_ID).style.display = 'none'
        }

        if (audio__) {
          this.container.getElementById(AUDIO_ID).style.display = 'block'
          activate(this.container.getElementById(AUDIO_ID), autoplay__, {
            channel: channel__,
            program: program__,
            voicesOff: voicesOff__,
            chordsOff: chordsOff__,
            stereo: stereo__,
          })
        } else {
          this.container.getElementById(AUDIO_ID).style.display = 'none'
        }
      }
    }

    match(parameter: string, pattern: string, defaultValue: any) {
      if (this.abc_) {
        const regexp = new RegExp(
          `\\s*%\\s*${parameter}\\s*:\\s*${pattern}`,
          'gi'
        )
        const result = this.abc_.match(regexp)

        if (result) {
          try {
            return JSON.parse(result[0].split(':').slice(1).join(':').trim())
          } catch (e) {}
        }
      }

      return defaultValue
    }

    get abc() {
      return this.abc_
    }

    set abc(value: string) {
      if (this.abc_ !== value) {
        this.abc_ = value
        this.update()
      }
    }

    get audio() {
      return this.audio_
    }

    set audio(value: boolean) {
      if (this.audio_ !== value) {
        this.audio_ = value
        this.update()
      }
    }

    get autoplay() {
      return this.autoplay_
    }

    set autoplay(value: boolean) {
      if (this.autoplay_ !== value) {
        this.autoplay_ = value
        this.update()
      }
    }

    get debug() {
      return this.debug_
    }

    set debug(value: boolean) {
      if (this.debug_ !== value) {
        this.debug_ = value
        this.update()
      }
    }

    get notes() {
      return this.notes_
    }

    set notes(value: boolean) {
      if (this.notes_ !== value) {
        this.notes_ = value
        this.update()
      }
    }

    get responsive() {
      return this.responsive_
    }

    set responsive(value: boolean) {
      if (this.responsive_ !== value) {
        this.responsive_ = value
        this.update()
      }
    }

    get tablature() {
      return this.tablature_
    }

    set tablature(value: boolean) {
      if (this.tablature_ !== value) {
        this.tablature_ = value
        this.update()
      }
    }

    get chordsOff() {
      return this.chordsOff_
    }

    set chordsOff(value: boolean) {
      if (this.chordsOff_ !== value) {
        this.chordsOff_ = value
        this.update()
      }
    }

    get voicesOff() {
      return this.chordsOff_
    }

    set voicesOff(value: boolean) {
      if (this.voicesOff_ !== value) {
        this.voicesOff_ = value
        this.update()
      }
    }

    get stereo() {
      return this.stereo_
    }

    set stereo(value: boolean) {
      if (this.stereo_ !== value) {
        this.stereo_ = value
        this.update()
      }
    }

    get warning() {
      return this.warning_
    }

    set warning(value: boolean) {
      if (this.warning_ !== value) {
        this.warning_ = value
        this.update()
      }
    }
  }
)
