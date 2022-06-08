<!--
author:   André Dietrich

email:    LiaScript@web.de

version:  0.0.2

language: en

logo:     logo.png

narrator: US English Female

comment:  This document provides a collection of LiaScript macros that can be
          to write beautiful music notes with the ABC notation and also to
          play this music aloud.

script:   https://cdn.jsdelivr.net/gh/liatemplates/abcjs@0.0.2/dist/index.js

@ABCJS.render: @ABCJS.renderWith( ,```@0```)

@ABCJS.renderWith
<lia-keep>
<lia-abcjs @0>@1</lia-abcjs>
</lia-keep>
@end

@ABCJS.eval: @ABCJS.evalWith( ,@0)

@ABCJS.evalWith
<script>
console.html(`<lia-abcjs @0>@input</lia-abcjs>`)
"LIA: stop"
</script>
@end

-->


# ABCjs - Template

          --{{0}}--
This document defines some basic macros for that allow you to write music notes
with the [ABC-notation](https://en.wikipedia.org/wiki/ABC_notation). To
transform this into nicely rendered music notes an to play the music online as
well, this plugin uses the JavaScript library [abcjs](https://www.abcjs.net).
This plugin allows you to use ABC music in two ways, only for showing and
playing, or to write and interpret ABC interactively with an editor.

__Try it on LiaScript:__

https://liascript.github.io/course/?https://raw.githubusercontent.com/liaTemplates/ABCjs/main/README.md

__See the project on Github:__

https://github.com/liaTemplates/ABCjs

          --{{1}}--
There are three ways to use this template. The easiest way is to use the
`import` statement and the url of the raw text-file of the master branch or any
other branch or version. But you can also copy the required functionality
directly into the header of your Markdown document, see therefor the
[last slide](#implementation). And of course, you could also clone this project
and change it, as you wish.

           {{1}}
1. Load the macros via

   `import: https://raw.githubusercontent.com/liaTemplates/ABCjs/main/README.md`

   or use this specific version and you course will be stable:

   `import: https://raw.githubusercontent.com/LiaTemplates/ABCjs/0.0.2/README.md`

2. Copy the definitions into your Project

3. Clone this repository on GitHub

## `@ABCJS.render`

          --{{0}}--
Display the ABC defined music with default options, which will render them as
musical notes and add a the possibility to play the music aloud.


```` markdown
``` abc  @ABCJS.render
X: 1
T: Shche ne Vmerla Ukrayiny ni Slava, ni volya
T: Ukrainian National Anthem
C: trad.
R: march
S: https://www.8notes.com/scores/34640.asp
Z: 2022 John Chambers <jc:trillian.mit.edu>
M: C
L: 1/8
K: F
[|\
"F"[A3F3][AF] ([AF][GE][AF])[BG] | [c3A3][BG] "A7"[A2F2][G2E2^C2] | "Dm"[F2D2][A2F2] "A"[E2^C2][A2C2] | "Dm"[D3D3][E^C] [F2D2]"C"[G2E2] |
"F"[A3F3][AF] ([AF][GE][AF])[BG] | [c3A3][BG] "A7"[A2F2][G2E2^C2] | "Dm"[F2D2][A2F2] "A"[E2^C2][A2C2] | "Dm"[D4D4] D2z2 |
"A"[E2^C2][E2C2] ([AC][GE][FD])[EC] | ("Dm"[DD3-]EF)[DD] "A"[E2^C2][E2C2] | "Dm"[F2D2][F2D2] "C"[G2E2][G2E2] | "F"[A4F4] [A2F2]z2 |
"A"[E2^C2][E2C2] ([AC][GE][FD])[EC] | ("Dm"[DD3-]EF)[DD] "A"[E2^C2][E2C2] | "Dm"[F2D2][A2F2] "A"[E2^C2][A2C2] | "Dm"[D3D3][E^C] ([FD][GE][AF])[BG] |
|:\
"F"[c3A3][=B^G] [c2A2][A2F2] | "C"[G2E2][G2E2] ([cE][BG]"^A7/C#"[AF])[GE] | "Dm"[F2D2][F2D2] "C"[G2E2][G2C2] | ("F"[A3F3][GE][A2F2])"C7"[B2G2] |
"F"[c3A3][=B^G] [c2A2][A2F2] | "C"[G2E2][G2E2] ([cE][BG]"^A7/C#"[AF])[GE] | "Dm"[F2D2][A2F2] "A"[E2^C2][A2C2] | "Dm"[D4D4] [D2D2]z2 :|
```
````

---

``` abc  @ABCJS.render
X: 1
T: Shche ne Vmerla Ukrayiny ni Slava, ni volya
T: Ukrainian National Anthem
C: trad.
R: march
S: https://www.8notes.com/scores/34640.asp
Z: 2022 John Chambers <jc:trillian.mit.edu>
M: C
L: 1/8
K: F
[|\
"F"[A3F3][AF] ([AF][GE][AF])[BG] | [c3A3][BG] "A7"[A2F2][G2E2^C2] | "Dm"[F2D2][A2F2] "A"[E2^C2][A2C2] | "Dm"[D3D3][E^C] [F2D2]"C"[G2E2] |
"F"[A3F3][AF] ([AF][GE][AF])[BG] | [c3A3][BG] "A7"[A2F2][G2E2^C2] | "Dm"[F2D2][A2F2] "A"[E2^C2][A2C2] | "Dm"[D4D4] D2z2 |
"A"[E2^C2][E2C2] ([AC][GE][FD])[EC] | ("Dm"[DD3-]EF)[DD] "A"[E2^C2][E2C2] | "Dm"[F2D2][F2D2] "C"[G2E2][G2E2] | "F"[A4F4] [A2F2]z2 |
"A"[E2^C2][E2C2] ([AC][GE][FD])[EC] | ("Dm"[DD3-]EF)[DD] "A"[E2^C2][E2C2] | "Dm"[F2D2][A2F2] "A"[E2^C2][A2C2] | "Dm"[D3D3][E^C] ([FD][GE][AF])[BG] |
|:\
"F"[c3A3][=B^G] [c2A2][A2F2] | "C"[G2E2][G2E2] ([cE][BG]"^A7/C#"[AF])[GE] | "Dm"[F2D2][F2D2] "C"[G2E2][G2C2] | ("F"[A3F3][GE][A2F2])"C7"[B2G2] |
"F"[c3A3][=B^G] [c2A2][A2F2] | "C"[G2E2][G2E2] ([cE][BG]"^A7/C#"[AF])[GE] | "Dm"[F2D2][A2F2] "A"[E2^C2][A2C2] | "Dm"[D4D4] [D2D2]z2 :|
```

## `@ABCJS.renderWith`

          --{{0}}--
Use the render with option to change the default settings. A list of all
possible parameters is defined in section [Options](#Options). Additionally it
is possible to set these parameters as comments within the ABC-code, as it is
demonstrated [here](#@ABCJS.eval).

```` markdown
``` abc  @ABCJS.renderWith(channel="10" audio="true" notes="false")
X: 1
T: Cooley's
M: 4/4
L: 1/8
K: Emin
|:D2|"Em"EBBA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|
"Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|"Em"DEFD E2:|
|:gf|"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|
"Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|"Em"DEFD E2:|
```
````

---

``` abc  @ABCJS.renderWith(channel="10" audio="true" notes="false")
X: 1
T: Cooley's
M: 4/4
L: 1/8
K: Emin
|:D2|"Em"EBBA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|
"Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|"Em"DEFD E2:|
|:gf|"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|
"Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|"Em"DEFD E2:|
```


## `@ABCJS.eval`

          --{{0}}--
Next to just showing the notes, it is also possible to directly edit music with
the LiaScript editor. Alls states and versions will be preserved. Simply add the
`@ABCJS.eval` macro to the end of the code-block. This will run `eval` with the
default settings and print out the result within the console. The code-example
contains a list of all settings that can be changed by the user, this will
overwrite the default settings and gives you more control over your composition.

``` abc
% audio: true
% autoplay: false
% channel: 0
% debug: false
% notes: true
% program: 60
% responsive: true
% tablature: [{"instrument": "violin","tuning": ["G,", "D", "A", "e"]}]
% voicesOff: false
% chordsOff: false
% stereo: true
X: 1
T: Cooley's
M: 4/4
L: 1/8
K: Emin
|:D2|"Em"EBBA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|
"Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|"Em"DEFD E2:|
|:gf|"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|
"Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|"Em"DEFD E2:|
```
@ABCJS.eval


## `@ABCJS.evalWith`

          --{{0}}--
This is similar to the `@ABCJS.renderWith` version an allows you to configure
the output more precisely. Additionally it is also possible, to overwrite these
settings within the comments, as shown in the previous section.

``` abc
X: 1
T: Cooley's
M: 4/4
L: 1/8
K: Emin
|:D2|"Em"EBBA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|
"Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|"Em"DEFD E2:|
|:gf|"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|
"Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|"Em"DEFD E2:|
```
@ABCJS.evalWith(autoplay="true" debug="true")

## Options

| option       | Description                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `audio`      | Display audio settings, by default true.                                                                                        |
| `autoplay`   | Start playing immediately when the site/abc becomes visible (by default disabled)                                               |
| `channel`    | The "midi channel" to use. This isn't particularly useful except that specifying channel 10 means to use the percussion sounds. |
| `debug`      | Combinations of ABCJS `showDebug: ['box', 'grid']` which shows some visual debug information.                                   |
| `notes`      | Depict the notes, by default this is enabled, set it to false to hide them and to display only the "playback".                  |
| `program`    | A number for the midi program (aka "instrument") to use, if not specified in ABC string.                                        |
| `responsive` | Used by default, if you set this to false, then there will be a scrollbar displayed on small screens.                           |
| `tablature`  | Add tablature options as defined [here](https://paulrosen.github.io/abcjs/visual/tablature.html#tablature-options).             |
| `voicesOff`  | If true, play the metronome and accompaniment; do the animation callbacks, but don't play any melody lines.                     |
| `chordsOff`  | If true, then don't turn the guitar chord symbols into sound. (But do play the metronome if there is one.)                      |
| `stereo`     | Use pan to mimic stereo sound (by default set to false).                                                                        |

## ABC Tutorial

You can search https://abcnotation.com for a vast amount of songs and resources.
Additionally, it might be helpful to have a look at the following videos:


!?[How to get started with abc notaion](https://www.youtube.com/watch?v=jwzzueA5siQ&list=PLfRXRZpfgshJU-1rDD91AP1SF13VHYqbh)

!?[How to understand abc notation ... the basics](https://www.youtube.com/watch?v=H8hWKP5cEXE&list=PLfRXRZpfgshJU-1rDD91AP1SF13VHYqbh&index=2)

!?[How to understand abc notation ... next steps](https://www.youtube.com/watch?v=u6_tjcKE42A&list=PLfRXRZpfgshJU-1rDD91AP1SF13VHYqbh&index=3)

!?[How to become an EasyABC virtuoso ... tips & tricks](https://www.youtube.com/watch?v=u6_tjcKE42A&list=PLfRXRZpfgshJU-1rDD91AP1SF13VHYqbh&index=3)

!?[How to include lyrics in abc notation](https://www.youtube.com/watch?v=RWNeCjid0zc&list=PLfRXRZpfgshJU-1rDD91AP1SF13VHYqbh&index=5)

!?[How to write abc notation for multiple voices (polyphony)](https://www.youtube.com/watch?v=HxLKo4HL19g&list=PLfRXRZpfgshJU-1rDD91AP1SF13VHYqbh&index=6)


## Implementation

``` html
script:   https://cdn.jsdelivr.net/gh/liatemplates/abcjs@0.0.2/dist/index.js

@ABCJS.render: @ABCJS.renderWith( ,```@0```)

@ABCJS.renderWith
<lia-keep>
<lia-abcjs @0>@1</lia-abcjs>
</lia-keep>
@end

@ABCJS.eval: @ABCJS.evalWith( ,@0)

@ABCJS.evalWith
<script>
console.html(`<lia-abcjs @0>@input</lia-abcjs>`)
"LIA: stop"
</script>
@end
```
